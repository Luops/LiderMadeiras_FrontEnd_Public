"use client";

import React from "react";

// Next components
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Components
import ShowLocation from "../modals/ShowLocation";

type Props = {};

function Footer({}: Props) {
  const router = useRouter();
  const pathName = usePathname();

  // State mapa da localização
  const [location, setLocation] = React.useState<boolean>(false);

  // State para ver se foi clicado em alguma opção do footer
  const [clicked, setClicked] = React.useState<string>("");

  const handleNavigation = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setClicked(sectionId);
  };

  // link para os contatos
  const wppLink = `https://api.whatsapp.com/send/?phone=5551984602351&text&type=phone_number&app_absent=0`;
  const facebookLink = `https://www.facebook.com/LiderMadeirasGravatai?locale=pt_BR`;

  // Se o usuário estiver na página de login e clicar em algumas das opções do footer, ele deve ser direcionado para a home
  React.useEffect(() => {
    if (pathName === "/login" && clicked) {
      router.push("/");
    }
  });

  return (
    <>
      {location && <ShowLocation setLocation={setLocation} />}
      <footer
        className={`${
          pathName === "/dashboard" ? "hidden" : ""
        } w-full flex flex-col items-center justify-center self-end gap-10 mt-5 px-24 max-[812px]:px-14 max-[420px]:px-10 py-10 bg-gradient-to-r from-blue-400 to-blue-800 shadow-2xl`}
      >
        <article className="w-full flex flex-col items-center justify-center drop-shadow-md gap-4">
          <h2 className="text-white font-bold text-2xl uppercase">
            Lider Madeiras
          </h2>
          <div className="w-full flex max-[737px]:flex-col justify-center items-start max-[737px]:items-center gap-24 max-[737px]:gap-4">
            <ul className="flex flex-col items-start max-[737px]:items-center justify-center gap-1">
              <li>
                <button
                  className="text-[#ffffffb1] text-sm max-[737px]:text-lg font-bold hover:bg-gradient-to-r hover:from-[#FE9022] hover:to-orange-500 hover:bg-clip-text hover:text-transparent transition-all ease-in-out duration-500"
                  onClick={() => handleNavigation("sobre")}
                >
                  Sobre
                </button>
              </li>
              <li>
                <button
                  className="text-[#ffffffb1] text-sm max-[737px]:text-lg font-bold hover:bg-gradient-to-r hover:from-[#FE9022] hover:to-orange-500 hover:bg-clip-text hover:text-transparent transition-all ease-in-out duration-500"
                  onClick={() => setLocation(!location)}
                >
                  Localização
                </button>
              </li>
              <li>
                <button
                  className="text-[#ffffffb1] text-sm max-[737px]:text-lg font-bold hover:bg-gradient-to-r hover:from-[#FE9022] hover:to-orange-500 hover:bg-clip-text hover:text-transparent transition-all ease-in-out duration-500"
                  onClick={() => handleNavigation("informacoes")}
                >
                  Entregas
                </button>
              </li>
              <li>
                <button
                  className="text-[#ffffffb1] text-sm max-[737px]:text-lg font-bold hover:bg-gradient-to-r hover:from-[#FE9022] hover:to-orange-500 hover:bg-clip-text hover:text-transparent transition-all ease-in-out duration-500"
                  onClick={() => handleNavigation("informacoes")}
                >
                  Horário de Funcionamento
                </button>
              </li>
            </ul>
            {/*Produtos e Promoções */}
            <ul className="flex flex-col items-start max-[737px]:items-center justify-center gap-1">
              <li>
                <button
                  className="text-[#ffffffb1] text-sm max-[737px]:text-lg font-bold hover:bg-gradient-to-r hover:from-[#FE9022] hover:to-orange-500 hover:bg-clip-text hover:text-transparent transition-all ease-in-out duration-500"
                  onClick={() => handleNavigation("produtos")}
                >
                  Produtos
                </button>
              </li>
              <li>
                <button
                  className="text-[#ffffffb1] text-sm max-[737px]:text-lg font-bold hover:bg-gradient-to-r hover:from-[#FE9022] hover:to-orange-500 hover:bg-clip-text hover:text-transparent transition-all ease-in-out duration-500"
                  onClick={() => handleNavigation("bannerPromocoes")}
                >
                  Promoções
                </button>
              </li>
            </ul>
            {/*Redes sociais*/}
            <ul className="flex flex-col items-start max-[737px]:items-center justify-center gap-1">
              <p className="text-[#ffffffb1] text-sm max-[737px]:text-lg font-bold">
                Redes Sociais
              </p>
              <li>
                <Link
                  href={facebookLink}
                  target="_blank"
                  className="text-[#ffffffb1] text-sm max-[737px]:text-lg font-bold hover:bg-gradient-to-r hover:from-[#FE9022] hover:to-orange-500 hover:bg-clip-text hover:text-transparent transition-all ease-in-out duration-500"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href={wppLink}
                  target="_blank"
                  className="text-[#ffffffb1] text-sm max-[737px]:text-lg font-bold hover:bg-gradient-to-r hover:from-[#1fa81f] hover:to-green-500 hover:bg-clip-text hover:text-transparent transition-all ease-in-out duration-500"
                >
                  WhatsApp
                </Link>
              </li>
            </ul>
          </div>
        </article>
        <p className="text-white font-roboto font-bold tracking-[.15rem] drop-shadow-md">
          © 2023 Fabrício Lopes
        </p>
      </footer>
    </>
  );
}

export default Footer;
