import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, collection, query, onSnapshot } from '@react-native-firebase/firestore';
import { createStackNavigator } from '@react-navigation/stack';
import AddServices from '../AddService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-virtualized-view';

const Services = ({ navigation }) => {
    const [Services, setServices] = useState([]);
    const db = getFirestore();

    useEffect(() => {
        Icon.loadFont();

        const servicesRef = collection(db, 'services');

        const unsubscribe = onSnapshot(query(servicesRef), (querySnapshot) => {
            // const servicesList = [];
            // querySnapshot.forEach((doc) => {
            //     servicesList.push({ ...doc.data(), id: doc.id });
            // });
            // setServices(servicesList);
            const servicesList = [];
            querySnapshot.forEach((doc) => {
                const serviceData = { ...doc.data(), id: doc.id };
                servicesList.push(serviceData);
            });
            setServices(servicesList);

        });

        return () => unsubscribe();
    }, [db]);



    const handleDetails = (services) => {
        navigation.navigate('ServiceDetail', {
            name: services.name,
            price: services.price,
            imageUrl: services.imageUrl
        });
    };

    const handleDelete = (itemId) => {
        Alert.alert(
            'Xác nhận xoá',
            'Bạn có chắc chắn muốn xoá dịch vụ này?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',

                },
                {
                    text: 'Xoá',
                    onPress: async () => {
                        try {
                            await db.collection('services').doc(itemId).delete();
                            console.log('Dịch vụ đã được xóa thành công!');
                        } catch (error) {
                            console.error('Lỗi khi xóa dịch vụ:', error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };
    const handleEdit = (itemId) => {
        navigation.navigate('EditServices', { itemId });
    };


    return (
        <View style={{ backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <View>
                    <Text style={{ fontWeight: '900', color: '#FF6666' }}>Danh Sách Dịch Vụ</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('AddServices')}>
                    <Text>
                        <Icon name="playlist-add" size={35} color="#FF6699" />
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {/* <FlatList
                    style={{ marginBottom: 150 }}
                    data={Services}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <View style={styles.item}>
                                <TouchableOpacity onPress={() => handleDetails(item)}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#FF6666' }}>{item.name}</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'black' }}>{item.price + "đ"}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={() => handleEdit(item.id)}>
                                                <Icon name="edit" size={24} color="#6699FF" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                                <Icon name="delete" size={24} color="#FF6666" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </View>
                    )}
                /> */}





                <FlatList
                    style={{ marginBottom: 150 }}
                    data={Services}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <View style={styles.item}>
                                <TouchableOpacity onPress={() => handleDetails(item)}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#FF6666' }}>{item.name}</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'black' }}>{item.price + "đ"}</Text>
                                        </View>
                                        {item.image && <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />} 
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={() => handleEdit(item.id)}>
                                                <Icon name="edit" size={24} color="#6699FF" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                                <Icon name="delete" size={24} color="#FF6666" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />







            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    item: {
        width: '100%',
        borderWidth: 2,
        padding: 15,
        height: 80,
        borderColor: '#FF6666',
        borderRadius: 35,
        justifyContent: 'center'
    }
});
export default Services;


