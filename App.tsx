import { SafeAreaView } from "react-native-safe-area-context";
import Navigation_Container from "./src/Component/Navigation_Container";
import { Context_Provider_State } from "./src/Context/Context_State";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import store from "./src/Redux/store";


function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
        <Context_Provider_State>
        <Provider store={store}>
      <Navigation_Container />
        </Provider>
      </Context_Provider_State>
    </SafeAreaView>
  );
}

export default App;