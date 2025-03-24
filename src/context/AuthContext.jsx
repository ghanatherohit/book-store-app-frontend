import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();


// context is used to pass data through the component tree without having to pass props down manually at every level.
// In this case, we are creating a context for authentication.
const AuthContext = createContext();

// useContext is a hook that allows you to consume a context within a function component.
export const useAuth = () => {
    return useContext(AuthContext);
}


export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //register user
    const registerUser = async (email,password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    //login user
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    //signIn with google account
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth,googleProvider);
    }

    //signOut
    const logOut = () => {
        return signOut(auth);
    }

    //Manage user state
    useEffect(() => {
        //onAuthStateChanged is an observer for changes to the user's sign-in state.
        //It is called with an observer that will trigger every time the user's sign-in state changes.
        const unsubscribe = onAuthStateChanged(auth,(user)=> {
            // console.log("User: ",user.email);
            setCurrentUser(user);
            setLoading(false);
            if(user) {
                const {email,displayName,photoURL} = user;
                const userInfo = {
                    email,
                    username: displayName,
                    photoURL
                }
            }
        })
        return () => unsubscribe();
    })

    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logOut
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


