import React from "react";

// Api
import { deleteProduct } from "@/services/delete-product";

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
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
};

// Transforma o primeiro caractere de uma string em maiúsculo
function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function ShowAlertDelete({ _id, title, setShowDeleteModal }: Product) {
  const handleDelete = async () => {
    try {
      // Faça a exclusão do produto
      await deleteProduct(_id);

      // Oculte o modal
      setShowDeleteModal(false);

      // Recarregue a página
      window.location.reload();
    } catch (error) {
      // Lide com erros, se necessário
      console.error("Erro ao excluir o produto:", error);
    }
  };
  // Limite máximo de caracteres para title e description
  const maxTitleLength = 30; // Defina o valor desejado

  // Corte o título se ele exceder o limite e transforme a primeira letra maiuscula
  const truncatedTitle =
    title.length > maxTitleLength
      ? `${capitalizeFirstLetter(title.slice(0, maxTitleLength))}...`
      : capitalizeFirstLetter(title);

  return (
    <>
      <article className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-1/3 max-[1024px]:w-1/2 max-[600px]:w-[80%] p-4 border rounded-lg shadow-[5px_3px_20px_-4px_rgba(0,0,0,0.59)]">
          <div className="flex flex-col text-start mb-2">
            <h2 className="text-xl font-semibold">
              Você realmente deseja excluir o produto:
            </h2>
            <h2 className="text-xl">{truncatedTitle}</h2>
          </div>
          {/*Ações para apagar ou não*/}
          <div className="flex gap-4">
            <button
              onClick={
                handleDelete // Certifique-se de que 'id' seja passado corretamente
              }
              className="px-4 py-2 bg-[#FE9022] text-white rounded-md font-semibold hover:bg-[#FF6E00] transition-colors"
            >
              Sim
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(false);
              }}
              className="px-4 py-2 bg-[#FE9022] text-white rounded-md font-semibold hover:bg-[#FF6E00] transition-colors"
            >
              Não
            </button>
          </div>
        </div>
      </article>
    </>
  );
}

export default ShowAlertDelete;
