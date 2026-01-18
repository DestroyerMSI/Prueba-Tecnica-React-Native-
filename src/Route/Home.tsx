import { Image, Text, TouchableOpacity, useWindowDimensions, View, StyleSheet, StatusBar, Alert } from "react-native";
import { Use_Context_state } from "../Context/Context_State";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Logout_Icon from "../Component/Logout_Icon";

export default function Home() {
  const { width, height } = useWindowDimensions();
  const contexto = Use_Context_state();
  const navigate = useNavigation<NativeStackNavigationProp<Roock_Params_List>>();

  return (
    <>
     <StatusBar barStyle={'dark-content'} backgroundColor={'#f8f0f0'}/>
    <View style={[styles.container, { width, height }]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={require("../../assets/usuario.png")} style={styles.userIcon} />
          <Text style={styles.userName}>{contexto?.state.username}</Text>
        </View>
        <Logout_Icon to='Login' logoutIcon={styles.logoutIcon}/>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigate.navigate("Client_consultant");
        }}
        style={styles.cardWrapper}
      >
        <View style={[styles.card, { width: width * 0.8, height: width * 0.4 }]}>
          <Image source={require("../../assets/moleskine.png")} style={styles.cardIcon} />
          <View>
            <Text style={styles.cardTitle}>Clientes</Text>
            <Text style={styles.cardSubtitle}>Administar clientes</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f0f0cc",
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  userInfo: {
    alignItems: "center",
    flexDirection: "row",
  },
  userIcon: {
    width: 45,
    height: 45,
    marginRight: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logoutIcon: {
    width: 45,
    height: 45,
  },
  cardWrapper: {
    marginVertical: 50,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cardIcon: {
    width: 55,
    height: 55,
    marginRight: 20,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#333",
  },
});
