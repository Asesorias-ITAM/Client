import { gql, GraphQLClient} from "graphql-request"

const graphqlAPI = process.env.VUE_APP_API;

const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
    }})


export const createAlum = async (alum) => {
  const query = gql`
    mutation CreateAlum ($nombre: String!, $apellido: String!, $correo: String!, $asesor: Boolean!){
        createAlumno (
          data: {nombre: $nombre, apellido: $apellido, correo: $correo, asesor: $asesor}
        ) {
          id
        }
      }
  `;

  const variables = {
    "nombre": alum.nombre,
    "apellido":alum.apellido,
    "correo": alum.correo,
    "asesor": alum.asesor
  }
  const result = await graphQLClient.request(query, variables)
  return result
}

export const getDatosAlum  = async(email) => {
  //console.log(email)
  const query = gql`
  query DatosUsuario($correo: String!) {
    alumno(where: {correo: $correo}) {
      id
      nombre
      apellido
      asesor
      carrera
      correo
      telefono
      grupos {
        id
      }
    }
  }
  `;
  const variables = {
    "correo": email,
  }
  
  const result = await graphQLClient.request(query, variables)
  //console.log(result.alumno)
  return result.alumno
} 

export const checkAlum = async(email) => {
    //console.log(email)
    const query = gql`
    query CheckAlum($correo: String!) {
        alumno(where: {correo: $correo}) {
          id
        }
      }
    `;
    const variables = {
      "correo": email,
    }
    
    console.log(variables)
    const result = await graphQLClient.request(query, variables)
    console.log(result)
    return result
} 

export const confirmUser = async(email)=>{
  const query = gql`
    mutation confirmAlumno($correo: String!) {
      publishAlumno(where: {correo: $correo}, to: PUBLISHED) {
        id
      }
    }
    `;
    const variables = {
      "correo": email,
    }
    const result = await graphQLClient.request(query, variables)
    return result
}

export const crearGrupo = async (publicacion) => {
  const query = gql`
    mutation crearGrupo($materia: String!, $descripcion: String!, $correo: String!, $precio: Int!){
    createPublicacion(
      data: {
        precio: $precio, 
        materia: $materia, 
        descripcion: $descripcion, 
        alumno: {
          connect: {correo: $correo}
        }
      }
    ) {
      id
    }
  }
  `;
  const variables = {
    "precio": publicacion.precio,
    "materia": publicacion.materia,
    "descripcion":publicacion.descripcion,
    "correo":publicacion.correo
  }
  const result = await graphQLClient.request(query, variables)
  //console.log(result.createPublicacion.id)
  return result.createPublicacion.id
}

export const publishGrupo = async(ID)=>{
  const query = gql`
    mutation publicarGrupo($id: ID) {
      publishPublicacion(where: {id: $id}, to: PUBLISHED) {
        id
      }
    }
    `;
    const variables = {
      "id": ID,
    }
    const result = await graphQLClient.request(query, variables)
    return result
}

export const getListaPublicaciones = async () =>{
  const query = gql`
  query listaPublicaciones {
  publicacions(first: 100) {
          id
          materia
          descripcion
          precio
          alumno {
              id
              nombre
              apellido
              correo
              carrera
              telefono
          }
      }
  }`
  const result = await graphQLClient.request(query)

  return result
}

export const inscribirGrupo = async(ID, correo)=>{
  const query = gql`
    mutation InscribirGrupo($id: ID, $correo: String!) {
      updateAlumno(
        data: {grupos: {connect: {where: {id: $id}}}}
        where: {correo: $correo}
      ) {
        id
      } 
    }
    `;
    const variables = {
      "id": ID,
      "correo": correo
    }
    const result = await graphQLClient.request(query, variables)
    return result
}

export const getAsesores = async (correo) =>{
  const query = gql`
  query getAsesores($correo: String!) {
    alumno(where: {correo: $correo}) {
      grupos(first: 100) {
        id
        materia
        precio
        alumno {
          id
          nombre
          apellido
          carrera
          correo
          telefono
        }
      }
    }
  }`
  const variables = {
    "correo": correo
  }
  const result = await graphQLClient.request(query, variables)

  return result.alumno.grupos
}

export const getJustGroupID = async (correo) =>{
  const query = gql`
    query GetGroupID($correo: String!) {
      alumno(where: {correo: $correo}) {
        grupos {
          id
        }
      }
    }`
  const variables = {
    "correo": correo
  }
  const result = await graphQLClient.request(query, variables)

  return result.alumno.grupos
}

export const dejarGrupo = async(ID, correo)=>{
  const query = gql`
    mutation DejarGrupo($id: ID, $correo: String!) {
      updateAlumno(data: {grupos: {disconnect: {id: $id}}}, where: {correo: $correo}) {
        id
      }
    }
    `;
    const variables = {
      "id": ID,
      "correo": correo
    }
    const result = await graphQLClient.request(query, variables)
    return result
}
