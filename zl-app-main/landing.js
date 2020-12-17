 import { StatusBar } from 'expo-status-bar';
import React, {Component, useState, useEffect} from 'react';
import { Button, Image, StyleSheet, Text, View, Dimensions, ActivityIndicator} from 'react-native';
import logo from './assets/zl_logo.png';

const Landing = ({ navigation, route }) => (
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
)

//ZON LOOPT Home screen with signout button
// <View style={styles.container}>
//       <Image source={logo} style={{ width: 205, height: 159 }} />
//       <Text style={{color: '#FFFFFF', fontSize: 35}}>
//         ZON LOOPT HOME
//       </Text>
//       <View style = {styles.Button}>
//   <Button title="Sign Out" color="black" onPress={signOut} />
//   <Button title="go" onPress={() => {navigation.push('Landing')}}/>
//   </View>
//   </View>

//Sample code for tab bar (home and settings)
// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }
//
// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }
//
// const Tab = createBottomTabNavigator();
//
// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }
