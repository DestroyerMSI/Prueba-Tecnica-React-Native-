import axios from "axios";
import { SetStateAction, useCallback } from "react";



export default function Search_Client({
  token,
  id_user_seccion,
  set_client,
  set_loading,
  identificacion,
  key
}: {
  set_client: React.Dispatch<SetStateAction<Search_Interface[]>>;
  set_loading: React.Dispatch<React.SetStateAction<boolean>>;
  identificacion: Interface_Filter_Client;
  key: string;
  token:string;
  id_user_seccion:string,
}) {

    console.log(key,token)
 const On_Submit = useCallback(async () => {
  if (!key.trim()) {
    return;
  }
  
  set_loading(true);
  
  try {
    const base_url = 'https://pruebareactjs.test-class.com/Api';
    
    const body: {
      identificacion?: string;
      nombre?: string;
      usuarioId: string;
    } = {
      usuarioId: id_user_seccion
    };

    if (identificacion === 'Nombre') {
      body.nombre = key;
    } else {
      body.identificacion = key;
    }

   
    const response = await axios.post<Search_Interface[]>(
      `${base_url}/api/Cliente/Listado`,
      body,
      {
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    if(response.status === 200){
    console.log('Respuesta exitosa:', response);
    set_client(response.data || []);
  }
  } catch (error) {
  
    console.error('Error completo:', error);
    set_client([]);
  } finally {
    set_loading(false);
  }
}, [identificacion, key, token, id_user_seccion, set_client, set_loading]);

  return On_Submit;
}