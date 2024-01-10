import React from "react";

// Icons
import { IoTrashBinSharp } from "react-icons/io5";

// API
import { deleteImage } from "../../services/delete-product";

// Components
import ShowFormEdit from "./ShowFormEdit";

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
  file: File | null;
  setEditingProduct: React.Dispatch<React.SetStateAction<boolean>>;
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  previewImage: string;
  handleClearFile: () => void;
};

const ShowImageForm = ({
  setShowImageModal,
  previewImage,
  handleClearFile,
  setEditingProduct,
  _id,
}: Product) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-[60] shadow-2xl">
        <div className="relative flex flex-col items-center justify-center bg-white p-4 border rounded-lg shadow-lg gap-3">
          <button
            onClick={() => {
              setShowImageModal(false); // Feche o modal de preview da imagem
            }}
            className="absolute bottom-[93%] max-[420px]:bottom-[95%] left-[90%] max-[420px]:left-[95%] h-[50px] max-[420px]:h-[30px] px-4 max-[420px]:px-2 bg-black text-white text-3xl max-[420px]:text-xl rounded-[100%] font-bold hover:bg-[#FF6E00] transition-colors ease-in-out duration-500"
          >
            X
          </button>
          <h2 className="text-xl font-bold mb-2 uppercase">
            Preview da Imagem
          </h2>
          <img
            src={previewImage}
            alt="Preview da imagem"
            className="w-[250px] max-[420px]:w-[200px] object-contain"
          />
          <div className="flex items-center justify-center">
            <button
              className=""
              onClick={() => {
                handleClearFile();
                setShowImageModal(false);
              }}
            >
              <IoTrashBinSharp className="text-[60px] max-[420px]:text-[40px] text-black hover:text-[#FF6E00] transition-colors ease-in-out duration-500" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowImageForm;
