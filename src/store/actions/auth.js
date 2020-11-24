import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return{
    type: actionTypes.AUTH_START
  }
};
export const authSuccess = (responseData) => {
  return{
    type: actionTypes.AUTH_SUCCESS,
    idToken: responseData.idToken,
    userId: responseData.localId
  }
};
export const logout = () => {
  return{
    type: actionTypes.AUTH_LOGOUT
  }
};
export const checkAuthTimeout = (expirationTime) => {
 return dispatch=>{
   setTimeout((expirationTime)=>{
     dispatch(logout())
   }, expirationTime*1000)
 }
};
export const authFail = (error) => {
  return{
    type: actionTypes.AUTH_FAIL,
    error: error
  }
};
export const auth = (userInputData, singingIn) => {
  return dispatch =>{
    dispatch(authStart());
    const authData = {
      email: userInputData.email, 
      password: userInputData.password, 
      returnSecureToken : true
    };
    let endpoint = singingIn ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQCG4lf_EVULmDy_FuD97vLjtBq5QFX4k' : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQCG4lf_EVULmDy_FuD97vLjtBq5QFX4k'
    axios.post(endpoint, authData)
    .then((response) => {
      console.log('auth response', response.data);
      dispatch(authSuccess(response.data));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch((error) => {
      console.log('auth error', error);
      dispatch(authFail(error.response.data.error))
    })
  } 
};

export const setAuthRedirectPath = (path) => {
  return{
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}