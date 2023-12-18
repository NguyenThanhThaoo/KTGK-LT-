// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import { React, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { MyContextControllerProvider } from './context';
// import Router from './screens/Router';
// import '@react-native-firebase/app';
// import auth  from '@react-native-firebase/auth';

// import { firebase } from '@react-native-firebase/firestore';
// import firestore from '@react-native-firebase/firestore';


import { React, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyContextControllerProvider } from './context';
import Router from './screens/Router';
import '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AddServices from './AddService';
import EditServices from './screens/EditServices';


export default App = () => {
  const initial = async () => {
    const USERS = firestore().collection("USERS")
    const admin = {
      name: "admin",
      phone: "0969215279",
      address: "Binh Duong",
      email: "nguyentthao06072002@gmail.com",
      password: "123456",
      role: "admin",
    };
   await USERS.doc(admin.email).onSnapshot(u => {
        if (!u.exists) {
          auth().createUserWithEmailAndPassword(admin.email, admin.password)
            .then(() =>
              USERS.doc(admin.email).set(admin)
                .then(() => console.log("Add new user admin!"))
            )
        }
      })
    
  }
  useEffect(() => {
    initial()
  }, [])
  return (
    <MyContextControllerProvider>
      <NavigationContainer independent={true}>
        <Router />
      </NavigationContainer>
    </MyContextControllerProvider>

  )
}
