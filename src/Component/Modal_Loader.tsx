import { Modal, View, ActivityIndicator, StyleSheet, Text } from "react-native";

export default function Modal_loader({
  width,
  height,
  show,
}: {
  show: boolean;
  width: number;
  height: number;
}) {
  return (
    <Modal animationType="fade" transparent visible={show}>
      <View style={styles.overlay}>
        <View style={[styles.box, { width, height }]}>
          <ActivityIndicator size={60} color="#fff" />
          <Text style={styles.text}>Cargando…</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#007bff95",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
  },
  text: {
    marginTop: 10,
    color: "#fff",
    fontSize: 26,
    fontWeight: "600",
  },
});
