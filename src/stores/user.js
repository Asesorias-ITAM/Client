import { defineStore } from 'pinia'
import { CognitoUserPool } from "amazon-cognito-identity-js";

//imports userpool data from config
import { POOL_DATA } from "@/config/cognito.js";

import { createAlum, checkAlum, confirmUser, crearGrupo, publishGrupo, 
  getListaPublicaciones, inscribirGrupo, getDatosAlum, getAsesores, dejarGrupo } from "@/services/user.js"

export const useUserStore = defineStore('user', {
  state: () => (
      { 
        cognitoUserName: null,
        cognitoSub: null,
        email: null,
        idToken: null,
        accessToken: null,
        refreshToken: null,
        didAutoLogout: false,
        isAuthenticated: false,
        session: null,
        // gets reference to the Cognito user pool
        userPool: new CognitoUserPool(POOL_DATA),
        currentGrupo: null,
        currUser: null

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

    async login(Session){
      try {
        this.session = Session
        this.idToken = Session.getIdToken().getJwtToken()
        this.email = Session.idToken.payload.email
        this.currUser = await getDatosAlum(this.email)
        this.isAuthenticated = true
        console.log(this.currUser)
        
      //console.log(this.session)
      }catch(error){
        console.log(error)
      }  
      
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
    },

    async crearGrupo(publicacion){
      publicacion.correo = this.email
      console.log(this.email)
      try{
        const id = await crearGrupo(publicacion)
        console.log(id)
        await publishGrupo(id)
        
      }catch (err){
        throw new Error(err)
      }
    },

    async listaPublicaciones(){
      const l = await getListaPublicaciones()
      //console.log(l.publicacions)
      return l.publicacions
    },

    selectGrupo(grupo){
      this.currentGrupo=grupo
    },

    async inscribirGrupo(grupoID){
      try {
        console.log(grupoID)
        console.log(this.email)
        await inscribirGrupo(grupoID,this.email)
        await confirmUser(this.email)
      }catch(error){
        console.log(error)
      }
      
    },

    async getAsesores(){
      try{
        return await getAsesores(this.email)
      }catch(error){
        console.log(error)
      }
    },

    async dejarGrupo(groupID){
      try{
        await dejarGrupo(groupID,this.email)
        await confirmUser(this.email)
      }catch(error){
        console.log(error)
      }
    }
  },
  
  
  persist: true, // Rehidrata la piña
})


