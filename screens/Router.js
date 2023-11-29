import React from "react"
import 'react-native-gesture-handler';
import { View, Text, StyleSheet } from "react-native";
import { useMyContextController } from "../context";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import ServiceDetail from "./ServiceDetail";
import Services from "./Services";
//import { firebase } from "@react-native-firebase/firestore";
const Stack = createStackNavigator();
export default Router = () => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;
    console.log(userLogin)
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
        // <View style={{...styles.container}}>
        //     <Text>App</Text>
        // </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1
        }
    }
)