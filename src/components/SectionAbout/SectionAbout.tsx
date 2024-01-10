import React from "react";

// Next Components
import Image from "next/image";
import Link from "next/link";

// Images
import Casa from "../../img/construcao-de-casas.png";

// Animations
import { motion } from "framer-motion";

type Props = {};

function SectionAbout({}: Props) {
  // link para os contatos
  const wppLink = `https://api.whatsapp.com/send/?phone=5551984602351&text&type=phone_number&app_absent=0`;

  return (
    <section
      id="sobre"
      className="relative w-full h-[600px] flex flex-col gap-10 justify-center items-center text-justify px-20 max-[635px]:px-5 py-5 overflow-hidden"
    >
      <Image
        src={Casa}
        alt="Banner"
        className="absolute inset-0 h-full w-full object-cover bg-cover bg-center aspect-video brightness-[0.65] contrast-[1.03]"
      />
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full z-1 text-start max-[768px]:text-center text-[3.75rem] leading-[1] uppercase font-[700] font-roboto text-white"
      >
        LIDER MADEIRAS
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative w-[40%] max-[980px]:w-[60%] max-[768px]:w-[100%] self-start z-1 text-white text-[1.05rem] max-[580px]:text-[.95rem] leading-[1.5] font-roboto"
      >
        Atuando desde 2010, nos localizamos na cidade de Gravataí - Rio Grande
        do Sul. Construimos casas em todo nosso estado e em Santa Catarina.
        Trabalhamos com projetos de casas de alvenaria ou madeira. Atuamos
        também na venda de madeiras brutas e beneficiadas, entregando para
        construtoras, lojas de materiais de construção e cliente final. Contamos
        com madeira própria, o que torna muito mais ágil e competitivo em termos
        financeiros. Nosso beneficiamento de madeiras garante os melhores preços
        para quem deseja adquirir a casa pronta ou somente o madeiramento.
      </motion.p>
      {/*Botões de contato*/}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-[40%] max-[768px]:w-[100%] flex self-start max-[768px]:justify-center items-center z-1"
      >
        <Link
          href={wppLink}
          target="_blank"
          className="flex relative items-center justify-center text-white shadow-2xl text-[1.1rem] max-[580px]:text-[1.25rem] px-5 py-2 rounded-full font-roboto font-semibold transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300"
        >
          Entrar em contato{" "}
        </Link>
      </motion.div>
    </section>
  );
}

export default SectionAbout;
