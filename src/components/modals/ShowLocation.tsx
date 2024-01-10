import React from "react";

type Props = {
  setLocation: React.Dispatch<React.SetStateAction<boolean>>;
};

function ShowLocation({ setLocation }: Props) {
  return (
    <article className="w-[500px] max-[543px]:w-[400px] max-[431px]:w-[310px] fixed inset-0 mx-auto h-[500px] max-[431px]:h-[400px] flex flex-col mt-24 items-center justify-center z-[50] border shadow-md">
      <button
        onClick={() => {
          setLocation(false); // Feche o modal de preview da imagem
        }}
        className="z-50 absolute bottom-[97%] max-[420px]:bottom-[97%] left-[94%] max-[680px]:left-[95%] max-[420px]:left-[95%] h-[35px] max-[420px]:h-[30px] px-3 max-[420px]:px-2 bg-black text-white text-xl border-[0.2px] border-[#ffffff3a] max-[420px]:text-xl rounded-sm font-bold hover:bg-[#FF6E00] transition-colors ease-in-out duration-500"
      >
        X
      </button>
      <iframe
        className="w-[100%] h-[100%] border-0"
        title="mapa"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d864.6143673865794!2d-51.03808701038359!3d-29.90872946933981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95197316e7a7a3e5%3A0x8d04ad19085291ea!2sFerragem%20Viaduto!5e0!3m2!1spt-BR!2sbr!4v1662384112421!5m2!1spt-BR!2sbr"
      />
    </article>
  );
}

export default ShowLocation;
