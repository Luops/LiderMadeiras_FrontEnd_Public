"use client";
import React from "react";

// Context
import UserContext from "@/store/provider";

// Component
import ShowProductDetails from "../modals/ShowProductDetails";

// Icons
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";

type AsideDashProps = {
  setActiveSection: (section: string) => void;
};

const AsideDash = ({ setActiveSection }:AsideDashProps) => {
  // Dados do usuário
  const { user }: any = React.useContext(UserContext);

  // State dos dados do usuário logado
  const [userData, setUserData] = React.useState({});

  // State para renderizar o aside
  const [showAside, setShowAside] = React.useState(true);
  const asideRef = React.useRef(null);

  // Função para renderizar o aside
  const toggleAside = () => {
    setShowAside(!showAside);
  };

  // Observar a resolução do dispositivo e deixar o estado do aside como true acima de 874px
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1022) {
        setShowAside(true);
      } else {
        setShowAside(false);
      }
    };
    // Verificar a largura da janela quando a página for carregada
    handleResize();

    // Verificar a largura da janela ao redimensionar
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!user ? null : (
        <>
          {/* Botão para mostrar/esconder o aside em resoluções menores que 874px */}
          <button
            className={`fixed flex items-center justify-center lg:hidden h-[50px] z-[51] py-2 px-3 min-[1022px]:hidden text-white bg-gradient-to-r from-[#FE9022] to-orange-500 rounded-md border shadow-[0px_0px_9px_1px_#1b191929]`}
            onClick={toggleAside}
            style={{
              left: showAside ? "170px" : 0,
              transition: "left 0.3s ease-in-out",
            }}
          >
            {showAside ? (
              <i className="flex items-center justify-center text-center">
                <MdArrowBackIos
                  className="flex items-center justify-center text-center"
                  size={20}
                />
              </i>
            ) : (
              <i className="flex items-center justify-center text-center">
                <MdArrowForwardIos
                  className="flex items-center justify-center text-center"
                  size={20}
                />
              </i>
            )}
          </button>

          <aside
            ref={asideRef}
            className={`fixed mt-[-1px] z-50 bg-white flex flex-col max-w-[250px] min-w-[180px] h-full sm:w-[150px] border-r-[1px] ${
              showAside ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {user && (
              <p className="text-lg z-50 font-semibold text-start mt-5 py-2 px-5">
                {user.name} {user.lastName}
              </p>
            )}

            <button
              className="py-2 px-5 text-black text-sm text-start font-semibold hover:bg-[#dfdfdf] transition-colors ease-in-out duration-500"
              onClick={() => setActiveSection("produtos")}
            >
              Produtos
            </button>
            <button
              className="py-2 px-5 text-black text-sm text-start font-semibold hover:bg-[#dfdfdf] transition-colors ease-in-out duration-500"
              onClick={() => setActiveSection("addProduct")}
            >
              Adicionar Produto
            </button>
          </aside>
        </>
      )}
    </>
  );
};

export default AsideDash;
