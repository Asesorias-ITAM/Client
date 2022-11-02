import { defineStore } from 'pinia'
//import { useRouter } from "vue-router";
import { CognitoUserPool } from "amazon-cognito-identity-js";
//imports userpool data from config
import { POOL_DATA } from "@/config/cognito.js";

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
  
        }
      ),
      getters: {

        //gets current logged in user
        cognitoUser: (state) => state.userPool.getCurrentUser(),
        
      },
      actions:{
        
        async loginAdmin(){
            this.router.replace({
                name: "Admin",
            }); 
            console.log("deberíaentrar")
        }
      }
})

//https://stackoverflow.com/questions/51103676/aws-cognito-react-js-newpasswordrequired-challenge