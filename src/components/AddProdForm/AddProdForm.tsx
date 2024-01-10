"use client";
import React from "react";

// API
import api from "@/services/api";

// Data
import { categories, unitys } from "../../app/data/data";

// Components
import ShowSuccessForm from "../modals/ShowSuccessForm";
import ShowImageForm from "../modals/ShowImageForm";

// Interface do formulário
type FormData = {
  title: string;
  description: string;
  price: string | "Consultar";
  category: string;
  unity: string;
  isPromotion: boolean;
  promoPrice: string;
  file: File | null;
};

function AddProdForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);
  const [error, setError] = React.useState("");
  const [formData, setFormData] = React.useState<FormData>({
    title: "",
    description: "",
    price: "",
    category: "",
    unity: "",
    isPromotion: false,
    promoPrice: "",
    file: null,
  });

  // State do modal de enviado
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  // State do modal de preview de imagem
  const [showImageModal, setShowImageModal] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");

  const [editingProduct, setEditingProduct] = React.useState(false);

  // State ao apertar o botao de enviar
  const [submitAttempted, setSubmitAttempted] = React.useState(false);

  // Ref do file (imagem) do input
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Função de submit
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Impede que o formulário seja submetido

    setIsLoading(true); // Está carregando o formulário para o backend ao clicar no botão

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("unity", formData.unity);
      formDataToSend.append("isPromotion", formData.isPromotion.toString());

      // Se a promoção estiver marcada, armazene o valor da promoção
      if (formData.isPromotion && formData.promoPrice !== "") {
        formDataToSend.append("promoPrice", formData.promoPrice);
      } else if (formData.isPromotion && formData.promoPrice === "") {
        setError("O valor da promoção precisa ser informado!");
        setIsLoading(false);
        return;
      } else {
        formDataToSend.append("promoPrice", "0");
      }

      if (formData.file instanceof File) {
        formDataToSend.append("file", formData.file);
      }

      // Faça uma chamada para a API do backend com os dados do formulário
      const response = await api.post("/api/product", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Importante definir o tipo de conteúdo como multipart/form-data
        },
      });
      console.log("Produto criado com sucesso:", response.data);

      setIsSent(true); // Defina isSent como true após o envio bem-sucedido
      handleClearForm(); // Limpar os campos do formulário
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      setError("Erro ao criar produto: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  // Condição de validação dos inputs
  const handleInputChange = (e: any) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      // Se o campo for uma checkbox, armazene o valor da checkbox
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === "file") {
      // Se o campo for um arquivo, armazene o arquivo selecionado
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).files?.[0] || null, // Use apenas o primeiro arquivo se houver vários
      });

      // Exiba o modal de preview da imagem
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        setPreviewImage(e.target.result);
        setShowImageModal(true);
      };

      reader.readAsDataURL(file);
    } else {
      // Verifica se o campo é title e limita a 40 caracteres
      if (name === "title" && value.length > 40) {
        return;
      }

      // Verifica se o campo é descrição e limita a 300 caracteres
      if (name === "description" && value.length > 300) {
        return; // Não atualiza o estado se exceder 300 caracteres
      }

      // Se o campo for de preço ou promoção, verifique se o valor é um número
      setFormData((prevData) => {
        if (
          (name === "price" || name === "promoPrice") &&
          value === "Consultar"
        ) {
          return {
            ...prevData,
            [name]: value, // Permitir que "Consultar" seja atribuído diretamente ao preço
          };
        }
        /*
        if (
          (name === "price" || name === "promoPrice") &&
          !/^\d*(\.|\,)?\d*$/.test(value)
        ) {
          // Se o valor não for um número com ponto opcional, não atualize o estado
          return prevData;
        }*/

        // Verifica o comprimento atual da descrição
        const updatedDescription =
          name === "description" ? value.substring(0, 300) : value;

        // Para outros campos de entrada, armazene o valor normalmente
        return {
          ...prevData,
          [name]:
            name === "price" || name === "promoPrice"
              ? updatedDescription.replace(",", ".") // Substitui vírgulas por pontos para formato numérico correto
              : updatedDescription,
        };
      });
    }
  };

  // Limpe o formulário
  const handleClearForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      unity: "",
      isPromotion: false,
      promoPrice: "",
      file: null,
    });
    setError(""); // Limpe o estado de erro
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpe o valor do elemento de entrada de arquivo
    }
  };

  // Limpar o campo de file
  const handleClearFile = () => {
    setFormData({
      ...formData,
      file: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpe o valor do elemento de entrada de arquivo
    }
  };

  // Função para exibir o modal de visualização da imagem
  const handleShowImageModal = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede que o formulário seja submetido
    if (formData.file) {
      // Se um arquivo estiver anexado
      const imageURL = URL.createObjectURL(formData.file);
      setPreviewImage(imageURL);
      setShowImageModal(true);
    }
  };

  // Mostre o modal de sucesso quando o envio for bem-sucedido (isSent = true)
  React.useEffect(() => {
    if (isSent) {
      setShowSuccessModal(true); // Mostre o modal de sucesso quando o envio for bem-sucedido (isSent = true)
    }
  }, [isSent]);

  // Verificar se os campos foram preenchidos
  React.useEffect(() => {
    // Verificar se o botão de enviar foi apertado
    if (submitAttempted) {
      // Se o botão foi apertado, verifique se todos os campos foram preenchidos
      if (
        !formData.title ||
        !formData.description ||
        !formData.price ||
        !formData.category ||
        !formData.unity ||
        !formData.file
      ) {
        setError("Preencha todos os campos obrigatórios!");
        return;
      }
    } else {
      setError("");
    }
  }, [submitAttempted]);

  // Contabilizar os caracteres digitados do titulo
  const remainingCharactersTitle = 40 - formData.title.length;

  // Contabilizar os caracteres digitados da descrição
  const remainingCharactersDescription = 300 - formData.description.length;

  return (
    <>
      {/* Se o modal de preview da imagem estiver visível, mostre-o */}
      {showImageModal && (
        <ShowImageForm
          _id={""}
          title={""}
          description={""}
          price={""}
          category={""}
          unity={""}
          isPromotion={false}
          promoPrice={""}
          url={""}
          file={null}
          setEditingProduct={setEditingProduct}
          setShowImageModal={setShowImageModal}
          handleClearFile={handleClearFile}
          previewImage={previewImage}
        />
      )}

      {/* Se o modal de sucesso estiver visível, mostre-o */}
      {showSuccessModal && (
        <ShowSuccessForm
          setShowSuccessModal={setShowSuccessModal}
          handleClearForm={handleClearForm}
        />
      )}

      <section className="w-full flex flex-col items-center">
        <article className="w-[50%] max-[1024px]:w-[80%] max-[1024px]:ml-[30%] max-[855px]:ml-[0] flex flex-col items-start gap-4 mt-10 mb-10">
          <h2 className="text-6xl max-[420px]:text-4xl font-bold uppercase drop-shadow-xl">
            Registrar novo produto
          </h2>
          <p className="text-xl max-[420px]:text-sm font-bold uppercase text-[#FE9022] drop-shadow-xl">
            Preencha o formulário
          </p>
        </article>
        <form
          onSubmit={handleSubmit}
          className="w-[50%] max-[855px]:w-[80%] flex flex-col gap-8 items-start justify-center py-4 pb-10"
        >
          {/*Checkbox de promoção*/}
          <label
            htmlFor="isPromotion"
            className="flex w-full justify-end max-[420px]:justify-center items-center gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              name="isPromotion"
              id="isPromotion"
              checked={formData.isPromotion}
              onChange={handleInputChange}
              className="w-[115px] relative h-[50px] rounded-full border-b-[3px] border-gray-400 bg-gray-300 appearance-none shadow-[5px_3px_20px_-4px_rgba(0,0,0,0.59)] ease-in-out duration-500 checked:bg-[#FE9022] hover:border-[#FE9022] group-hover:border-[#FE9022] checked:border-transparent"
            />
            <span
              className={`uppercase font-bold absolute text-md h-[50px] pt-3 mr-2 max-[420px]:mr-0 ${
                formData.isPromotion ? "text-white" : ""
              } transition-colors`}
            >
              Promoção
            </span>
          </label>

          {/*Input do título do produto*/}
          <label htmlFor="title" className="w-full rounded-lg">
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full border-b-[3px] border-gray-400 rounded-lg shadow-[5px_3px_15px_-4px_rgba(0,0,0,0.59)] py-3 px-1 placeholder:text-[rgba(0,0,0,0.5)] focus:outline-0 focus:border-[#FE9022] ease-in-out duration-500`}
              placeholder="Nome do produto"
              required
            />
            <p>Caracteres restantes: {remainingCharactersTitle}</p>
          </label>

          {/*Input da descrição do produto*/}
          <label htmlFor="description" className="w-full rounded-lg">
            <textarea
              name="description"
              id="description"
              cols={30}
              rows={5}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border-b-[3px] border-gray-400 break-words rounded-lg shadow-[5px_3px_15px_-4px_rgba(0,0,0,0.59)] py-3 px-1 placeholder:text-[rgba(0,0,0,0.5)] focus:outline-0 focus:border-[#FE9022] ease-in-out duration-500"
              placeholder="Descrição do produto"
              required
            ></textarea>
            <p>Caracteres restantes: {remainingCharactersDescription}</p>
          </label>

          {/*Input do preço do produto*/}
          <article className="w-full flex flex-row justify-between gap-5">
            <label htmlFor="price" className="w-full flex items-center">
              <input
                type="text"
                name="price"
                id="price"
                value={formData.price === "Consultar" ? "Consultar" : formData.price}
                onChange={handleInputChange}
                className="w-full flex items-center border-b-[3px] border-gray-400 rounded-lg shadow-[5px_3px_15px_-4px_rgba(0,0,0,0.59)] py-3 px-1 placeholder:text-[rgba(0,0,0,0.5)] focus:outline-0 focus:border-[#FE9022] ease-in-out duration-500"
                placeholder="Preço"
                required
              />
            </label>

            {/*Se a promoção estiver marcada, exiba o campo de valor da promoção */}
            {formData.isPromotion ? (
              <label htmlFor="promoPrice" className="w-full flex items-center">
                <input
                  type="text"
                  name="promoPrice"
                  id="promoPrice"
                  value={formData.promoPrice}
                  onChange={handleInputChange}
                  className="w-full flex items-center border-b-[3px] border-gray-400 rounded-lg shadow-[5px_3px_15px_-4px_rgba(0,0,0,0.59)] py-3 px-1 placeholder:text-[rgba(0,0,0,0.5)] focus:outline-0 focus:border-[#FE9022] ease-in-out duration-500"
                  placeholder="Preço da promoção"
                />
              </label>
            ) : (
              <label htmlFor="promoPrice" className="w-full flex items-center">
                <input
                  type="text"
                  name="promoPrice"
                  id="promoPrice"
                  value={formData.promoPrice}
                  onChange={handleInputChange}
                  className="w-full flex items-center bg-gray-300 border-b-[3px] border-gray-400 rounded-lg shadow-[5px_3px_15px_-4px_rgba(0,0,0,0.59)] py-3 px-1 placeholder:text-[rgba(0,0,0,0.5)] focus:outline-0 focus:border-[#FE9022] ease-in-out duration-500"
                  placeholder="Preço da promoção"
                  disabled
                />
              </label>
            )}
          </article>

          {/*Input da categoria e unidade do produto*/}
          <article className="w-full flex flex-row justify-between gap-5">
            <label htmlFor="category" className="w-full flex items-center">
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full flex items-center gap-3 rounded-lg text-[rgba(0,0,0,0.5)] shadow-[5px_3px_15px_-4px_rgba(0,0,0,0.59)] py-3 px-1 border-b-[3px] border-gray-400 focus:outline-0 focus:border-[#FE9022] ease-in-out duration-500"
                required
              >
                <option value="">Categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.value}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="unity" className="w-full flex items-center">
              <select
                name="unity"
                id="unity"
                value={formData.unity}
                onChange={handleInputChange}
                className="w-full flex items-center gap-3 rounded-lg text-[rgba(0,0,0,0.5)] shadow-[5px_3px_15px_-4px_rgba(0,0,0,0.59)] py-3 px-1 border-b-[3px] border-gray-400 focus:outline-0 focus:border-[#FE9022] ease-in-out duration-500"
              >
                <option value="">Unidade</option>
                {unitys.map((unity) => (
                  <option key={unity.id} value={unity.value}>
                    {unity.name}
                  </option>
                ))}
              </select>
            </label>
          </article>

          {/*Input da imagem*/}
          {!formData.file ? (
            <label className="relative w-full flex flex-row items-center justify-center">
              <input
                type="file"
                name="file"
                id="file"
                ref={fileInputRef}
                onChange={handleInputChange}
                className="absolute w-full h-[50px] opacity-0"
                required
              />
              <p className="relative w-full flex items-center justify-center rounded-lg bg-[#fe902260] text-[#FE9022] z-10 uppercase font-bold h-[50px] cursor-pointer border border-dashed border-[#FE9022]">
                Anexar imagem
              </p>
            </label>
          ) : (
            <div className="relative w-full flex flex-row items-center justify-center">
              <button
                onClick={handleShowImageModal}
                className="w-full h-[50px] rounded-lg bg-[#48942c75] text-[#48942c] uppercase font-bold cursor-pointer border border-dashed border-[#48942c] focus:outline-0 focus:border-[#FE9022] ease-in-out duration-500"
              >
                Visualizar imagem
              </button>
            </div>
          )}

          {/* Se estiver carregando, exiba um texto indicando que está enviando */}
          {isLoading ? (
            <>
              <h3 className="w-[125px] text-md text-center self-center font-bold text-[#48942c] bg-[#48942c75] shadow-2xl py-1 rounded-sm transition-colors ease-in-out duration-500">
                Enviando...
              </h3>
            </>
          ) : (
            <button
              type="submit"
              disabled={isLoading} // Se estiver carregando, desabilite o botão
              onClick={() => setSubmitAttempted(true)}
              className="w-[125px] max-[420px]:w-[100px] text-xl max-[420px]:text-sm text-center text-white self-center font-bold shadow-2xl border-b-[3px] border-[#877b70] bg-[#FE9022] py-[4px] rounded-sm hover:bg-[#fe9022bb] transition-colors ease-in-out duration-500"
            >
              Enviar
            </button>
          )}

          {/* Renderize uma mensagem de erro, se houver algum erro */}
          {error && (
            <h2 className="w-full bg-red-200 text-2xl flex items-center justify-center text-center font-bold uppercase drop-shadow-3xl text-red-500 mb-10 py-4 px-1 rounded-lg">
              {error}
            </h2>
          )}
        </form>
      </section>
    </>
  );
}

export default AddProdForm;
