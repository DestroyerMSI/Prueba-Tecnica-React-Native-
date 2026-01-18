import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert, Platform, PermissionsAndroid, useWindowDimensions } from "react-native";
import DatePicker from "react-native-date-picker";
import { CameraOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Create_Client_Hook from "../Hooks/Create_Update_Client";
import { Use_Context_state } from "../Context/Context_State";
import Modal_loader from "../Component/Modal_Loader";

export default function Mantenimiento_Clientes() {
  const route = useRoute<RouteProp<Roock_Params_List, 'Mantenimiento_Clientes'>>();
  const params = useMemo(() => route.params, []);

  const [formData, setFormData] = useState({
  id: params.id || "",
  nombre: params.nombre || "",
  apellidos: params.apellidos || "",
  identificacion: params.identificacion || "",
  celular: params.celular || "",
  otroTelefono: params.otroTelefono || "",
  direccion: params.direccion || "",
  fNacimiento: params.fNacimiento || "",
  fAfiliacion: params.fAfiliacion || "",
  sexo: params.sexo || "M",
  resennaPersonal: params.resennaPersonal || "",
  imagen: params.imagen || "",
  interesFK: params.interesFK || "",
  tipo: params.tipo || "Create"
});


  const {width,height} = useWindowDimensions()
  const [show_date_select_1, set_date_select_1] = useState<boolean>(false)
  const [show_date_select_2, set_date_select_2] = useState<boolean>(false)
  const [tempDate1, setTempDate1] = useState<Date>(new Date())
  const [tempDate2, setTempDate2] = useState<Date>(new Date())
  const [loading,set_loading] = useState<boolean>(false)
  const context = Use_Context_state()
  const On_Submit = Create_Client_Hook(formData,set_loading,context)
  const navigate = useNavigation<NativeStackNavigationProp<Roock_Params_List>>()

  useEffect(() => {
    requestPermissions();
  }, []);

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const cameraPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );

        if (!cameraPermission) {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Permiso de Cámara',
              message: 'La aplicación necesita acceso a tu cámara',
              buttonNeutral: 'Preguntar después',
              buttonNegative: 'Cancelar',
              buttonPositive: 'Aceptar',
            }
          );
        }

        if (Platform.Version >= 33) {
          const mediaPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          );

          if (!mediaPermission) {
            await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
              {
                title: 'Permiso de Galería',
                message: 'La aplicación necesita acceso a tus imágenes',
                buttonNeutral: 'Preguntar después',
                buttonNegative: 'Cancelar',
                buttonPositive: 'Aceptar',
              }
            );
          }
        } else {
          const storagePermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
          );
          if (!storagePermission) {
            await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              {
                title: 'Permiso de Almacenamiento',
                message: 'La aplicación necesita acceso a tu galería',
                buttonNeutral: 'Preguntar después',
                buttonNegative: 'Cancelar',
                buttonPositive: 'Aceptar',
              }
            );
          }
        }
      } catch (err) {
        console.warn('Error solicitando permisos:', err);
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImagePick = () => {
    Alert.alert(
      'Seleccionar imagen',
      'Elige una opción',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cámara',
          onPress: () => pickImageFromCamera(),
        },
        {
          text: 'Galería',
          onPress: () => pickImageFromGallery(),
        },
      ]
    );
  };

  const pickImageFromCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: 800,
      maxHeight: 800,
      quality: 1,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('Usuario canceló la cámara');
      } else if (response.errorCode) {
        Alert.alert('Error', 'No se pudo abrir la cámara');
        console.log('Error:', response.errorMessage);
      } else if (response.assets && response.assets[0].base64) {
        const base64Image = `data:image/jpeg;base64,${response.assets[0].base64}`;
        setFormData(prev => ({ ...prev, imagen: base64Image }));
      }
    });
  };

  const pickImageFromGallery = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.7,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Usuario canceló la selección');
      } else if (response.errorCode) {
        Alert.alert('Error', 'No se pudo abrir la galería');
        console.log('Error:', response.errorMessage);
      } else if (response.assets && response.assets[0].base64) {
        const base64Image = `data:image/jpeg;base64,${response.assets[0].base64}`;
        setFormData(prev => ({ ...prev, imagen: base64Image }));
      }
    });
  };

  return (
    <>
    <Modal_loader show={loading} width={width} height={height}/>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Image source={require('../../assets/flecha.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mantenimiento de Clientes</Text>
      </View>

      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.avatarCircle} onPress={handleImagePick}>
          {formData.imagen !== '' ? (
            <View style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 60 }}>
              <Image source={{ uri: formData.imagen }} style={styles.avatar} />
            </View>
          ) : (
            <Image source={require('../../assets/usuario.png')} style={styles.avatar} />
          )}
          <View style={styles.cameraIcon}>
            <Image source={require('../../assets/camara.png')} style={styles.cameraImage} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.fieldset}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre *</Text>
              <TextInput
                style={styles.input}
                value={formData.nombre}
                onChangeText={(text) => handleChange('nombre', text)}
                placeholder="Ingrese nombre"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Apellidos *</Text>
              <TextInput
                style={styles.input}
                value={formData.apellidos}
                onChangeText={(text) => handleChange('apellidos', text)}
                placeholder="Ingrese apellidos"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Identificación *</Text>
              <TextInput
                style={styles.input}
                value={formData.identificacion}
                onChangeText={(text) => handleChange('identificacion', text)}
                placeholder="Ingrese identificación"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Sexo *</Text>
              <TextInput
                style={styles.input}
                value={formData.sexo}
                onChangeText={(text) => handleChange('sexo', text)}
                placeholder="M/F"
              />
            </View>

            <TouchableOpacity 
              style={[styles.inputGroup, { position: 'relative' }]}
              onPress={() => set_date_select_1(true)}
            >
              <Text style={styles.label}>Fecha de Nacimiento *</Text>
              <TextInput
                style={styles.input}
                value={formData.fNacimiento}
                placeholder="DD/MM/AAAA"
                editable={false}
                pointerEvents="none"
              />
              <Image 
                source={require('../../assets/calendario.png')} 
                style={{ width: 25, height: 25, position: 'absolute', zIndex: 2, right: 10, top: 14 }} 
              />
            </TouchableOpacity>

            <DatePicker
              modal
              open={show_date_select_1}
              date={tempDate1}
              mode="date"
              locale="es"
              onConfirm={(date) => {
                set_date_select_1(false);
                setTempDate1(date);
                setFormData(prev => ({ ...prev, fNacimiento: formatDate(date) }));
              }}
              onCancel={() => {
                set_date_select_1(false);
              }}
              maximumDate={new Date()}
            />

            <TouchableOpacity 
              style={[styles.inputGroup, { position: 'relative' }]}
              onPress={() => set_date_select_2(true)}
            >
              <Text style={styles.label}>Fecha de Afiliación *</Text>
              <TextInput
                style={styles.input}
                value={formData.fAfiliacion}
                placeholder="DD/MM/AAAA"
                editable={false}
                pointerEvents="none"
              />
              <Image 
                source={require('../../assets/calendario.png')} 
                style={{ width: 25, height: 25, position: 'absolute', zIndex: 2, right: 10, top: 14 }} 
              />
            </TouchableOpacity>

            <DatePicker
              modal
              open={show_date_select_2}
              date={tempDate2}
              mode="date"
              locale="es"
              onConfirm={(date) => {
                set_date_select_2(false);
                setTempDate2(date);
                setFormData(prev => ({ ...prev, fAfiliacion: formatDate(date) }));
              }}
              onCancel={() => {
                set_date_select_2(false);
              }}
            />
          </View>

          <View style={styles.fieldset}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Teléfono *</Text>
              <TextInput
                style={styles.input}
                value={formData.celular}
                onChangeText={(text) => handleChange('celular', text)}
                placeholder="Ingrese teléfono"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Otro Teléfono *</Text>
              <TextInput
                style={styles.input}
                value={formData.otroTelefono}
                onChangeText={(text) => handleChange('otroTelefono', text)}
                placeholder="Ingrese otro teléfono"
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Interes *</Text>
              <TextInput
                style={styles.input}
                value={formData.interesFK}
                onChangeText={(text) => handleChange('interesFK', text)}
                placeholder="Interes"
              />
            </View>

            <View style={[styles.inputGroup, { marginBottom: 0 }]}>
              <Text style={styles.label}>Dirección *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.direccion}
                onChangeText={(text) => handleChange('direccion', text)}
                placeholder="Ingrese dirección"
                multiline
              />
            </View>
          </View>

          <View style={styles.fieldset}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reseña Personal *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.resennaPersonal}
                onChangeText={(text) => handleChange('resennaPersonal', text)}
                placeholder="Ingrese reseña personal"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigate.goBack()}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={On_Submit} style={styles.saveButton}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    paddingVertical: 5,
  },
  backIcon: {
    width: 45,
    height: 45,
    maxWidth: 45,
    maxHeight: 45,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
  },
  imageContainer: {
    width: '100%',
    maxWidth: 800,
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  avatarCircle: {
    width: 120,
    height: 120,
    maxWidth: 120,
    maxHeight: 120,
    borderRadius: 60,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: -10,
    right: -4,
    zIndex: 99,
    backgroundColor: '#1481f7',
    borderRadius: 20,
    padding: 4,
  },
  cameraImage: {
    width: 30,
    height: 30,
    maxWidth: 30,
    maxHeight: 30,
  },
  formContainer: {
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingBottom: 30,
    paddingTop: 20,
  },
  fieldset: {
    borderRadius: 8,
    padding: 15,
    maxWidth: 800,
    position: 'relative',
  },
  inputGroup: {
    width: '100%',
    maxWidth: 800,
    marginBottom: 15,
    borderWidth: 0.5,
    borderColor: 'black',
    position: 'relative',
    borderRadius: 7,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    position: 'absolute',
    top: -12,
    left: 10,
    paddingHorizontal: 10,
    zIndex: 99,
    backgroundColor: 'white',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 15,
    fontSize: 16,
    width: '100%',
    color: 'black'
  },
  textArea: {
    height: 100,
    maxHeight: 150,
    textAlignVertical: 'top',
    color: 'black'
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
    width: '95%',
    marginLeft: '2.5%',
    maxWidth: 800,
  },
  cancelButton: {
    flex: 1,
    maxWidth: 385,
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    maxWidth: 385,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});