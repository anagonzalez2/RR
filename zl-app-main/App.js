import { StatusBar } from 'expo-status-bar';
import React, {Component, useState, useEffect} from 'react';
import { Button, Image, StyleSheet, Text, View, Dimensions, ActivityIndicator} from 'react-native';
import logo from './assets/zl_logo.png';

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Root = createStackNavigator()

//SPLASH SCREEN
 import * as SplashScreen from 'expo-splash-screen';

 export class Splash extends React.Component {
  state = {
    appIsReady: false,
  };

  async componentDidMount() {
    // Prevent native splash screen from autohiding
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    this.prepareResources();
  }
//
//   /**
//    * Method that serves to load resources and make API calls
//    */
  prepareResources = async () => {
    try {
      await performAPICalls();
      await downloadAssets();
    } catch (e) {
      console.warn(e);
    } finally {
      this.setState({ appIsReady: true }, async () => {
        await SplashScreen.hideAsync();
      });
    }
  };

  render() {
    if (!this.state.appIsReady) {
      return null;
    }

    return (
      <View style={styles.container}>
          <Image source={logo} style={{ width: 205, height: 159 }} />
          <Text style={{color: '#FFFFFF', fontSize: 35}}>
            ZON LOOPT
          </Text>
          <Text style= {{color: '#FFFFFF', fontSize: 20}}>
            Running Routes
          </Text>
          <View style = {styles.ButtonLogin}>
          <Button
            color="#000000"
            title='Login'
            onPress={() => {navigation.push('Login')}} />
            </View>
          <StatusBar style="auto" />
    </View>
    );
  }
}

// Put any code you need to prepare your app in these functions
 async function performAPICalls() {}
 async function downloadAssets() {}

const Login = ({ navigation, route }) => (
  <View style={styles.container}>
      <Image source={logo} style={{ width: 205, height: 159 }} />
      <Text style={{color: '#FFFFFF', fontSize: 18}}>
        Login
      </Text>
      <StatusBar style="auto" />
      <View style = {styles.ButtonLogin}>
      <Button
        color="#000000"
        title="Sign in with Google"
        onPress={() => Auth.federatedSignIn({ provider: "Google" })}
      />

      <View style={styles.space} />
      <Button
        color="#000000"
        title="Sign in with Facebook"
        onPress={() => Auth.federatedSignIn({ provider: "Facebook" })}
      />

      <View style={styles.space} />
      <Button
        color="#000000"
        title="Launch Hosted UI"
        onPress={() => Auth.federatedSignIn()}
      />
      </View>
  </View>
)

//AWS Login Screen & user authentication
import Amplify from 'aws-amplify';
import config from './aws-exports';

import SignIn from './aws_screens/SignIn';
import SignUp from './aws_screens/SignUp';
import ConfirmSignUp from './aws_screens/ConfirmSignUp';
import Home from './aws_screens/Home';

Amplify.configure(config);

import { withAuthenticator } from 'aws-amplify-react-native';
import { Auth } from 'aws-amplify';

const AuthenticationStack = createStackNavigator();
const AppStack = createStackNavigator();

const AuthenticationNavigator = props => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="SignIn">
        {screenProps => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
      />
    </AuthenticationStack.Navigator>
  );
};

const AppNavigator = props => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Zon Loopt Home">
        {screenProps => (
          <Home {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="tomato" />
      <View style={styles.container}>
        <Image source={logo} style={{ width: 205, height: 159 }} />
        <Text style={{color: '#FFFFFF', fontSize: 18}}>
          ZON LOOPT
        </Text>
        <Text style= {{color: '#FFFFFF', fontSize: 10}}>
          Running Routes
        </Text>
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

/*
import landing from './pages/landing'
import login from './pages/login'
import join from './pages/join'


import {createStackNavigator} from 'react-navigation';

const RootStack = createStackNavigator({
  landing: Landing,
  login: Login,
  join: Join,

})
*/


function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
  useEffect(() => {
    checkAuthState();
  }, []);
  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      console.log('<img draggable="false" class="emoji" alt="✅" src="https://s.w.org/images/core/emoji/11/svg/2705.svg"> User is signed in');
      setUserLoggedIn('loggedIn');
    } catch (err) {
      console.log('<img draggable="false" class="emoji" alt="❌" src="https://s.w.org/images/core/emoji/11/svg/274c.svg"> User is not signed in');
      setUserLoggedIn('loggedOut');
    }
  }
  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }

  // async function signOut() {
  //   try {
  //     await Auth.signOut();
  //   } catch (error) {
  //     console.log('Error signing out: ', error);
  //   }
  // }

  return (
    <NavigationContainer>
        {isUserLoggedIn === 'initializing' && <Initializing />}
        {isUserLoggedIn === 'loggedIn' && (
          <AppNavigator updateAuthState={updateAuthState} />
        )}
        {isUserLoggedIn === 'loggedOut' && (
          <AuthenticationNavigator updateAuthState={updateAuthState} />
        )}
      </NavigationContainer>
    // <NavigationContainer>
    //   <Root.Navigator>
    //     <Root.Screen name="Landing" component={Landing} />
    //     <Root.Screen name="Login" component={Login} />
    //     <Root.Screen name="Home" component={Home} />
    //   </Root.Navigator>
    // </NavigationContainer>

    );
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonLogin: {
      backgroundColor: '#FFFFFF',
      borderColor: '#FFFFFF',
      borderWidth: 5,
      borderRadius: 8,
      marginVertical: 45,
      width:Dimensions.get("window").width * .5,
      display:"flex",
      justifyContent:"space-evenly",
      alignItems: "center",
      padding: 1,
   },
   space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  text: {
    color: 'white'
  }
});
