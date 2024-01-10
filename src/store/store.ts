import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import counterReducer from './reducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer // Aqui você define o reducer para a chave 'counter'
  },
  devTools: true
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;