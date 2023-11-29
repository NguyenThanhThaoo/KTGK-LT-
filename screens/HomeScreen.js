import { View, Text } from "react-native"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Services from "./Services";
//import HomeScreen from "../screens/HomeScreen";

const Tab = createMaterialBottomTabNavigator();

export default HomeScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Services" component={Services} />
            {/* <Tab.Screen name="Customer" component={Services} />
            <Tab.Screen name="Setting" component={Services} /> */}

        </Tab.Navigator>
    )
} 