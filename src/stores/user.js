import { defineStore } from 'pinia'
import { CognitoUserPool } from "amazon-cognito-identity-js";

//imports userpool data from config
import { POOL_DATA } from "@/config/cognito.js";

import { createAlum, checkAlum, confirmUser, crearGrupo, publishGrupo, 
  getListaPublicaciones, inscribirGrupo, getDatosAlum, getAsesores, dejarGrupo, 
  updateDatosAlum, getPublicaciones, eliminarPublicacion, stopPublishGrupo, restorePublishGrupo} from "@/services/user.js"

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
        currUser: null,
        currAsesores: [],
        currPublicaciones: [],
        groupIDs: new Set(),
        pubsIDs: new Set()

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
        //console.log(publicacion)
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
        //console.log(grupoID)
        //console.log(this.email)
        await inscribirGrupo(grupoID,this.email)
        await confirmUser(this.email)
      }catch(error){
        console.log(error)
      }
      
    },

    //Grupos de mis asesores
    async getAsesores(){
      try{
        this.currAsesores = await getAsesores(this.email)
        this.groupIDs = await this.groupOnlyIDs(this.currAsesores)
      }catch(error){
        console.log(error)
      }
    },

    //Grupos donde soy asesor
    async getGrupos(){
      try{
        this.currPublicaciones = await getPublicaciones(this.email)
        this.pubsIDs = await this.pubOnlyIDs(this.currPublicaciones)
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
    },

    async groupOnlyIDs(asesores){
      let con = new Set()
	    await asesores.forEach(item => {
        con.add(item.id)
      });
  
      return con
    },
    async pubOnlyIDs(publis){
      let con = new Set()
	    await publis.forEach(item => {
        con.add(item.id)
      });
  
      return con
    },

    async updatePerfil(newPerfil){
      try{
        console.log("Perfil a cambiar")
        console.log(newPerfil)
        await updateDatosAlum(newPerfil)
        await confirmUser(newPerfil.correo)
        this.currUser = await getDatosAlum(this.email)
        console.log(this.currUser)
      }catch(error){
        console.log(error)
      }
    },

    async eliminarPublicacion(ID){
      try {
        console.log("publicacion a elimnar: "+ID)
        await eliminarPublicacion(ID)
      }catch(error){
        console.log(error)
      }
      
    },
     async restorePublications(){
      try {
        
        await restorePublishGrupo(this.email)
      }catch(error){
        console.log(error)
      }
     },
     async stopPublications(){
      try {
        
        await stopPublishGrupo(this.email)
      }catch(error){
        console.log(error)
      }
     }
  },
  
  
  persist: true, // Rehidrata la piña
})


