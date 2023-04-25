import React, { createContext, useContext } from "react";
import Axios from 'axios'

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

function reducer(currentState, newState) {
    return { ...currentState, ...newState };
}

function useAuthState() {
    const context = useContext(AuthStateContext);
    if (!context) throw new Error("useAuthState must be used in AuthProvider");

    return context;
}

function useAuthDispatch() {
    const context = useContext(AuthDispatchContext);
    if (!context) throw new Error("useAuthDispatch must be used in AuthProvider");

    return context;
}

const initialState = {
    status: "idle",
    user: null,
    error: null
};

function AuthProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {props.children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
}

function Signin(userName, userPwd) {
    return new Promise((resolve, reject) =>
        Axios.post("https://adminapi.jkorpor.com/signin", {
            user_name: userName,
            password: userPwd,
        }).then((res) => {
            if (res.data.status === 'ok') {
                localStorage.setItem('accessToken', res.data.token)
                return resolve(res.data.token);
            } else {
                return reject(res.data.message);
            }
        })
    )

}

async function Login(dispatch, userName, password) {
    try {
        dispatch({ status: "pending" });
        const user = await Signin(userName, password);
        dispatch({
            status: "loggedIn",
            user: user,
            error: null
        });
        return 'success'
    } catch (error) {
        dispatch({ status: "rejected", error });
    }
}

function logOut(dispatch) {
    dispatch(initialState);
    window.location = '/'
}

export { AuthProvider, useAuthState, useAuthDispatch, Login, logOut };
