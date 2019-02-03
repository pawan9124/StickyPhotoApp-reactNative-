import Axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";
import { AsyncStorage, Linking } from "react-native";

//This action for auth is called when an actions happen
//Register user
export const registerUser = (userData, history) => dispatch => {
  Axios.post("/api/userAuth/register", userData)
    .then(res => {
      document.getElementById("registerMessage").innerHTML =
        "User Registered Successfully!";
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Login - Get User Token
export const loginUser = userData => dispatch => {
  console.log("HERER===>", userData);
  Axios.post("https://21df5eed.ngrok.io/api/userAuth/login", userData)
    .then(res => {
      console.log("RESPON", res);
      //Save to localStorage
      const { token } = res.data;
      //Set token to ls
      // _storeData = async () => {
      //   try {
      //     await AsyncStorage.setItem("jwtToken", token);
      //   } catch (error) {
      //     console.log("ERROR", error);
      //   }
      // };
      AsyncStorage.setItem("jwtToken", token);
      //Set token to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current usr
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log("ERRRR", err);
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Logout the user
export const logoutUser = () => dispatch => {
  //Remove the token from localStorage
  // localStorage.removeItem("jwtToken");
  _removeData = async () => {
    try {
      await AsyncStorage.removeItem("jwtToken", token);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  //Remove auth header for future requests
  setAuthToken(false);
  //Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
