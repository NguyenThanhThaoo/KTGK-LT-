// import { View, Text } from "react-native";
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import Services from "./Services";


// const Tab = createMaterialBottomTabNavigator();

// export default HomeScreen = () => {
//     return (
//         <Tab.Navigator>
//             <Tab.Screen name="Home" component={Services} />
//             <Tab.Screen name="Services" component={Services} />
//             <Tab.Screen name="Customer" component={Services} />
//             <Tab.Screen name="Setting" component={Services} /> 

//         </Tab.Navigator>
//     )
// } 
// import React from "react";
// import { View, Text, FlatList, TouchableOpacity } from "react-native";
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// //import Icon from "react-native-vector-icons/FontAwesome5";
// import Icon from "react-native-vector-icons/FontAwesome";
// import Services from "./Services";
// import AddService from "../AddService";

// const Tab = createMaterialBottomTabNavigator();

// const HomeScreen = ({ navigation }) => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Services" component={ServicesScreen} />
//       <Tab.Screen name="AddService" component={AddServiceScreen} />
//     </Tab.Navigator>
//   );
// }

// const ServicesScreen = ({ navigation }) => {
//   const servicesData = [
//     { id: '1', name: 'Massage', price: '50' },
//     { id: '2', name: 'Facial', price: '40' },
//     // Add more services as needed
//   ];

//   return (
//     <View>
//       <FlatList
//         data={servicesData}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => navigation.navigate('ServiceDetail', { service: item })}
//           >
//             <Text>{item.name} - ${item.price}</Text>
//           </TouchableOpacity>
//         )}
//       />
//       {/* Icon dấu cộng để thêm dịch vụ */}
//       <TouchableOpacity
//         style={{ position: 'absolute', bottom: 16, right: 16 }}
//         onPress={() => navigation.navigate('AddService')}>
//         <FontAwesomeIcon icon="fas fa-plus-circle" />
//         {/* <FontAwesome5 name="plus" size={24} color="white" /> */}
//       </TouchableOpacity>
//     </View>
//   );
// }

// const AddServiceScreen = () => {
//   return (
//     <View>
//       <Text>Add Service</Text>
//       {/* Implement logic to add a new service */}
//     </View>
//   );
// }
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import LoginScreen from './LoginScreen';
import { HomeScreen } from '../screens/HomeScreen'
import Services from './Services';
import AddServices from '../AddService';
//import Logout from './Logout';

import Icon from 'react-native-vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();


const getTabBarIcon = icon => ({ tintColor }) => (
  <Icon name={icon} size={26} style={{ color: "black" }} />
);

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='Services'
      barStyle={{ backgroundColor: "red" }}
      labeled={false}
      activeTintColor={{ color: "red" }}
      inactiveColor={{ color: "red" }}
    >
      <Tab.Screen
        name="Service"
        component={Services}
        options={{
          tabBarIcon: getTabBarIcon('house'),
        }}
      />
      {/* <Tab.Screen
        name="Transaction"
        component={Logout}
        options={{
          tabBarIcon: getTabBarIcon('attach-money'),
        }}
      /> */}
      {/* <Tab.Screen
        name="Customer"
        component={Logout}
        options={{
          tabBarIcon: getTabBarIcon('supervised-user-circle'),
        }}
      /> */}
      {/* <Tab.Screen
        name="Setting"
        component={Logout}
        options={{
          tabBarIcon: getTabBarIcon('settings'),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default Tabs;

//export default HomeScreen;
