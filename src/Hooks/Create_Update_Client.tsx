import axios from "axios";
import { Dispatch, SetStateAction, useCallback } from "react";
import { Alert } from "react-native";

// El fetch de datos me esta dando error 500 y no me proporciona ninguna informacion de el error pero el status 500 es internal server error lo que me da a entender q el error no es mio

export default function Create_Client_Hook(
  item: Interface_Cliente_Mantenimiento,
  set_loading: Dispatch<SetStateAction<boolean>>,
  context: undefined | Inteface_context
) {

  const validateForm = (): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!item.nombre?.trim()) errors.push("El nombre es obligatorio");
    else if (item.nombre.length > 50) errors.push("El nombre no puede tener más de 50 caracteres");

    if (!item.apellidos?.trim()) errors.push("Los apellidos son obligatorios");
    else if (item.apellidos.length > 100) errors.push("Los apellidos no pueden tener más de 100 caracteres");

    if (!item.identificacion?.trim()) errors.push("La identificación es obligatoria");
    else if (item.identificacion.length > 20) errors.push("La identificación no puede tener más de 20 caracteres");

    if (!item.celular?.trim()) errors.push("El celular es obligatorio");
    else if (item.celular.length > 20) errors.push("El celular no puede tener más de 20 caracteres");

    if (item.otroTelefono && item.otroTelefono.length > 20)
      errors.push("El otro teléfono no puede tener más de 20 caracteres");

    if (item.direccion && item.direccion.length > 200)
      errors.push("La dirección no puede tener más de 200 caracteres");

    if (!item.fNacimiento?.trim()) errors.push("La fecha de nacimiento es obligatoria");
    if (!item.fAfiliacion?.trim()) errors.push("La fecha de afiliación es obligatoria");

    if (!item.sexo?.trim()) errors.push("El sexo es obligatorio");
    else if (item.sexo !== "F" && item.sexo !== "M") errors.push("El sexo debe ser F o M");

    if (item.resennaPersonal && item.resennaPersonal.length > 200)
      errors.push("La reseña personal no puede tener más de 200 caracteres");

    if (!item.interesFK?.trim()) errors.push("Debe seleccionar un interés");

    return { valid: errors.length === 0, errors };
  };

  const formatDateToAPI = (dateString: string): string => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  const On_Submit = useCallback(async () => {
    if (!context?.state.userid || !context?.state.token) {
      Alert.alert("Error", "No se encuentra el userId o el Token");
      return;
    }

    const validation = validateForm();
    if (!validation.valid) {
      Alert.alert("Error de validación", validation.errors.join("\n"));
      return;
    }

     const cleanImage = item.imagen
      ? item.imagen.replace(/^data:image\/\w+;base64,/, "").trim()
      : "";

    const base_url = "https://pruebareactjs.test-class.com/Api";
    const rest_url = item.tipo === 'Create' ?  "/api/Cliente/Crear" : "/api/Cliente/Actualizar"
    const body = item .tipo === 'Create' ? {
      nombre: item.nombre.trim(),
      apellidos: item.apellidos.trim(),
      identificacion: item.identificacion.trim(),
      celular: item.celular.trim(),
      otroTelefono: item.otroTelefono?.trim() ?? "",
      direccion: item.direccion?.trim() ?? "",
      fNacimiento: formatDateToAPI(item.fNacimiento),
      fAfiliacion: formatDateToAPI(item.fAfiliacion),
      sexo: item.sexo[0].toUpperCase(),
      resennaPersonal: item.resennaPersonal?.trim() ?? "",
      imagen: cleanImage,
      interesFK: item.interesFK,
      usuarioId: context.state.userid
    }:
    {
      id: item.id,
      nombre: item.nombre.trim(),
      apellidos: item.apellidos.trim(),
      identificacion: item.identificacion.trim(),
      celular: item.celular.trim(),
      otroTelefono: item.otroTelefono?.trim() ?? "",
      direccion: item.direccion?.trim() ?? "",
      fNacimiento: formatDateToAPI(item.fNacimiento),
      fAfiliacion: formatDateToAPI(item.fAfiliacion),
      sexo: item.sexo[0].toUpperCase(),
      resennaPersonal: item.resennaPersonal?.trim() ?? "",
      imagen: cleanImage,
      interesFK: item.interesFK,
      usuarioId: context.state.userid
    }
    ;

    console.log(JSON.stringify(body));

    try {
      set_loading(true);

      const response = await axios.post(
        `${base_url}${rest_url}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${context.state.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      //Deberia ser un status 201 create para el caso de creado
      if(response.status === 200){
        const message = item.tipo ==='Create' ? "Cliente creado correctamente" : "Cliente actualizado"
      Alert.alert("Éxito",message);
}
    } catch (error: any) {
      console.log(error);

      console.log(error.response?.data);

      console.log(error.response?.status);

      Alert.alert(
        "Error",
        error.response?.data?.message ??
        JSON.stringify(error.response?.data) ??
        "Error desconocido"
      );
    } finally {
      set_loading(false);
    }
  }, [item, context?.state.userid, context?.state.token, set_loading]);

  return On_Submit;
}
