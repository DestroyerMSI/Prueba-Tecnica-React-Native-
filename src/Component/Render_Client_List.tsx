import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Render_Client_List(item: Interface_Client_Slice) {
  const navigate =
    useNavigation<NativeStackNavigationProp<Roock_Params_List>>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigate.navigate('Mantenimiento_Clientes', {
        id: item.id,
          nombre: item.nombre,
          apellidos: item.apellidos,
          identificacion: item.identificacion,
            celular: '',
            otroTelefono: '',
            direccion: '',
            fNacimiento: '',
            fAfiliacion: '',
            sexo: '',
            resennaPersonal: '',
            imagen: '',
            interesFK: '',
            tipo:"Create"
        })
      }
    >
      <Image source={{ uri: item.imagen }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.nombre}</Text>
        <Text style={styles.identification}>{item.identificacion}</Text>
      </View>
       <Image source={require('../../assets/adelante.png')} style={{width:18,height:18}}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    maxWidth: 600,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal:10
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: '50%',
    marginRight: 12,
  },
  infoContainer: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  identification: {
    fontSize: 14,
    color: '#666',
  },
});
