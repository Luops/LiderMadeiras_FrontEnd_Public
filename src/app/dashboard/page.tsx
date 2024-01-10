"use client";
import React from "react";
import dynamic from "next/dynamic";

// Context
import UserContext from "@/store/provider";

// Components
import AsideDash from "@/components/aside/AsideDash";
import PrivateRoute from "@/components/privateRoute/PrivateRoute";

const ListProducts = dynamic(
  () => import("@/components/listProducts/ListProducts")
);
const AddProdForm = dynamic(
  () => import("@/components/addProdForm/AddProdForm")
);

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
};

export default function Dashboard() {
  // State para controlar a seção ativa
  const [activeSection, setActiveSection] = React.useState("produtos");

  // Obtendo o contexto para produtos
  const { products }: any = React.useContext(UserContext);

  return (
    <>
      <PrivateRoute>
        <main className="w-full h-screen flex">
          <AsideDash setActiveSection={setActiveSection} />
          <article className="flex-1 flex flex-col items-center">
            {/* Conteudo da pagina */}
            {typeof window !== 'undefined' && (
              <>
                {activeSection === "produtos" && (
                  <ListProducts productsParam={{ ...products }} />
                )}
                {activeSection !== "produtos" && (
                  <AddProdForm />
                )}
              </>
            )}
          </article>
        </main>
      </PrivateRoute>
    </>
  );
}
