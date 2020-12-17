import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';
import logo from '../assets/zl_logo.png';
import route_icon from '../assets/runner.png';
import profile_head from '../assets/profilehead.png';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Auth } from 'aws-amplify';

import Landing from '../landing.js'
const Root = createStackNavigator()


const RouteScreen = ({ navigation, route }) => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={route_icon} style={{ width: 205, height: 159 }}/>
        <Text>This is where the route generator will go!</Text>
      </View>
)

const RunHistScreen = ({ navigation, route }) => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={profile_head} style={{ width: 205, height: 159 }}/>
        <Text>This is where the users past runs will go (and access profile settings)!</Text>
      </View>
)

const Tab = createBottomTabNavigator();


export default function Home({ updateAuthState, navigation }) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }
  return (
    <NavigationContainer independent={true}>
    <View style = {styles.Button}>
    <Button title="Sign Out" color="black" onPress={signOut} />
    </View>
    <Tab.Navigator
    screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Route Generator') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            } else if (route.name === 'Run History') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >

    <Tab.Screen name="Route Generator" component={RouteScreen}/>
    <Tab.Screen name="Run History" component={RunHistScreen} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button:{
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 5,
    borderRadius: 8,
  },
  Tabs:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
});
