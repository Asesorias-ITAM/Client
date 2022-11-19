import { defineStore } from 'pinia'
//import { useRouter } from "vue-router";
import { CognitoUserPool } from "amazon-cognito-identity-js";
//imports userpool data from config
import { POOL_DATA } from "@/config/cognito2.js";

import {getListaAlumnos} from "@/services/admin.js"

//const router = useRouter();
export const useAdminStore = defineStore("admin", {

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
          selectedAlumno: null
  
        }
      ),
      getters: {

        //gets current logged in user
        cognitoUser: (state) => state.userPool.getCurrentUser(),
        
      },
      actions:{
        
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

          console.log(Session.idToken.payload)
        },

        async listaAlumnos(){
          const l = await getListaAlumnos()
          console.log(l.alumnos)
          return l.alumnos
        }
        
      },
      persist: true,
})

//https://stackoverflow.com/questions/51103676/aws-cognito-react-js-newpasswordrequired-challenge