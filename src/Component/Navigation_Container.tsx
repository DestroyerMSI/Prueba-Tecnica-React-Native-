import Home from '../Route/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Client_Consultant from '../Route/Client_consultant';
import Login from '../Route/Login';
import Register from '../Route/Register';
import Not_Found_Error from '../Route/not_found_error';
import { Use_Context_state } from '../Context/Context_State';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import Mantenimiento_Clientes from '../Route/Mantenimiento_Cliente';

export default function Navigation_Container() {
  const Stack = createNativeStackNavigator<Roock_Params_List>();
  const context_state = Use_Context_state();
  
  if (context_state?.loading) {
    return (
      <Modal
        animationType="slide"
        style={{
          flex: 1,
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginBottom: 40, fontSize: 28, textAlign: 'center' }}>Verificando datos...</Text>
      <ActivityIndicator size={60} color="black" />
       </View>
      </Modal>
    );
  }
 console.log(context_state)
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={context_state?.state.token != ''  ? 'Home' : 'Login'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ animation: 'flip' }}
        />
        <Stack.Screen name="Client_consultant" 
        options={{ animation: 'slide_from_bottom' }}
        component={Client_Consultant} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ animation: 'slide_from_left' }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Mantenimiento_Clientes"
          component={Mantenimiento_Clientes}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen name="*" component={Not_Found_Error} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
