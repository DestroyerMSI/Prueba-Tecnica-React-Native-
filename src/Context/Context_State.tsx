import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { Alert, BackHandler } from "react-native";


const context = React.createContext<Inteface_context>({
  state:{
  userid: '',
        username: '',
        state_login: false,
        token:'',
  },
  loading:true,
  set_state:()=>{}
})

export function Context_Provider_State({ children }: { children: ReactNode }) {
    const [state, set_state] = useState<Context_state_interface>({
        userid: '',
        username: '',
        state_login: false,
        token:''
    })
    const [loading,set_loading] = useState<boolean>(true)

    useEffect(() => {
    async function load_state() {
        const saved_state = await AsyncStorage.getItem('context_state')
        if (saved_state) {
            set_state(JSON.parse(saved_state))
        }
        set_loading(false)
    }
    load_state()
    }, [])

    useEffect(() => {
    async function save_state() {
        AsyncStorage.setItem('context_state',JSON.stringify(state))
      }
      save_state()
    }, [state])

    return <context.Provider value={{state,set_state,loading}}>{children}</context.Provider>
}

export function Use_Context_state() {
  const context_use = useContext(context);

  if (context_use) {
    return context_use;
  }else{

  Alert.alert(
    "Lo sentimos, ha ocurrido un error",
    "Por favor cierre la app y vuelva a iniciarla",
    [
      {
        text: "Salir",
        onPress: () => BackHandler.exitApp(),
        style: "destructive"
      }
    ],
    { cancelable: false }  );
  }

}
