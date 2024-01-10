"use client";

import * as React from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";

// Model
import { User } from "@/models/User";
import { Product } from "@/models/Product";

import { store } from "./store";
import { Provider, useDispatch, useSelector } from "react-redux";

// Components
import PrivateRoute from "@/components/privateRoute/PrivateRoute";

// Services
import { getUser } from "@/services/get-users";
import { getProducts } from "@/services/get-products";

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  products: Product[];
}

const UserContext = React.createContext<UserContextProps>({
  user: null,
  setUser: () => null,
  products: [],
});

export async function getStaticProps() {
  try {
    const cookies = parseCookies();
    console.log("cookies", cookies);
    const userId = cookies.userId;
    let user = null;
    if (userId) {
      user = getUser();
    }
    return {
      props: {
        initialUser: user,
      },
      revalidate: 5, // Define o tempo em segundos para atualizar a página
    };
  } catch (e) {
    console.error("Erro ao buscar usuário:", e);
    return {
      props: {
        initialUser: null,
      },
      revalidate: 5, // Define o tempo em segundos para atualizar a página
    };
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [products, setProducts] = React.useState<Product[]>([]);

  // Buscar usuário
  React.useEffect(() => {
    const cookies = parseCookies();
    async function fetchUser() {
      const userId = cookies.userId;
      if (userId) {
        try {
          const response = await fetch(
            `https://lidermadeiras-api.onrender.com/api/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${userId}`,
              },
            }
          );
          const data = await response.json();
          setUser(data);
        } catch (e) {
          console.error("Error fetching user:", e);
        }
        // Redirecione o usuário para a página de login ou qualquer outra página desejada
        //window.location.href = "/";
      }
    }
    fetchUser();
  }, []);

  // Buscar produtos
  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts(); // Use a função getProducts para buscar os produtos

        if (productsData) {
          setProducts(productsData); // Atualize o estado dos produtos com os dados obtidos
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    fetchProducts();
  }, []);

  console.log("user", user);

  return (
    <UserContext.Provider value={{ setUser, user, products }}>
      <Provider store={store}>
        <PrivateRoute>{children}</PrivateRoute>
      </Provider>
    </UserContext.Provider>
  );
}

export default UserContext;
