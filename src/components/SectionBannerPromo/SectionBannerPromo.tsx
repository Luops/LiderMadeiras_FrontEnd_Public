import React from "react";

// Component do Next
import Image from "next/image";

// Images
import ImageOneBanner from "../../img/Buzios-Quartzo-6-Reguas-450X450mm.png-1024x1024.png";
import ImageHouseBanner from "../../img/casa.png";
import ImageTwoBanner from "../../img/teca.png";

function SectionBannerPromo() {
  // State para verificar largura da tela
  const [isSmallWidth, setIsSmallWidth] = React.useState(false);

  // Acompanhar a largura da tela
  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallWidth(window.innerWidth < 870);
    };

    // Adiciona um event listener para atualizar a largura ao redimensionar a janela
    window.addEventListener("resize", handleResize);

    // Define o estado inicial da largura da janela
    setIsSmallWidth(window.innerWidth < 870);

    // Remove o event listener quando o componente é desmontado
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Dependência vazia para executar apenas uma vez, no montamento do componente

  return (
    <section id="bannerPromocoes" className="w-[87%] max-[940px]:w-[93%] max-[869px]:w-full flex max-[869px]:flex-col z-[41] max-[869px]:h-screen max-[680px]:h-auto justify-evenly max-[869px]:justify-center items-center py-5 max-[680px]:py-20 bg-gradient-to-r from-blue-400 to-blue-800">
      {/*Imagens modo mobile <= 869px*/}
      {isSmallWidth && (
        <div className="relative flex items-center justify-center">
          <Image
            src={ImageOneBanner}
            alt="Banner"
            className="absolute w-[200px] max-[1152px]:w-[150px] max-[869px]:w-[220px] max-[700px]:w-[190px] max-[480px]:w-[150px] h-[150px] max-[1152px]:h-[100px] max-[869px]:h-[180px] max-[700px]:h-[140px] max-[480px]:h-[120px] aspect-auto drop-shadow-2xl left-[-60px] max-[480px]:ml-[00px] mb-2 max-[869px]:mb-5"
          />
          <Image
            src={ImageHouseBanner}
            alt="House"
            className="w-[420px] max-[1152px]:w-[300px] max-[869px]:w-[420px] max-[700px]:w-[290px] max-[480px]:w-[250px] h-[300px] max-[1152px]:h-[200px] max-[869px]:h-[300px] max-[700px]:h-[240px] max-[480px]:h-[200px] aspect-auto drop-shadow-2xl z-[10]"
          />
          <Image
            src={ImageTwoBanner}
            alt="Banner"
            className="absolute w-[200px] max-[1152px]:w-[150px] max-[869px]:w-[220px] max-[700px]:w-[190px] max-[480px]:w-[150px] h-[150px] max-[1152px]:h-[100px] max-[869px]:h-[180px] max-[700px]:h-[140px] max-[480px]:h-[120px] aspect-auto drop-shadow-2xl rotate-180 right-[-70px] max-[380px]:right-[-50px] mb-2 max-[869px]:mb-5"
          />
        </div>
      )}
      {/*Texto do container de promoções*/}
      <div className="flex flex-col gap-2 max-[869px]:items-center max-[869px]:mt-[-75px] max-[869px]:z-[11]">
        <h2 className="text-white font-bold text-5xl max-[869px]:text-6xl max-[656px]:w-full max-[640px]:text-5xl max-[480px]:text-4xl w-[350px] max-[869px]:w-[650px] text-center drop-shadow-lg">
          Promoções{" "}
          <span className="uppercase bg-gradient-to-r from-[#FE9022] to-orange-500 bg-clip-text text-transparent">
            Lider
          </span>
          !
        </h2>
        <p className="text-[#f8f81df9] mt-4 max-[869px]:mt-14 font-bold text-4xl max-[869px]:text-6xl max-[520px]:text-4xl text-center w-[350px] max-[869px]:w-[450px] max-[450px]:w-full drop-shadow-lg">
          Descontos de até <span className="text-6xl underline">25%</span>
        </p>
      </div>
      {/*Imagens modo desktop >= 869px*/}
      {!isSmallWidth && (
        <div className="relative flex items-center justify-center max-[1100px]:right-[50px] max-[869px]:right-0">
          <Image
            src={ImageOneBanner}
            alt="Banner"
            className="absolute w-[200px] max-[1152px]:w-[150px] h-[150px] max-[1152px]:h-[100px] aspect-auto drop-shadow-2xl left-[-60px] mb-2"
          />
          <Image
            src={ImageHouseBanner}
            alt="House"
            className="w-[420px] max-[1152px]:w-[300px] h-[300px] max-[1152px]:h-[200px] aspect-auto drop-shadow-2xl z-10"
          />
          <Image
            src={ImageTwoBanner}
            alt="Banner"
            className="absolute w-[200px] max-[1152px]:w-[150px] h-[150px] max-[1152px]:h-[100px] aspect-auto drop-shadow-2xl rotate-180 right-[-110px] mb-2 "
          />
        </div>
      )}
    </section>
  );
}

export default SectionBannerPromo;
