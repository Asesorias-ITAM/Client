import { gql, GraphQLClient} from "graphql-request"

const graphqlAPI = process.env.VUE_APP_API;

const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
    }})

export const getListaAlumnos = async () =>{
    const query = gql`
    query ListaAlumnos {
        alumnos {
            id
            nombre
            apellido
            asesor
        }
    }`
    const result = await graphQLClient.request(query)
    console.log(result)
    return result
}