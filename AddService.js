import React, { useState } from 'react';
import { View, StyleSheet, Alert, Pressable, Text, FlatList } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { getFirestore, collection, addDoc } from '@react-native-firebase/firestore';

const AddServices = ({ navigation }) => {
  const [services, setServices] = useState('');
  const [price, setPrice] = useState('');
  const db = getFirestore();

  const handleAddService = async () => {
    if (!services || !price) {
      console.log('Please fill in all fields.');
      return;
    }
    const priceValue = parseFloat(price);
    if (isNaN(priceValue)) {
      Alert.alert('', 'Invalid number');
      return;
    }

    const servicesRef = collection(db, 'services');

    try {
      await addDoc(servicesRef, {
        name: services,
        price: priceValue,
      });

      navigation.navigate('Home');
      setServices('');
      setPrice('');
    } catch (error) {
      console.error('Error adding service: ', error);
    }
  };

  return (
    <View style={{ backgroundColor: '#fff' }}>
      <TextInput
        style={{ margin: 10, borderRadius: 10 }}
        placeholder="Service Name"
        value={services}
        underlineColor='transparent'
        onChangeText={services => setServices(services)}
      />
      <TextInput
        style={{ margin: 10, borderRadius: 10 }}
        placeholder="Price"
        value={price}
        underlineColor='transparent'
        onChangeText={price => setPrice(price)}
      />
      <View style={{ justifyContent: 'center', padding: 10 }}>
        <Pressable
          onPress={handleAddService}
          style={{
            backgroundColor: "#FF6666",
            alignItems: 'center',
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Add Service</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddServices;
