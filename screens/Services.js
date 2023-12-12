import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, collection, query, onSnapshot } from '@react-native-firebase/firestore';
import { createStackNavigator } from '@react-navigation/stack';
import AddServices from '../AddService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-virtualized-view';

//const Stack = createStackNavigator();

const Services = ({ navigation }) => {
    const [services, setServices] = useState([]);
    const db = getFirestore();

    useEffect(() => {
        Icon.loadFont();

        const servicesRef = collection(db, 'services');

        const unsubscribe = onSnapshot(query(servicesRef), (querySnapshot) => {
            const servicesList = [];
            querySnapshot.forEach((doc) => {
                servicesList.push({ ...doc.data(), id: doc.id });
            });
            setServices(servicesList);

        });

        return () => unsubscribe();
    }, [db]);

    return (
        <View>
            <View style={styles.container}>
                <View>
                    <Text style={{ fontWeight: '500' }}>Danh Sách Dịch Vụ</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('AddServices')}>
                    <Text>
                        <Icon name="playlist-add" size={30} color="green" />
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <FlatList
                    data={services}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.name}</Text>
                            <Text>{item.description}</Text>
                        </View>
                    )}
                />

            </ScrollView>
        </View>
    );
};

// const ServicesScreen = () => {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen name="Services" component={Services} />
//             <Stack.Screen name="AddServices" component={AddServices} />
//         </Stack.Navigator>
//     );
// };
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    item: {
        width: '100%',
        borderWidth: 1,
        padding: 15,
        borderColor: 'gray',
        borderRadius: 10,
    }
});
export default Services;


