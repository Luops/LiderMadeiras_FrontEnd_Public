import React from "react";

const ShowSuccessForm = ({ setShowSuccessModal, handleClearForm }: any) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-[56]">
        <div className="bg-white w-1/3 max-[1024px]:w-1/2 max-[600px]:w-[80%] p-4 border rounded-lg shadow-[5px_3px_20px_-4px_rgba(0,0,0,0.59)]">
          <h2 className="text-2xl font-bold mb-2 max-[1200px]:text-justify">
            Dados enviados com sucesso!
          </h2>
          <button
            onClick={() => {
              setShowSuccessModal(false); // Feche o modal de sucesso

              // Recarregue a página
              window.location.reload();
            }}
            className="px-4 py-2 bg-[#FE9022] text-white rounded-md font-semibold hover:bg-[#FF6E00] transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
};

export default ShowSuccessForm;
