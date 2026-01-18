import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, Image, TouchableOpacity } from "react-native"
import { Use_Context_state } from "../Context/Context_State";

export default function Logout_Icon({logoutIcon,to}:{logoutIcon:any,to:"Home" | "Login" | "Client_consultant"}){
     const navigate = useNavigation<NativeStackNavigationProp<Roock_Params_List>>();
    const contexto = Use_Context_state();
    return <TouchableOpacity onPress={()=>{{
                if(to === 'Login'){
              Alert.alert("Estás seguro que deseas cerrar sección.",
                "",
                [
                 {
                  text:"Cancelar",
                 },
                 {
                  text:"Ok",
                  onPress:()=>{
                    contexto?.set_state({ state_login: false,user_name: '',user_id: '',token: ''})
                
                    navigate.reset({
                    index:0,
                   routes: [{ name: to }],
       
                    })
                  }
                 }
                ],
                
              )}
              else{
                navigate.goBack()
              }
            }
            }}>
              <Image source={require("../../assets/salida.png")} style={logoutIcon} />
            </TouchableOpacity>
}