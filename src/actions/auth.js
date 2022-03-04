import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { notesLogoutCleaning } from "./notes";
import { finishLoading, startLoading } from "./ui";

//Las acciones no son mas que simples funciones.

//Funcion asincrona para probar el middleware.
export const startLoginEmailPassword = (email, password) => {

    return (dispatch) => {

        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {

                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            })
            .catch(error => {

                console.log(error);
                dispatch(finishLoading());
            });
    }
}

export const startRegisterNameEmailPassword = (email, password, nombre) => {

    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {

                await user.updateProfile({ displayName: nombre });
                // console.log(user);
                dispatch(

                    login(user.uid, user.displayName)
                );
            })
            .catch(error => {

                console.log(error);
            })
    }
}

export const startGoogleLogin = () => {

    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {

                dispatch(

                    login(user.uid, user.displayName)
                )
            })
            .catch(error => {

                console.log(error);
            });
    }
}

export const login = (uid, displayName) => {

    return {

        type: types.login,
        payload: {

            uid,
            displayName
        }
    }
}

export const startLogout = () => {

    return async (dispatch) => {

        await firebase.auth().signOut();
        dispatch(logout());
        dispatch(notesLogoutCleaning());
    }
}

export const logout = () => {

    return {

        type: types.logout
    }
}