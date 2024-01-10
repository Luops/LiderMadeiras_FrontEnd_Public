import React from "react";

// Provider
import UserContext from "@/store/provider";

// Components
import ShowProductDetails from "../modals/ShowProductDetails";

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
  file: string;
};

// Transforma o primeiro caractere de uma string em maiúsculo
function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

const ProductComponent = ({
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
}: Product) => {
  // Pegar os produtos do contexto
  const { products }: any = React.useContext(UserContext);

  // State de detalhes do produto
  const [showDetails, setShowDetails] = React.useState(false);

  // Função para formatar o preço
  const formatPriceWithThousandSeparator = (price: number) => {
    const [integerPart, decimalPart] = price.toFixed(2).split(".");
    const integerWithSeparator = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      "."
    );
    return decimalPart
      ? `${integerWithSeparator},${decimalPart}`
      : integerWithSeparator;
  };
  // Preço é uma string e precisa ser convertido para número antes de usar o toFixed
  const numericPrice = parseFloat(price);
  const formattedPrice = formatPriceWithThousandSeparator(numericPrice);

  // Formatar o preço da promoção
  // Preço é uma string e precisa ser convertido para número antes de usar o toFixed
  const numericPromoPrice = parseFloat(promoPrice);
  const formattedPromoPrice =
    formatPriceWithThousandSeparator(numericPromoPrice);

  // Limite máximo de caracteres para title e description
  const maxTitleLength = 25; // Defina o valor desejado

  // Corte o título se ele exceder o limite e transforme a primeira letra maiuscula
  const truncatedTitle =
    title && title.length > maxTitleLength
      ? `${capitalizeFirstLetter(title.slice(0, maxTitleLength))}...`
      : title && capitalizeFirstLetter(title);

  return (
    <>
      {/* Mostrar o modal de detalhes do produto */}
      {showDetails && (
        <ShowProductDetails
          _id={_id}
          title={title}
          description={description}
          price={price}
          category={category}
          unity={unity}
          isPromotion={isPromotion}
          promoPrice={promoPrice}
          url={url}
          setShowDetails={setShowDetails}
        />
      )}

      <article className="relative h-[300px] w-[240px] border border-slate-200 rounded-lg shadow-md py-2 px-1">
        <picture className="w-full h-2/3 flex items-center justify-center aspect-video bg-center">
          <img
            src={url}
            alt={truncatedTitle}
            className="w-full max-h-[150px] border border-slate-300 rounded-lg shadow-2xl"
          />
        </picture>
        <h3 className="text-center text-sm font-semibold text-[#373737dd]">
          {truncatedTitle}
        </h3>
        {isPromotion ? (
          <div className="flex flex-col mt-3">
            <p className="text-center text-sm drop-shadow-lg">
              De: R$ {formattedPrice}
            </p>
            <p className="text-center text-lg font-bold drop-shadow-lg bg-gradient-to-r from-[#FE9022] to-orange-500 bg-clip-text text-transparent">
              Por: R$ {formattedPromoPrice}
            </p>
          </div>
        ) : (
          <>
            {price === "Consultar" ? (
              <p className="mt-3 text-center text-lg font-bold drop-shadow-lg bg-gradient-to-r from-[#FE9022] to-orange-500 bg-clip-text text-transparent">{price}</p>
            ) : (
              <p className="mt-3 text-center text-lg font-bold drop-shadow-lg bg-gradient-to-r from-[#FE9022] to-orange-500 bg-clip-text text-transparent">
                R$ {formattedPrice}
              </p>
            )}
          </>
        )}
        <button
          onClick={() => setShowDetails(true)}
          className="absolute w-full h-full top-0 opacity-0"
        ></button>
      </article>
    </>
  );
};

export default ProductComponent;
