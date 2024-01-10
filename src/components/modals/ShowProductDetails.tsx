"use client";
import React from "react";

// Next components
import Link from "next/link";

// Icons
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

// Interface do formulário
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
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowProductDetails = ({
  _id,
  title,
  description,
  price,
  category,
  unity,
  isPromotion,
  promoPrice,
  url,
  setShowDetails,
}: Product) => {
  // Fazer com que a primeira letra seja maiuscula
  const capitalizeFirstLetter = (str: string | undefined) => {
    // Verifica se a string é undefined ou vazia
    if (!str || str.length === 0) {
      return ""; // Retorna uma string vazia ou outra valor padrão, dependendo do seu caso.
    }

    const replacedStr = str.replace(/_/g, " "); // Substitui todos os underscores por espaços
    return replacedStr.charAt(0).toUpperCase() + replacedStr.slice(1);
  };

  // Fazer com que a primeira letra seja maiuscula
  const capitalizedTitle = capitalizeFirstLetter(title);
  const capitalizedDescription = capitalizeFirstLetter(description);
  const capitalizedCategory = capitalizeFirstLetter(category);

  // Transformar o tipo de unidade
  const unityTransform = (unity: string) => {
    if (unity === "m2") {
      return "m²";
    } else if (unity === "m") {
      return "m";
    } else {
      return "Unidade";
    }
  };
  const unityTransformed = unityTransform(unity);

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

  // link para os contatos
  const facebookLink = `https://www.facebook.com/LiderMadeirasGravatai?locale=pt_BR`;
  const wppLink = `https://api.whatsapp.com/send/?phone=5551984602351&text&type=phone_number&app_absent=0`;

  return (
    <>
      <div className={`inset-0 fixed flex items-center justify-center z-[60]`}>
        <article className="relative flex flex-col items-center justify-center w-[650px] max-[1110px]:w-[580px] max-[680px]:w-[400px] max-[480px]:w-[320px] h-[580px] max-[480px]:h-[540px] text-start bg-white rounded-[4px] drop-shadow-xl border-[0.5px] border-neutral-200">
          {/*Botão para fechar o modal*/}
          <button
            onClick={() => {
              setShowDetails(false); // Feche o modal de preview da imagem
            }}
            className="z-[61] absolute bottom-[94%] left-[93%] max-[680px]:left-[90%] max-[480px]:left-[88%] h-[35px] max-[420px]:h-[30px] px-3 max-[420px]:px-2 bg-black text-white text-xl border-[0.2px] border-[#ffffff3a] max-[420px]:text-xl rounded-sm font-bold hover:bg-[#FF6E00] transition-colors ease-in-out duration-500"
          >
            X
          </button>
          {/*Imagem */}
          <div className="relative w-[100%] h-[45%]">
            <div className="absolute opacity-[8%] w-[100%] h-[100%] z-1 bg-gradient-to-r from-[#FE9022] to-orange-500 rounded-[4px_4px_0px_0px]"></div>
            <img
              src={url}
              alt={capitalizedTitle}
              className="w-[100%] h-[100%] bg-center aspect-auto border-b-2 border-orange-500 rounded-[4px_4px_0px_0px]"
            />
          </div>
          {/*Descrições*/}
          <div className="w-[100%] h-[100%] flex flex-col justify-between px-3 py-1 rounded-[0px_0px_4px_4px] bg-gradient-to-r from-[#fe902216] to-orange-100">
            <div className="flex flex-col">
              {/*Título*/}
              <h2 className="text-xl font-semibold break-words">
                {capitalizedTitle}
              </h2>
              {/*Categoria*/}
              <h3 className="text-sm text-[#757575] max-[680px]:text-xs max-[680px]:hidden">
                Categoria: {capitalizedCategory}
              </h3>
              {/*Descricão*/}
              <p className="w-[100%] text-justify text-sm max-[680px]:text-[0.75rem] break-words">
                {capitalizedDescription}
              </p>
            </div>
            <div className="w-full flex max-[680px]:flex-col justify-between max-[480px]:pb-1">
              {/*Precos*/}
              <div>
                {isPromotion ? (
                  <div className="flex flex-col">
                    <p className="text-2xl max-[820px]:text-xl max-[680px]:text-lg font-semibold text-[#757575]">
                      De: R$ {formattedPrice}{" "}
                      <span className="text-sm">{unityTransformed}</span>
                    </p>
                    <p className="text-4xl max-[680px]:text-2xl font-bold bg-gradient-to-r from-[#FE9022] to-orange-500 bg-clip-text text-transparent">
                      Por: R$ {formattedPromoPrice}{" "}
                      <span className="text-sm min-[480px]:text-2xl">
                        {unityTransformed}
                      </span>
                    </p>
                  </div>
                ) : (
                  <>
                    {price === "Consultar" ? (
                      <p className="text-4xl max-[680px]:text-3xl font-bold bg-gradient-to-r from-[#FE9022] to-orange-500 bg-clip-text text-transparent">
                        {price}
                      </p>
                    ) : (
                      <p className="text-4xl max-[680px]:text-3xl font-bold bg-gradient-to-r from-[#FE9022] to-orange-500 bg-clip-text text-transparent">
                        R$ {formattedPrice}{" "}
                        <span className="text-[1rem] min-[480px]:text-2xl">
                          {unityTransformed}
                        </span>
                      </p>
                    )}
                  </>
                )}
              </div>
              {/*Contatos*/}
              <div className="flex gap-1 items-end max-[680px]:justify-center">
                <Link
                  href={wppLink}
                  target="_blank"
                  className="h-[40px] w-[40px] font-semibold rounded-lg flex items-center justify-center bg-gradient-to-r hover:bg-white from-[#FE9022] hover:from-[#fe902200] to-orange-500 hover:to-orange-0 text-white hover:text-black cursor-pointer transition-colors ease-in-out duration-[800ms] shadow-[0px_0px_9px_1px_#1b191929]"
                >
                  <FaWhatsapp size={25} />
                </Link>
                <Link
                  href={facebookLink}
                  target="_blank"
                  className="h-[40px] w-[40px] font-semibold rounded-lg flex items-center justify-center bg-gradient-to-r hover:bg-white from-[#FE9022] hover:from-[#fe902200] to-orange-500 hover:to-orange-0 text-white hover:text-black cursor-pointer transition-colors ease-in-out duration-[800ms] shadow-[0px_0px_9px_1px_#1b191929]"
                >
                  <FaFacebook size={25} />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default ShowProductDetails;
