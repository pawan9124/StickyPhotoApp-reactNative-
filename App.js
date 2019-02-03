import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import store from "./client/store";
import { Provider } from "react-redux";
import { Router, Scene } from "react-native-router-flux";
import Login from "./client/components/auth/Login";
import Dashboard from "./client/components/dashboard/Dashboard";
import setAuthToken from "./client/utils/setAuthToken";
import { Actions } from "react-native-router-flux";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./client/actions/authActions";
import { clearCurrentProfile } from "./client/actions/profileActions";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "grey",
    alignItems: "center",
    height: 600
  },
  redbox: {
    width: 100,
    height: 100,
    backgroundColor: "red"
  },
  bluebox: {
    width: 100,
    height: 100,
    backgroundColor: "blue"
  },
  blackbox: {
    width: 100,
    height: 100,
    backgroundColor: "black"
  }
});
console.log("CHEATER");

//Check for token
AsyncStorage.getItem("jwtToken").then(token => {
  console.log("TOKEN", token);
  //Check for token
  if (token !== null) {
    //Set auth token header auth
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    //Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    //Check if the token expired
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      //Logout user
      store.dispatch(logoutUser());
      //Clear current Profiles
      store.dispatch(clearCurrentProfile());
      //Redirect to login
      Actions.login();
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="login" component={Login} title="Login" initial={true} />
            <Scene key="dashboard" component={Dashboard} title="Dashboard" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
