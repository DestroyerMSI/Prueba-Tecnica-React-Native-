import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Render_Client_Search(client: Search_Interface) {
  const navigate = useNavigation<NativeStackNavigationProp<Roock_Params_List>>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate.navigate('Mantenimiento_Clientes', {
          id: client.id,
          nombre: client.nombre,
          apellidos: client.apellidos,
          identificacion: client.identificacion,
            celular: '',
            otroTelefono: '',
            direccion: '',
            fNacimiento: '',
            fAfiliacion: '',
            sexo: 'F',
            resennaPersonal: '',
            imagen: '',
            interesFK: '',
            tipo:"Create"
        });
      }}
      style={styles.container}
    >
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>
          {client.nombre.charAt(0)}
          {client.apellidos.charAt(0)}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {client.nombre} {client.apellidos}
        </Text>
        <Text style={styles.identification}>{client.identificacion}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    maxWidth: 600,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  identification: {
    fontSize: 14,
    color: '#666',
  },
});
