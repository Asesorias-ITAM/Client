import { defineStore } from 'pinia'
import { CognitoUserPool } from "amazon-cognito-identity-js";

//imports userpool data from config
import { POOL_DATA } from "@/config/cognito.js";




import {createAlum, checkAlum, confirmUser} from "@/services/alumnos.js"




export const useUserStore = defineStore('user', {
  state: () => (
      { 
        cognitoUserName: null,
        cognitoSub: null,
        email: null,
        asesor: null,
        idToken: null,
        accessToken: null,
        refreshToken: null,
        didAutoLogout: false,
        isAuthenticated: false,
        session: null,
        // gets reference to the Cognito user pool
        userPool: new CognitoUserPool(POOL_DATA),

      }
    ),
  getters: {

    //gets current logged in user
    cognitoUser: (state) => state.userPool.getCurrentUser(),
    
  },
  actions: {

    logout(){
      // gets reference to the Cognito user pool
      const userPool = new CognitoUserPool(POOL_DATA);
      //gets current logged in user
      const cognitoUser = userPool.getCurrentUser();

      localStorage.clear();

      cognitoUser.signOut();
      
      this.isAuthenticated = false
    },

    autoLogout(state){
      this.didAutoLogout = true
      this.logout(state)
    },

    login(Session){
      this.session = Session
      this.idToken = Session.getIdToken().getJwtToken()
      this.username = Session.idToken.payload["cognito:username"]
      this.asesor = Session.idToken.payload["custom:Asesor"]
      this.isAuthenticated = true
      this.email = Session.idToken.payload.email
      console.log(this.session)
      
    },

    //Agrega usuario al directorio
    async crearAlumno(user){
      //console.log(user)
      try{
        const res = await createAlum(user)
        if ('errors' in res){
          throw new Error("Ya hay una cuenta con ese correo")
        }
      }catch(err){
        console.log(err)
        //throw new Error(err)
      }
    },
    //Cambia el campo de comfirmed a true
    async confirmUser(user){
      console.log(user)
      try{
        await confirmUser(user.correo)
        
      }catch (err){
        throw new Error(err)
      }
    },

    //checa si ya existe el usuario
    async checkUser(user){
      //console.log(user)
        try{
          const res = await checkAlum(user.correo)
          console.log(res)
          console.log(res.alumno)
          if (res.alumno!==null){
              //throw new Error("Ya hay un alumno con ese correo")
              console.log("Ya existe")
              return true
          }
          return false
        }catch(err) {
          //throw new Error()console.log(err)
          console.log(err)
          return true
        } 
    }
  },
  
  persist: true, // Rehidrata la piña
})


