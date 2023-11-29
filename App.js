// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

import { React, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyContextControllerProvider } from './context';
import Router from './screens/Router';
import '@react-native-firebase/app';
//import firestore from "@react-native-firebase/firestore"
import auth  from '@react-native-firebase/auth';
import { StyleSheet, Text, View } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';



const initial = () => {
  const USERS = firebase().collection("USERS")
  const admin = {
    name: "admin",
    phone: "0969215279",
    address: "Binh Duong",
    email: "nguyetthao06072002@gmail.com",
    password: "123456",
    role: "admin",
  }
  USERS.doc(admin.email)
    .onSnapshot(u => {
      if (!u.exists) {
        auth().createUserWithEmailAndPassword(admin.email, admin.password)
          .then(() =>
            USERS.doc(admin.email).set(admin)
              .then(() => console.log("Add new user admin!"))
          )
      }
    })
}

export default App = () => {
  useEffect(() => {
    initial()
  }, [])
  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </MyContextControllerProvider>

  )
}
// const Stack = createStackNavigator();
// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Register" component={RegisterScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Welcome" component={WelcomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>

//   );
// };

// export default App;