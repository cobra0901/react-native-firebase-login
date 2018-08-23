import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight, Button } from "react-native";
import firebase from "firebase";
import { Header, Spinner } from "./src/components/common";
import LoginForm from "./src/components/LoginForm";

export default class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBw2mcq1HwPoSUxHd86h4VRHv3ZAFOogAY",
      authDomain: "react-native-auth-exampl-aefd1.firebaseapp.com",
      databaseURL: "https://react-native-auth-exampl-aefd1.firebaseio.com",
      projectId: "react-native-auth-exampl-aefd1",
      storageBucket: "react-native-auth-exampl-aefd1.appspot.com",
      messagingSenderId: "847360186961"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });

    this._onLogoutPressed.bind(this)
  }

  _onLogoutPressed = () => {
    firebase.auth().signOut();
    this.setState({ loggedIn: false });
  };

  _renderContent = () => {
    switch (this.state.loggedIn) {
      case true:
        return (
            <View style={styles.signinField}>
              <TouchableHighlight onPress={this._onLogoutPressed} underlayColor="white">
                  <View style={styles.signinButton}>
                      <Text style={styles.buttonText}>
                          {'Sign out'.toUpperCase()}
                      </Text>
                  </View>
              </TouchableHighlight>
            </View>
        );

      case false:
        return <LoginForm />;

      default:
          <Spinner size="large" />
    }
  };

  render() {
    return <View style={styles.container}>{this._renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  signinField: {
    marginTop: 15,
    marginLeft: 35,
    marginRight: 35,
  },
  signinButton: {
    alignItems: 'center',
    borderRadius: 45,
    backgroundColor: '#4ed589',
  },
  buttonText: {
    fontSize: 16,
    padding: 15,
    color: 'white'
  },
});
