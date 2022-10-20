import { defineStore } from 'pinia'
import { CognitoUserPool } from "amazon-cognito-identity-js";

//imports userpool data from config
import { POOL_DATA } from "@/config/cognito.js";

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
      
    }
  },
})


