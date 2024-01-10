import { useRouter } from "next/navigation";
import { User } from "@/models/User";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { parseCookies, setCookie } from "nookies";

interface AuthState {
  user: User;
  userId: string;
  expiration: number;
  message: string;
}

// Estado inicial do sistema de autenticação
const initialState: AuthState = {
  user: {
    id: "",
    name: "",
    lastname: "",
    age: 0,
    email: "",
    role: 0,
  },
  userId: "",
  expiration: 0,
  message: "",
};

export const fetchLogin = createAsyncThunk("auth/fetchLogin", async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await axios.post(
      process.env.API_URL,
      { email, password },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "authenticate",
          "Access-Control-Allow-Methods":
            "GET, POST, OPTIONS, PUT, PATCH, DELETE",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );

    console.log("Login:", response);

    // Armazene o userId do usuário no cookie
    setCookie(null, "userId", response.data.userId, {
      maxAge: 30 * 24 * 60 * 60, // Define a duração do cookie em segundos
      path: "/", // Define o caminho do cookie (opcional)
    });

    // Lógica para processar a resposta do servidor
    if (response) {
      const data = await response.data;
      return data;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error("Erro durante o login:", error);
    throw error;
  }
});

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default AuthSlice.reducer;
export const { setUser } = AuthSlice.actions;
