import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { getFirestore, collection, addDoc } from '@react-native-firebase/firestore';

const AddServices = () => {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const db = getFirestore();

  const handleAddService = async () => {
    if (!serviceName || !serviceDescription) {
      console.log('Please fill in all fields.');
      return;
    }

    const servicesRef = collection(db, 'services');

    try {
      await addDoc(servicesRef, {
        name: serviceName,
        description: serviceDescription,
      });

      console.log('Service added successfully!');
      setServiceName('');
      setServiceDescription('');
    } catch (error) {
      console.error('Error adding service: ', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Service Name"
        value={serviceName}
        onChangeText={(text) => setServiceName(text)}
      />
      <TextInput
        placeholder="Service Description"
        value={serviceDescription}
        onChangeText={(text) => setServiceDescription(text)}
      />
      <Button title="Add Service" onPress={handleAddService} />
    </View>
  );
};

export default AddServices;
