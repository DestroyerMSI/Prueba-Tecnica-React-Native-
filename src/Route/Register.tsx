import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {  useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Modal_loader from "../Component/Modal_Loader";

import { use_Login_Register_Submit } from "../Hooks/Login_Register_Submit";


export default function Register(){

 const [text_input,setText_input] = useState<Text_input_register>({user:'',password:'',email:''})
  const { width,height } = useWindowDimensions();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigation<NativeStackNavigationProp<Roock_Params_List>>()
  const [loading,set_loading] = useState<boolean>(false) 
  
 

    return(
        <>
        <Modal_loader show={loading} width={width} height={height}/>     
       <ScrollView style={{flex:1,backgroundColor: "white",}}>
        <View style={Style.Container}>
           <Image
             source={require("../../assets/logo.png")}
             style={{
               width: width * 0.45,
               height: width * 0.45,
               marginBottom: 20,
               marginTop: 70,
             }}
           />
     
           <View style={{ width: "80%", justifyContent: "center", alignItems: "center" }}>
             <Text style={Style.title}>Registro</Text>
     
             <TextInput
               style={Style.input_only}
               placeholder="Usuario *"
               placeholderTextColor="black"
               value={text_input.user}
               onChangeText={(text) => setText_input({...text_input,user:text})}
             />
       
              <TextInput
               style={Style.input_only}
               placeholder="Correo Electrónico *"
               placeholderTextColor="black"
               keyboardType="email-address"
               value={text_input.email}
               onChangeText={(text) => setText_input({...text_input,email:text})}
             />

             <View style={Style.input_view}>
               <TextInput
                 placeholder="Contraseña *"
                 placeholderTextColor="black"
                 secureTextEntry={!showPassword}
                 style={{ flex: 1,color:'black' }}
                 value={text_input.password}
                 onChangeText={(text) => setText_input({...text_input,password:text})}
               />
     
               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                 {!showPassword ? (
                   <Image
                     source={require("../../assets/visible.png")}
                     style={Style.img}
                   />
                 ) : (
                   <Image
                     source={require("../../assets/ojo-cerrado.png")}
                     style={Style.img}
                   />
                 )}
               </TouchableOpacity>
             </View>
     
          
           <View style={Style.View_btn}>
            <TouchableOpacity onPress={()=>{navigate.navigate('Login')}}  style={[Style.btnLogin,{backgroundColor:'rgba(38, 38, 38, 0.84)'}]}>
               <Text style={Style.btnLoginText}>Cancelar</Text>
             </TouchableOpacity>
         <TouchableOpacity onPress={use_Login_Register_Submit({remember:undefined,set_loading,text_input,login_register:"register"})} style={Style.btnLogin}>
               <Text style={Style.btnLoginText}>Registrarme</Text>
             </TouchableOpacity>
     </View>
           
     
     
           </View>
           </View>
         </ScrollView>
         </>
    )
}


const Style = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
  },
 
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input_view: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 2,
    paddingHorizontal: 10,
    width: "100%",
    justifyContent: "space-between",
    height: 45,
    marginBottom: 15,
  },
  input_only: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: "100%",
    marginBottom: 20,
    height: 45,
    color:'black'
  },
  img: {
    width: 25,
    height: 25,
  },

  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 25,
  },
  checkbox: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: "black",
    marginRight: 7,
    borderRadius:2
  },
  checkboxChecked: {
    backgroundColor: "#007bff",
  },
  checkText: {
    fontSize: 13,
  },

  btnLogin: {
    backgroundColor: "#007bff",
    width: "48%",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  btnLoginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  View_btn:{
    width:'100%',
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:10
  }
});