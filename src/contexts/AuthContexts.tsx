import firebase from "firebase";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";


//Criando types
type User = {
    id: string;
    name: string;
    avatar: string;
}
  
type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}
  
type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType );

export function AuthContextProvider(props: AuthContextProviderProps){
    return(
        <AuthContext.Provider value ={{user, signInWithGoogle}}>
        {props.children}
        </AuthContext.Provider>
    );
}


const [user, setUser] = useState<User>();

useEffect(() => {
const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const {displayName, photoURL, uid} = user
      

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google')
      } 

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  })

  return() => {
    unsubscribe();
  }
}, [])

async function signInWithGoogle(){
  //Autenticando o usuário com a conta do google
  const provider = new firebase.auth.GoogleAuthProvider();

  const result = await auth.signInWithPopup(provider);
  
    //Assim que o usuário faz o login irá fazer:
    if (result.user){
      const {displayName, photoURL,uid} = result.user;
      
      //Caso não tenha nem nome e nem foto
      if (!displayName || !photoURL){
        throw new Error('Missing Information from Google Account');
      }

      //Pegar do usuário
      setUser({
        id: uid,
        name:displayName,
        avatar: photoURL
      });
    }

  }