import React from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ServiceDetail = ({ route }) => {
    const { name, price } = route.params;

    return (
        <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>Name: {name}</Text>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>Price: {price}</Text>
        </View>

    );
};

export default ServiceDetail;
