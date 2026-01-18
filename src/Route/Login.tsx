import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {  useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Modal_loader from "../Component/Modal_Loader";
import { use_Login_Register_Submit } from "../Hooks/Login_Register_Submit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const { width,height } = useWindowDimensions();
 const [text_input,setText_input] = useState<Text_input_login>({user:'',password:''})
  const [loading,set_loading] = useState<boolean>(false) 
 const navigate = useNavigation<NativeStackNavigationProp<Roock_Params_List>>()

 useEffect(()=>{
  const remeber_login = async()=>{
    const data = await AsyncStorage.getItem('@data_login')
    console.log(data)
    if(data){
      const new_data = JSON.parse(data)
      setText_input({user:new_data.username,password:new_data.password})
    }
  }
  remeber_login()
  },[])



  return (
    <>
    <Modal_loader show={loading} width={width} height={height}/>
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
        <Text style={Style.title}>¡Bienvenido!</Text>

        <TextInput
          style={Style.input_only}
          placeholder="Usuario *"
          placeholderTextColor="black"
          value={text_input.user}
          onChangeText={(text) => setText_input({...text_input,user:text})}
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

        <TouchableOpacity
          style={Style.checkContainer}
          onPress={() => setRemember(!remember)}
        >
          <View style={[Style.checkbox, remember && Style.checkboxChecked]} />
          <Text style={Style.checkText}>Recordarme</Text>
        </TouchableOpacity>
     
    <TouchableOpacity onPress={use_Login_Register_Submit({set_loading,remember:remember,text_input,login_register:"login"})} style={Style.btnLogin}>
          <Text style={Style.btnLoginText}>Iniciar sesión</Text>
        </TouchableOpacity>

      <TouchableOpacity onPress={()=>{navigate.navigate('Register')}} style={{width:'100%',marginTop:20}}>
      <Text style={{color:'blue'}}>No tienes una cuenta?</Text> 
      <Text style={{color:'blue'}}>Regístrate</Text>
      </TouchableOpacity>


      </View>
      
    </View>
    </>
  );
}

const Style = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "white",
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
    width: "100%",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  btnLoginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
