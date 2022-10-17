import { defineStore } from 'pinia'
import { CognitoUserPool } from "amazon-cognito-identity-js";

//imports userpool data from config
import { POOL_DATA } from "@/config/cognito.js";
import axios from 'axios';

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

      }
    ),
  getters: {

    //gets current logged in user
    cognitoUser: (state) => state.userPool.getCurrentUser(),
    
  },
  actions: {
    incrementTest(state) {
      state.test++
    },

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
      this.isAuthenticated = true
      this.email = Session.idToken.payload.email
      
    },

    //Agrega usuario al directorio
    addUser(user){
      console.log(user)
      //asesorias-itam-cracop.koyeb.app/api/test
    },
    //Cambia el campo de comfirmed a true
    confirmUser(user){
      console.log(user)
    },

    //checa si ya existe el usuario
    async checkUser(user){
      console.log(user)
        try{
          const res = await axios.post("http://localhost:5000/users/check",user)
          if (res.status===200){
            return true

          }else{
            throw new Error()
          }
        }catch (err) {
          console.log(err)
          return false
        } 
    }
  },
})
