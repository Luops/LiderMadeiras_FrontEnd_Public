"use client";

import React from "react";

// Context
import UserContext from "@/store/provider";

// Components
import SectionBannerPromo from "@/components/SectionBannerPromo/SectionBannerPromo";
import SectionProducts from "@/components/SectionProducts/SectionProducts";
import SectionAbout from "@/components/SectionAbout/SectionAbout";
import SectionLocation from "@/components/SectionLocation/SectionLocation";

export default function Home() {
  
  // Obtendo o contexto para produtos
  const { products }:any = React.useContext(UserContext);
  return (
    <>
      <main className="w-full flex flex-col items-center justify-center antialiased mb-5 !pt-0">
        {/*Sobre*/}
        <SectionAbout />
        {/*Localização e Entregas*/}
        <SectionLocation />
        {/*Container focando na promoção Lider */}
        <SectionBannerPromo />
        {/*Produtos e Lista de Categorias*/}
        <SectionProducts productsParam={{ ...products }}/>
      </main>
    </>
  );
}
