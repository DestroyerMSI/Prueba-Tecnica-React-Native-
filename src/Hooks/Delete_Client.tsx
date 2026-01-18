import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
 
  const Delete_Client = async(id:string,new_state:Interface_Client_Slice[],token:string)=>{
    await AsyncStorage.setItem('@client-list',JSON.stringify(new_state))  
   const response = await axios.delete(
  `https://pruebareactjs.test-class.com/Api/api/Cliente/Eliminar/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      
      try{ 
        if(response.headers.status === 200){
        Alert.alert("Cliente eliminado Correctamente")
       }else{
         Alert.alert("Lo sentimos ha ocurrido un error de usuario, vuelva a intentarlo")
       }
     }
     catch(error){
      console.error(error)
       Alert.alert("Lo sentimos",
        "A ccurrido un error del servidor, vuelva a intentarlo más tarde."
       )
     }
    }