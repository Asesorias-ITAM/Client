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

