import { configureStore, Middleware } from "@reduxjs/toolkit";
import UserReducer, { fetch_client } from "./ClientsSlice"; // asegúrate de exportar fetch_client en tu slice
import AsyncStorage from "@react-native-async-storage/async-storage";

const loadClientsMiddleware: Middleware = (storeAPI) => (next) => async (action) => {
  const result = next(action);

  const state = storeAPI.getState();
  if (state.clients.length === 0) {
    const response = await AsyncStorage.getItem("@client-list");
    if (response) {
      const parsed = JSON.parse(response);
      if (parsed.length > 0) {
        storeAPI.dispatch(fetch_client(parsed));
      }
    }
  }else{
    await AsyncStorage.setItem("@client-list",JSON.stringify(state));
  }

  return result;
};

const store = configureStore({
  reducer: {
    clients: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadClientsMiddleware),
});

export type Root_State_store = ReturnType<typeof store.getState>;
export type Root_Dispacht = typeof store.dispatch;
export default store;
