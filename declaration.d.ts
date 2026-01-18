type Roock_Params_List = {
  Home: undefined;
  Client_consultant: undefined;
  Login: undefined;
  Register: undefined;
  '*': undefined;
  Mantenimiento_Clientes: Interface_Cliente_Mantenimiento;
};

interface Context_state_interface {
  state_login: boolean;
  username: string;
  userid: string;
  token: string;
}

declare module '*/*.png' {
  const value: any;
  return value;
}

declare module '*/*.jpg' {
  const value: any;
  return value;
}

interface Text_input_login {
  user: string;
  password: string;
}

interface Text_input_register {
  user: string;
  password: string;
  email: string;
}

interface Inteface_context {
  loading: boolean;
  state: Context_state_interface;
  set_state: Dispatch<SetStateAction<Context_state_interface>>;
}

type Interface_Filter_Client = 'Nombre' | 'key';

interface Interface_search_client {
  id: string;
  nombre: string;
  identificacion: string;
  apellidos: string;
}

interface Interface_Client_Slice {
  id: string;
  nombre: string;
  apellidos: string;
  identificacion: string;
  telefonoCelular: string;
  otroTelefono: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: string;
  resenaPersonal: string;
  imagen: string;
  interesesId: string;
}
interface Interface_Cliente_Mantenimiento {
  id: string;
  nombre: string;
  apellidos: string;
  identificacion: string;
  celular: string;
  otroTelefono: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: "F" | "M" | "";
  resennaPersonal: string;
  imagen: string;
  interesFK: string;
  tipo: "Create" | "Upgrade";
}

interface Search_Interface {
  id: string;
  identificacion: string;
  nombre: string;
  apellidos: string;
}

 
