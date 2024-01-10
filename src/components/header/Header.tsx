"use client";
import React from "react";

// Next Components
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";


// Context
import UserContext from "@/store/provider";

// Outros
import { destroyCookie } from "nookies";

// React icons
import { BiSolidUserCircle } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

// CSS
import "./styles.css";

// Images
import LiderLogo from "../../img/liderLogo.png";

const logout = () => {
  destroyCookie(null, "userId"); // Remover o userId (usuário) dos cookies
  window.location.reload(); // Atualizar a página
};

const Header = () => {
  // Dados do usuário
  const { user }: any = React.useContext(UserContext);

  const router = useRouter();

  // State para verificar se foi utilizado o scroll
  const [isScrolled, setIsScrolled] = React.useState(false);

  // State para verificar se a resolução da tela e menor que 768px
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  // State para renderizar o navbar
  const [showNavbar, setShowNavbar] = React.useState<boolean>(false);
  const navRef = React.useRef(null);

  // Verificar se foi utilizado o scroll e mudar o state
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 15) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Acompanhar o scroll
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Observar a resolução do dispositivo e deixar o estado da lista de categorias mobile como false acima de 869px
  React.useEffect(() => {
    const handleResize = () => {
      return window.innerWidth <= 869 ? setIsMobile(true) : setIsMobile(false);
    };
    // Verificar a largura da janela quando a página for carregada
    handleResize();

    // Verificar a largura da janela ao redimensionar
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Função para renderizar o Navbar
  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <>
      <header
        className={
          isScrolled
            ? `w-full fixed top-0 border-b shadow-[0px_0px_9px_1px_#1b191929] bg-white z-[51] px-[35px]`
            : `w-full px-[35px]`
        }
      >
        <nav
          className={`flex w-100 items-center ${
            isMobile ? "justify-between" : "justify-center"
          } py-2`}
        >
          <picture>
            <Image
              src={LiderLogo}
              alt="Logo Lider Madeiras"
              className="w-[50px]"
            />
          </picture>
          {!isMobile ? (
            <>
              <ul className="flex w-2/4 items-center justify-end">
                <li className="font-roboto font-bold text-lg">
                  <Link href="/">Home</Link>
                </li>
              </ul>
              <ul className="flex w-2/4 items-center justify-end gap-3">
                {user && (
                  <li className="font-roboto font-bold text-lg">
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                )}
                <li className="flex flex-col items-end">
                  {user && (
                    <div className="flex justify-center items-center">
                      <i className="">
                        <BiSolidUserCircle size={30} />
                      </i>
                      <h3 key={user.id} className="font-roboto">
                        {user.name} {user.lastName}
                      </h3>
                    </div>
                  )}

                  {user && (
                    <button
                      className="text-red-400 font-roboto pl-1"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  )}
                </li>
              </ul>
            </>
          ) : (
            <article className="flex flex-col">
              {!showNavbar ? (
                <button onClick={toggleNavbar}>
                  <FaBars size={30} />
                </button>
              ) : (
                <button onClick={toggleNavbar}>
                  <IoMdClose size={35} />
                </button>
              )}
              <nav
                ref={navRef}
                className={` ${
                  showNavbar
                    ? "flex translate-x-0 "
                    : " hidden translate-x-full "
                } absolute w-3/5 flex-col justify-start items-start top-12 right-0 z-[50] gap-4 bg-white px-6 py-5 transition-transform duration-300 ease-in-out`}
              >
                <ul className={`flex flex-col items-start justify-start gap-4`}>
                  <li className="font-roboto font-bold text-lg">
                    <Link href="/">Home</Link>
                  </li>
                  {user && (
                    <li className="font-roboto font-bold text-lg">
                      <Link href="/dashboard">Dashboard</Link>
                    </li>
                  )}
                </ul>
                <ul className="flex flex-col w-full items-start justify-center gap-4">
                  {user && (
                    <button
                      className="text-red-400 font-roboto"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  )}
                  {user && (
                    <div className="flex justify-start items-center gap-1">
                      <i className="">
                        <BiSolidUserCircle size={30} />
                      </i>
                      <h3 key={user.id} className="font-roboto">
                        {user.name} {user.lastName}
                      </h3>
                    </div>
                  )}
                </ul>
              </nav>
            </article>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
