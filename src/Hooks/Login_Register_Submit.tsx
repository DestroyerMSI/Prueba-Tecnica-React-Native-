import { useCallback } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Use_Context_state } from '../Context/Context_State';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Los error y los mensajes deben mostrarse con una modal, no con un alert pero por tema de tiempo lo dejo como alert

export function use_Login_Register_Submit({
  set_loading,
  text_input,
  login_register,
  remember
}: {
  login_register: 'login' | 'register';
  set_loading: React.Dispatch<React.SetStateAction<boolean>>;
  text_input: Text_input_login | Text_input_register;
  remember:boolean | undefined
}) {
  const navigate = useNavigation<NativeStackNavigationProp<Roock_Params_List>>();
  const context = Use_Context_state()
  
  const On_Submit = useCallback(async () => {
    const base_url = 'https://pruebareactjs.test-class.com/Api/';
    const type =
      login_register === 'login'
        ? 'api/Authenticate/login'
        : 'api/Authenticate/register';

    let error = '';

    set_loading(true);
 

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;

    if (!regex.test(text_input.password)) {
      error =
        'La contraseña debe ser mayor a 8 y menor o igual a 20 caracteres, debe tener números, al menos una mayúscula y una minúscula.';
    }

    if (text_input.user === '') {
      error = 'El campo usuario es obligatorio.';
    }

    if (login_register === 'register' && 'email' in text_input) {
      if (text_input.email === '') {
        error = 'El campo del correo es obligatorio.';
      }
    }

    if (error !== '') {
      Alert.alert('Error', error);
      set_loading(false);
      return;
    }

    try {
      const body = login_register === 'register' && 'email' in text_input ? 
      {
        "username": text_input.user.trim(),
        "email": text_input.email.trim(),
        "password": text_input.password.trim()
      }
      : {
        "username": text_input.user.trim(),
        "password": text_input.password.trim(),
        
      } 
   console.log({base_url},{type}, body)
      const response = await axios.post(`${base_url}${type}`, body);

      if (response.status === 200) {
        if (login_register === 'login') {
          const data = response.data;
          context?.set_state(data)
          console.log(response)
           Alert.alert('Bienvenido', 'Inicio de sesión exitoso');
          if(remember && remember=== true) await AsyncStorage.setItem('@data_login', JSON.stringify({username:text_input.user.trim(),password:text_input.password.trim()}));
      
          navigate.reset({
            index: 0,
            routes: [{ name: "Home" }]
          })
        } else {
          Alert.alert('Registro exitoso', 'Tu cuenta ha sido creada');
          navigate.navigate('Login');
        }
      } else {
        Alert.alert(
          'Error',
          login_register === 'login'
            ? 'Usuario o contraseña incorrectos'
            : 'No se pudo registrar el usuario',
        );
      }
    } catch (error) {
      Alert.alert(
        'Error del servidor',
         `${error}`
          
      );
      console.error(error);
    } finally {
      set_loading(false);
    }
  }, [text_input, login_register]);

  return On_Submit;
}
