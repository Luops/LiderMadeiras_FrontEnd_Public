"use client";

import React from "react";

// Context
import UserContext from "@/store/provider";

// Next JS
import { usePathname, useRouter } from "next/navigation";

// Interface
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter();
  const pathName = usePathname();
  // Dados do usuário
  const { user }: any = React.useContext(UserContext);

  React.useEffect(() => {
    if (pathName === "/dashboard") {
      if (user && user.role !== undefined && user.role >= 1) {
        // Verifique se 'user' está definido e se 'role' é necessário
        router.push("/dashboard"); // Redirecione para a página do Dashboard se estiver autenticado
      } else {
        router.push("/"); // Redirecione para a página inicial se não estiver autenticado ou não tiver a role necessária
      }
    }
  }, [user, router]);

  return <>{children}</>;
};

export default PrivateRoute;
