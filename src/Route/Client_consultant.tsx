import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Logout_Icon from '../Component/Logout_Icon';
import { useCallback, useEffect, useState } from 'react';
import { Use_Context_state } from '../Context/Context_State';
import { use_app_selector } from '../Hooks/Redux_use';
import axios from 'axios';
import { fetch_client } from '../Redux/ClientsSlice';
import { useDispatch } from 'react-redux';
import Render_Client_List from '../Component/Render_Client_List';
import Loader_Client_List from '../Component/Client_List_Loader_Skeleton';
import Search_Client from '../Hooks/Shearch_Client';
import Render_Client_Search from '../Component/Render_Client_Search';

export default function Client_Consultant() {
  const navigate =
    useNavigation<NativeStackNavigationProp<Roock_Params_List>>();
  const [filter_type, set_filter_type] =
    useState<Interface_Filter_Client>('Nombre');
  const [search_input, set_search] = useState<string>('');
  const data = use_app_selector(state => state.clients);
  const context = Use_Context_state();
  const [loading, set_loading] = useState<boolean>(true);
  const clients = use_app_selector(state => state.clients);
  const [render_client, set_render_client] = useState<Interface_Client_Slice[]>(
    [],
  );
  const [results_search, set_results_search] = useState<Search_Interface[]>([]);
  const dispatch = useDispatch();
  const [loading_search, set_Loading_search] = useState<boolean>(false);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (clients.length === 0) {
      const fetchClients = async () => {
        try {
          const token = context?.state.token;
          // En la documentacion no dice q tiene la Authorization  por beaber pero sino me da 401 no autorizado

          const response = await axios.get(
            'https://pruebareactjs.test-class.com/Api/api/Intereses/Listado',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          console.log(response,response.status);
          if (response.data && Array.isArray(response.data)) {
            response.data.forEach(
              async (item: { id: string; descripcion: string }) => {
                //Tampoco no dice q esto lleva la Authorization por en la documentacion reconozco el problema por el 401
                console.log('Consultando ID:', item.id);
                const response_detail = await axios.get(
                  `https://pruebareactjs.test-class.com/Api/api/Cliente/Obtener/${item.id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  },
                );
                console.log(response_detail);
                if (response_detail.status === 200) {
                  set_render_client(prevClients => [
                    ...prevClients,
                    response_detail.data,
                  ]);
                  if (loading) set_loading(false);
                }
              },
            );
            dispatch(fetch_client(render_client));
          }
        } catch (error) {
          console.error('Error:', error);
          Alert.alert('Lo sentimos', 'Ha ocurrido un error del servidor.');
        } finally {
          // Le di un retardo para que pueda ver el skeleton loader
          setTimeout(() => {
            set_loading(false);
          }, 500);
        }
      };

      fetchClients();
    } else {
      // Le di un retardo para que pueda ver el skeleton loader, en un caso real esto no se debe hacer
      setTimeout(() => {
        set_loading(false);
      }, 500);
    }
  }, [clients.length, context?.state, dispatch]);

  const handleSearch = Search_Client({
    id_user_seccion: context?.state.username || '',
    set_client: set_results_search,
    key: search_input,
    token: context?.state.token || '',
    identificacion: filter_type,
    set_loading: set_Loading_search,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>{navigate.reset({index:0,routes: [{ name: "Home" }]})}}>
          <Image
            source={require('../../assets/casa.png')}
            style={styles.img_icon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Consulta de Clientes</Text>
        <Logout_Icon to="Home" logoutIcon={styles.logoutIcon} />
      </View>

      <TouchableOpacity
        onPress={() => {
          navigate.navigate('Mantenimiento_Clientes', {
            id: '',
            nombre: '',
            apellidos: '',
            identificacion: '',
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
          });
        }}
        style={styles.newClientButton}
      >
        <Text style={styles.newClientText}>+ NUEVO CLIENTE</Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={handleSearch}>
          <Image
            source={require('../../assets/búsqueda.png')}
            style={styles.img_icon_search}
          />
        </TouchableOpacity>

        <TextInput
          value={search_input}
          onChangeText={e => {
            set_search(e);
          }}
          placeholderTextColor={'black'}
          returnKeyType="done"
          style={{ width: '100%', height: '100%', color: 'black' }}
        />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => {
            set_filter_type('Nombre');
          }}
          style={[
            styles.filter_btn,
            {
              backgroundColor:
                filter_type === 'Nombre' ? '#e3e1e1cc' : '#efeaeacc',
            },
          ]}
        >
          {filter_type === 'Nombre' && (
            <Image
              source={require('../../assets/verify.png')}
              style={styles.verifyIcon}
            />
          )}
          <Text>Nombre</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            set_filter_type('key');
          }}
          style={[
            styles.filter_btn,
            {
              backgroundColor:
                filter_type === 'key' ? '#e3e1e1cc' : '#efeaeacc',
            },
          ]}
        >
          {filter_type === 'key' && (
            <Image
              source={require('../../assets/verify.png')}
              style={styles.verifyIcon}
            />
          )}
          <Text>Identificación</Text>
        </TouchableOpacity>
      </View>
      {results_search.length > 0 ? (
        <>
          <FlatList
            data={results_search}
            keyExtractor={item => item.id}
            renderItem={({ item }) => Render_Client_Search(item)}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            initialNumToRender={10}
            windowSize={5}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <>
          {loading === true ? (
            <Loader_Client_List width={width} height={height} />
          ) : (
            <FlatList
              data={render_client}
              keyExtractor={item => item.id}
              renderItem={({ item }) => Render_Client_List(item)}
              removeClippedSubviews={true}
              maxToRenderPerBatch={10}
              updateCellsBatchingPeriod={50}
              initialNumToRender={10}
              windowSize={5}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f0f0cc',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    width: '100%',
    maxWidth: 1200,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  filter_btn: {
    width: '45%',
    maxWidth: 250,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    backgroundColor: '#efeaeacc',
    borderRadius: 20,
    height: 40,
    maxHeight: 40,
    justifyContent: 'center',
  },
  img_icon: {
    width: 45,
    height: 45,
    maxWidth: 45,
    maxHeight: 45,
    marginRight: 5,
  },
  img_icon_search: {
    width: 25,
    height: 25,
    maxWidth: 25,
    maxHeight: 25,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    maxWidth: 300,
  },
  logoutIcon: {
    width: 45,
    height: 45,
    maxWidth: 45,
    maxHeight: 45,
  },
  newClientButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginTop: 15,
    width: '95%',
    maxWidth: 600,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  newClientText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  searchContainer: {
    width: '95%',
    maxWidth: 600,
    position: 'relative',
    backgroundColor: '#efeaeacc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 15,
    alignSelf: 'center',
  },
  searchInput: {
    flex: 1,
    maxWidth: 500,
  },
  filterContainer: {
    width: '100%',
    maxWidth: 600,
    marginTop: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  verifyIcon: {
    width: 25,
    height: 25,
    maxWidth: 25,
    maxHeight: 25,
  },
});
