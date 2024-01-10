"use client";
import React, { useRef } from "react";

// Components
import AddProdForm from "../addProdForm/AddProdForm";
import ShowImageForm from "./ShowImageForm";
import ShowSuccessForm from "./ShowSuccessForm";

// API
import { putProduct, uploadNewImage } from "../../services/put-product";

// Data
import { categories, unitys } from "../../app/data/data";

// Interface do formulário
type Product = {
  _id: string;
  title: string;
  description: string;
  price: string | "Consultar";
  category: string;
  unity: string;
  isPromotion: boolean;
  promoPrice: string;
  url: string;
  file: File | null;
  setEditingProduct: React.Dispatch<React.SetStateAction<boolean>>;
};

function ShowFormEdit({
  _id,
  title,
  description,
  price,
  category,
  unity,
  isPromotion,
  promoPrice,
  url,
  file,
  setEditingProduct,
}: Product) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);
  const [isSentImage, setIsSentImage] = React.useState(false);
  const [error, setError] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [editedProduct, setEditedProduct] = React.useState({
    id: _id,
    title: title,
    description: description,
    price: price,
    category: category,
    unity: unity,
    isPromotion: isPromotion,
    promoPrice: promoPrice,
    url: url,
    file: file,
  });

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  // State do modal de preview de imagem
  const [showImageModal, setShowImageModal] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [newImageUrl, setNewImageUrl] = React.useState(""); // Adicione um estado para a nova URL da imagem

  // State do modal de enviado
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  // State ao apertar o botao de enviar
  const [submitAttempted, setSubmitAttempted] = React.useState(false);

  // Condição de validação dos inputs
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files, type, checked }: any = e.target;

    if (type === "checkbox") {
      // Se o campo for uma checkbox, armazene o valor da checkbox
      setEditedProduct({
        ...editedProduct,
        [name]: checked,
      });
    } else if (type === "file") {
      // Se o campo for um arquivo, armazene o arquivo selecionado
      setEditedProduct({
        ...editedProduct,
        [name]: (e.target as HTMLInputElement).files?.[0] || null, // Use apenas o primeiro arquivo se houver vários
      });

      // Exiba o modal de preview da imagem
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (e: any) => {
          setPreviewImage(e.target.result);
          setShowImageModal(true);
        };

        reader.readAsDataURL(file);
      }
    } else {
      // Verificar se o campo é title e limitar a 40 caracteres
      if (name === "title" && value.length > 40) {
        return;
      }
      // Verifica se o campo é descrição e limita a 300 caracteres
      if (name === "description" && value.length > 300) {
        return; // Não atualiza o estado se exceder 300 caracteres
      }
      // Se o campo for de preço ou promoção, verifique se o valor é um número
      setEditedProduct((prevData) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0];
      setSelectedFile(newFile);

      // Atualize o estado do novo arquivo no objeto editedProduct
      setEditedProduct((prevData) => ({
        ...prevData,
        file: newFile,
      }));
    }
  };

  // Função de submit, enviar os dados para a API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // Chame a função putProduct para enviar os dados atualizados à API
      const response = await putProduct(_id, editedProduct);
      if (response) {
        console.log("Produto atualizado com sucesso");
        setSubmitAttempted(true);
      } else {
        console.error("Erro ao atualizar o produto");
      }
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para enviar a imagem para a API
  const handleUploadImage = async () => {
    if (editedProduct.file) {
      const newImageUrl = await uploadNewImage(editedProduct.file);
      if (newImageUrl) {
        setEditedProduct({
          ...editedProduct,
          url: newImageUrl,
        });
      }
      setIsSentImage(true);
    }
  };

  // Função para exibir o modal de visualização da imagem
  const handleShowImageModal = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede que o formulário seja submetido
    if (newImageUrl) {
      setPreviewImage(newImageUrl);
    } else if (editedProduct.file) {
      // Se um arquivo estiver anexado
      const imageURL = URL.createObjectURL(editedProduct.file);
      setPreviewImage(imageURL);
    }

    setShowImageModal(true);
  };

  // Limpar o campo de file
  const handleClearFile = () => {
    setEditedProduct({
      ...editedProduct,
      url: "", // Limpe a URL da imagem
      file: null, // Limpe o arquivo
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpe o valor do elemento de entrada de arquivo
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
        !editedProduct.title ||
        !editedProduct.description ||
        !editedProduct.price ||
        !editedProduct.category ||
        !editedProduct.unity ||
        !editedProduct.file
      ) {
        setError("Preencha todos os campos obrigatórios!");
        return;
      }
    } else {
      setError("");
    }
  }, [submitAttempted]);

  // Função para alterar o layout do botão da imagem de visualizar imagem ou anexar imagem
  function handleChangeButtonLayout() {
    "use strict";
    // Lógica para alterar o layout do botão da imagem aqui
    if (editedProduct.url && !editedProduct.url.startsWith("http://l")) {
      return "Visualizar imagem";
    } else {
      return "Anexar imagem";
    }
  }

  // Contabilizar os caracteres digitados do titulo
  const remainingCharactersTitle = 40 - editedProduct.title.length;

  // Contabilizar os caracteres digitados da descrição
  const remainingCharactersDescription = 300 - editedProduct.description.length;

  return (
    <>
      {/* Se o modal de preview da imagem estiver visível, mostre-o */}
      {showImageModal && (
        <ShowImageForm
          setShowImageModal={setShowImageModal}
          handleClearFile={handleClearFile}
          previewImage={editedProduct.url}
          _id={_id}
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
        />
      )}

      {/* Se for apertado o botão de enviar, mostre o modal de sucesso */}
      {submitAttempted && (
        <ShowSuccessForm
          setShowSuccessModal={setShowSuccessModal}
          m
          run
          dev
          handleClearForm={handleClearFile}
        />
      )}
      <article className="absolute w-full h-[200%] flex-col inset-[0] flex items-center justify-center z-[55] bg-white">
        <article className="w-[50%] max-[1024px]:w-[80%] max-[1024px]:ml-[30%] max-[855px]:ml-[0] flex flex-col items-start gap-4 mt-10 mb-10">
          <h2 className="text-6xl max-[420px]:text-4xl font-bold uppercase drop-shadow-xl">
            Editar produto
          </h2>
          <p className="text-xl max-[420px]:text-sm font-bold uppercase text-[#FE9022] drop-shadow-xl">
            Preencha o formulário
          </p>
        </article>
        <form
          onSubmit={handleSubmit}
          className="w-[50%] max-[855px]:w-[80%] flex flex-col gap-8 items-start justify-center py-4 pb-10 "
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
              checked={editedProduct.isPromotion}
              onChange={handleInputChange}
              className="w-[115px] relative h-[50px] rounded-full border-b-[3px] border-gray-400 bg-gray-300 appearance-none shadow-[5px_3px_20px_-4px_rgba(0,0,0,0.59)] ease-in-out duration-500 checked:bg-[#FE9022] hover:border-[#FE9022] group-hover:border-[#FE9022] checked:border-transparent"
            />
            <span
              className={`uppercase font-bold absolute text-md h-[50px] pt-3 mr-2 max-[420px]:mr-0 ${
                editedProduct.isPromotion ? "text-white" : ""
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
              value={editedProduct.title}
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
              value={editedProduct.description}
              onChange={handleInputChange}
              className="w-full border-b-[3px] border-gray-400 rounded-lg shadow-[5px_3px_15px_-4px_rgba(0,0,0,0.59)] py-3 px-1 placeholder:text-[rgba(0,0,0,0.5)] focus:outline-0 focus:border-[#FE9022] ease-in-out duration-500"
              placeholder="Descrição do produto"
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
                value={
                  editedProduct.price === "Consultar"
                    ? "Consultar"
                    : editedProduct.price
                }
                onChange={handleInputChange}
                className="w-full flex items-center border-b-[3px] border-gray-400 rounded-lg shadow-[5px_3px_15px_-4px_rgba(0,0,0,0.59)] py-3 px-1 placeholder:text-[rgba(0,0,0,0.5)] focus:outline-0 focus:border-[#FE9022] ease-in-out duration-500"
                placeholder="Preço"
              />
            </label>

            {/*Se a promoção estiver marcada, exiba o campo de valor da promoção */}
            {editedProduct.isPromotion ? (
              <label htmlFor="promoPrice" className="w-full flex items-center">
                <input
                  type="text"
                  name="promoPrice"
                  id="promoPrice"
                  value={editedProduct.promoPrice}
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
                  value={editedProduct.promoPrice}
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
                value={editedProduct.category}
                onChange={handleInputChange}
                className="w-full flex items-center gap-3 rounded-lg text-[rgba(0,0,0,0.5)] shadow-[5px_3px_15px_-4px_rgba(0,0,0,0.59)] py-3 px-1 border-b-[3px] border-gray-400 focus:outline-0 focus:border-[#FE9022] ease-in-out duration-500"
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
                value={editedProduct.unity}
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
          {handleChangeButtonLayout() === "Anexar imagem" ? (
            <div className="relative w-full flex flex-col items-center justify-center gap-3">
              <label className="relative w-full flex flex-row items-center justify-center">
                <input
                  type="file"
                  name="file"
                  id="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="absolute w-full h-[50px] opacity-0"
                />
                <p className="relative w-full flex items-center justify-center rounded-lg bg-[#fe902260] text-[#FE9022] z-10 uppercase font-bold h-[50px] cursor-pointer border border-dashed border-[#FE9022]">
                  Anexar imagem
                </p>
              </label>
              <button
                onClick={handleUploadImage}
                className="rounded-lg bg-[#fe902260] px-2 py-3 text-[#FE9022] uppercase font-bold cursor-pointer border border-[#FE9022] focus:outline-0 focus:border-[#FE9022] ease-in-out duration-500"
              >
                Salvar imagem nova
              </button>
            </div>
          ) : (
            <div className="relative w-full flex flex-col items-center justify-center gap-1">
              <button
                onClick={handleShowImageModal}
                className="w-full h-[50px] rounded-lg bg-[#48942c75] text-[#48942c] uppercase font-bold cursor-pointer border border-dashed border-[#48942c] focus:outline-0 focus:border-[#FE9022] ease-in-out duration-500"
              >
                Visualizar imagem
              </button>
            </div>
          )}

          <div className="w-full flex items-center justify-center gap-3 max-[620px]:flex-col max-[620px]:gap-5">
            {/* Se estiver carregando, exiba um texto indicando que está enviando */}
            {isLoading ? (
              <>
                <h3 className="w-[125px] max-[620px]:w-[100%] max-[620px]:py-3 text-xl max-[420px]:text-sm text-md text-center self-center font-bold text-[#48942c] bg-[#48942c75] shadow-2xl py-1 rounded-sm transition-colors ease-in-out duration-500">
                  Enviando...
                </h3>
              </>
            ) : (
              <button
                type="submit"
                disabled={isLoading} // Se estiver carregando, desabilite o botão
                onClick={() => setSubmitAttempted(true)}
                className="w-[125px] max-[620px]:w-[100%] max-[620px]:py-3 text-xl max-[420px]:text-sm text-center text-white self-center font-bold shadow-2xl border-b-[3px] border-[#877b70] bg-[#FE9022] py-[4px] rounded-sm hover:bg-[#fe9022bb] transition-colors ease-in-out duration-500"
              >
                Enviar
              </button>
            )}
            <button
              onClick={() => setEditingProduct(false)}
              className="w-[125px] max-[620px]:w-[100%] max-[620px]:py-3 text-xl max-[420px]:text-sm text-center text-white self-center font-bold shadow-2xl border-b-[3px] border-[#877b70] bg-[#FE9022] py-[4px] rounded-sm hover:bg-[#fe9022bb] transition-colors ease-in-out duration-500"
            >
              Voltar
            </button>
          </div>
        </form>
      </article>
    </>
  );
}

export default ShowFormEdit;
