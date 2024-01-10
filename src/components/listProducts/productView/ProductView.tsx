import React from "react";

// Provider
import UserContext from "@/store/provider";

// Components
import ShowAlertDelete from "@/components/modals/ShowAlertDelete";
import ShowFormEdit from "@/components/modals/ShowFormEdit";
import ShowProductDetails from "@/components/modals/ShowProductDetails";

// Icons
import { IoTrashBinSharp, IoPencil } from "react-icons/io5";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  unity: string;
  isPromotion: boolean;
  promoPrice: string;
  url: string;
  file: File | null;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
};

// Formato do preço normal
function formatProductPrice(price: string): string {
  // Converte o preço para um número de ponto flutuante
  const priceAsFloat = parseFloat(price);

  // Verifica se o preço é um número
  if (!isNaN(priceAsFloat)) {
    // Formata o preço com duas casas decimais
    let formattedPrice = priceAsFloat.toFixed(2);

    // Remove as casas decimais se forem zero
    formattedPrice = formattedPrice.replace(/\.00$/, "");

    return formattedPrice;
  }

  // Retorna o preço original se não for um número
  return price;
}

// Formato do preço da promoção
function formatProductPromoPrice(promoPrice: string): string {
  // Converte o preço da promoção para um número de ponto flutuante
  const promoPriceAsFloat = parseFloat(promoPrice);

  // Verifica se o preço da promoção é um número
  if (!isNaN(promoPriceAsFloat)) {
    // Formata o preço da promoção com duas casas decimais
    let formattedPromoPrice = promoPriceAsFloat.toFixed(2);

    // Remove as casas decimais se forem zero
    formattedPromoPrice = formattedPromoPrice.replace(/\.00$/, "");

    return formattedPromoPrice;
  }

  // Retorna o preço da promoção original se não for um número
  return promoPrice;
}

// Transforma o primeiro caractere de uma string em maiúsculo
function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Transforma o primeiro caractere de uma string após um ponto em minúsculo
function capitalizeAfterPeriod(text: string) {
  return text.replace(
    /\. [a-z]/g,
    (match) => `. ${match.charAt(2).toUpperCase()}`
  );
}

// Transforma o primeiro caractere de uma string em maiúsculo após um ponto
function formatDescription(text: string) {
  const firstUpperCase = capitalizeFirstLetter(text);
  const result = capitalizeAfterPeriod(firstUpperCase);
  return result;
}

function ProductView({
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
  setShowDetails,
}: Product) {
  // Buscar os dados do produto no contexto
  const { products }: any = React.useContext(UserContext);

  // State do modal de apagar
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  
  // State da edição
  const [editingProduct, setEditingProduct] = React.useState<false | Product>(
    false
  ); // Estado para rastrear o produto em edição

  // State de carregamento
  const [isLoading, setIsLoading] = React.useState(false);
  const loading = () => {
    if (
      url == "Carregando..." &&
      title == "Carregando..." &&
      description == "Carregando..."
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };

  // Formate o preço
  const formattedPrice = formatProductPrice(price);

  // Formate o preço da promoção
  const formattedPromoPrice = formatProductPromoPrice(promoPrice);

  // Limite máximo de caracteres para title e description
  const maxTitleLength = 20; // Defina o valor desejado
  const maxDescriptionLength = 50; // Defina o valor desejado

  // Corte o título se ele exceder o limite e transforme a primeira letra maiuscula
  const truncatedTitle =
    title && title.length > maxTitleLength
      ? `${capitalizeFirstLetter(title.slice(0, maxTitleLength))}...`
      : title && capitalizeFirstLetter(title);

  // Corte a descrição se ela exceder o limite e transforme a primeira letra maiuscula + primeira letra após ponto
  const truncatedDescription =
    description && description.length > maxDescriptionLength
      ? `${formatDescription(description.slice(0, maxDescriptionLength))}...`
      : description && formatDescription(description);

  // Função para abrir o modal de editar com as informações do produto (_id)
  const handleEditClick = () => {
    // Ao clicar em "Editar", defina o produto em edição
    setEditingProduct({
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
      setShowDetails,
    });
  };

  // Função para recarregar a página
  React.useEffect(() => {
    let unLoadTimeout: NodeJS.Timeout;

    window.addEventListener("beforeunload", () => {
      // Exibir a tela de carregamento com um pequeno atraso
      setIsLoading(true);
      unLoadTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 30000); // Tempo em milissegundos
    });

    window.addEventListener("load", () => {
      clearTimeout(unLoadTimeout); // Limpar o timeout se a página for carregada antes do tempo
      setIsLoading(false);
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        setIsLoading(true);
      });

      window.removeEventListener("load", () => {
        setIsLoading(false);
      });
    };
  }, []);


  return (
    <>
      {showDeleteModal && (
        <ShowAlertDelete
          setShowDeleteModal={setShowDeleteModal}
          title={title}
          _id={_id}
          description={description}
          price={price}
          category={category}
          unity={unity}
          isPromotion={isPromotion}
          promoPrice={promoPrice}
          url={url}
        />
      )}
      {editingProduct && (
        <ShowFormEdit
          {...editingProduct}
          _id={_id}
          setEditingProduct={() => setEditingProduct(false)}
        />
      )}
      <article
        className={`flex flex-col text-start py-1 mx-2 gap-3 border-b border-[#fe902273] !h-[130px] max-[620px]:!h-[150px]`}
      >
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            {url == "Carregando..." ? (
              <p className="bg-gray-400 animate-pulse h-[70px] w-[70px] border border-[#9c9c9c73] shadow-[5px_3px_20px_-4px_rgba(0, 0, 0, 0.28)]"></p>
            ) : (
              <img
                src={url}
                alt={title}
                className="h-[70px] aspect-square bg-contain bg-center shadow-[5px_3px_20px_-4px_rgba(0,0,0,0.59)] rounded-lg"
              />
            )}

            <div className="flex flex-col max-w-[250px] gap-1">
              {title == "Carregando..." ? (
                <h3 className="bg-gray-400 animate-pulse h-[20px] w-[150px] border border-[#9c9c9c73] shadow-[5px_3px_20px_-4px_rgba(0, 0, 0, 0.28)]"></h3>
              ) : (
                <h3 className="text-md font-bold line-clamp-1">
                  {truncatedTitle}
                </h3>
              )}
              {description == "Carregando..." ? (
                <p className="bg-gray-400 animate-pulse h-[20px] w-[180px] border border-[#9c9c9c73] shadow-[5px_3px_20px_-4px_rgba(0, 0, 0, 0.28)]"></p>
              ) : (
                <p className="w-[90%] text-sm text-justify text-[#666666] overflow-hidden break-words line-clamp-2">
                  {truncatedDescription}
                </p>
              )}
            </div>
          </div>
          {isPromotion && (
            <div className="flex flex-col gap-1 pr-5">
              {price == "Carregando..." ? (
                <p className="bg-gray-400 animate-pulse h-[40px] w-[100px] border border-[#9c9c9c73] shadow-[5px_3px_20px_-4px_rgba(0, 0, 0, 0.28)]"></p>
              ) : (
                <p className="max-[620px]:hidden font-bold text-lg">
                  R$ {formattedPromoPrice}
                </p>
              )}
              {price == "Carregando..." ? (
                <p className="bg-gray-400 animate-pulse h-[40px] w-[100px] border border-[#9c9c9c73] shadow-[5px_3px_20px_-4px_rgba(0, 0, 0, 0.28)]"></p>
              ) : (
                <p className="max-[620px]:hidden text-md">
                  R$ {formattedPrice}
                </p>
              )}
            </div>
          )}
          {!isPromotion && (
            <>
              {price == "Carregando..." ? (
                <p className="bg-gray-400 animate-pulse h-[40px] w-[100px] border border-[#9c9c9c73] shadow-[5px_3px_20px_-4px_rgba(0, 0, 0, 0.28)]"></p>
              ) : (
                <p className="font-bold text-lg max-[620px]:hidden">
                  R$ {formattedPrice}
                </p>
              )}
            </>
          )}
        </div>
        {/*Botões de ação*/}
        {title == "Carregando..." &&
        description == "Carregando..." &&
        price == "Carregando..." ? (
          <div className="bg-gray-400 animate-pulse h-[40px] w-[100%] border border-[#9c9c9c73] shadow-[5px_3px_20px_-4px_rgba(0, 0, 0, 0.28)]"></div>
        ) : (
          <div className="flex justify-between">
            {/*Editar e Excluir */}
            <div className="flex gap-5 h-[100%] text-center justify-center">
              <button onClick={() => setShowDeleteModal(true)}>
                <div className="group bg-white p-2 rounded-full shadow-[0px_0px_9px_1px_#1b191929]">
                  <IoTrashBinSharp className="text-[20px] text-black group-hover:text-[#FF6E00] transition-colors ease-in-out duration-500" />
                </div>
              </button>
              <button onClick={handleEditClick}>
                <div className="group bg-white p-2 rounded-full shadow-[0px_0px_9px_1px_#1b191929]">
                  <IoPencil className="text-[20px] text-black group-hover:text-[#FF6E00] transition-colors ease-in-out duration-500" />
                </div>
              </button>
            </div>
            {/*Preço (resolução menor de 621px de largura) */}
            {isPromotion && (
              <div className="flex flex-col gap-1 pr-5">
                {price == "Carregando..." ? (
                  <p className="bg-gray-400 animate-pulse h-[40px] w-[100px] border border-[#9c9c9c73] shadow-[5px_3px_20px_-4px_rgba(0, 0, 0, 0.28)]"></p>
                ) : (
                  <p className="min-[621px]:hidden font-bold text-lg">
                    R$ {formattedPromoPrice}
                  </p>
                )}
                {price == "Carregando..." ? (
                  <p className="bg-gray-400 animate-pulse h-[40px] w-[100px] border border-[#9c9c9c73] shadow-[5px_3px_20px_-4px_rgba(0, 0, 0, 0.28)]"></p>
                ) : (
                  <p className="min-[621px]:hidden text-md">
                    R$ {formattedPrice}
                  </p>
                )}
              </div>
            )}
            {!isPromotion && (
              <>
                {price == "Carregando..." ? (
                  <p className="bg-gray-400 animate-pulse h-[40px] w-[100px] border border-[#9c9c9c73] shadow-[5px_3px_20px_-4px_rgba(0, 0, 0, 0.28)]"></p>
                ) : (
                  <p className="font-bold text-lg min-[621px]:hidden">
                    R$ {formattedPrice}
                  </p>
                )}
              </>
            )}
            {/*Ver produto*/}
            <button
              className="text-lg font-semibold h-[35px] bg-white px-3 rounded hover:bg-[#FF6E00] hover:text-white transition-colors ease-in-out duration-500 shadow-[0px_0px_9px_1px_#1b191929]"
              onClick={() => {
                setShowDetails(true);
              }}
            >
              Ver
            </button>
          </div>
        )}
      </article>
    </>
  );
}

export default ProductView;
