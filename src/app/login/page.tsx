"use client";

import * as React from "react";

// CSS
import "./styles.css";

// Components Material UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useFormik } from "formik";
import { useAppDispatch } from "@/store/store";
import { fetchLogin } from "@/store/slices/authSlice";
import { parseCookies } from "nookies";

// Icons
import { FaEye } from "react-icons/fa";
import { PiEyeClosedBold } from "react-icons/pi";

export default function Login() {
  // State para o loading do botão
  const [loading, setLoading] = React.useState(false);

  // State para mostrar e esconder a senha
  const [showPassword, setShowPassword] = React.useState(false);

  // Selecionar o userId
  const cookies = parseCookies();
  console.log(cookies);
  const userId = cookies.userId;

  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      await dispatch(fetchLogin({ email: values.email, password: values.password }));
    },
  });

  // Enviar para Home caso haja userId nos cookies
  if (userId !== undefined) {
    // Atualizar a página
    window.location.reload();

    // Ou redirecionar para uma página específica
    window.location.href = "/";
  }

  // Verificar se o botão esta carregando, e se estiver carregando e não for concluído em 4s, mostrar o botão
  React.useEffect(() => {
    if (loading && userId === undefined) {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [loading, userId]);

  return (
    <>
      <main className="w-full">
        <Box
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center justify-center gap-5 max-[480px]:w-full w-[450px] px-[35px] py-[15px] mt-[15px]"
          component="form"
          noValidate
          autoComplete="on"
        >
          <h3 className="font-roboto font-bold uppercase tracking-[10px] text-2xl bg-gradient-to-r from-[#FE9022] to-orange-500 bg-clip-text text-transparent drop-shadow-2xl border-collapse">
            Login
          </h3>
          <TextField
            id=" email"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            label="Email"
            name="email"
            variant="outlined"
            className="w-full bg-white"
          />
          <TextField
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                formik.handleSubmit();
              }
            }}
            type={showPassword ? "text" : "password"} // Altera o tipo de acordo com o estado de showPassword
            label="Password"
            name="password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <PiEyeClosedBold /> : <FaEye />}
                </button>
              ),
            }}
            className="w-full bg-white"
          />
          {loading ? (
            <Button
              variant="contained"
              size="large"
              className="w-full bg-slate-500"
            >
              Carregando...
            </Button>
          ) : (
            <Button
              onClick={() => formik.handleSubmit()}
              variant="contained"
              size="large"
              className="w-full bg-slate-500"
            >
              Entrar
            </Button>
          )}
        </Box>
      </main>
    </>
  );
}
