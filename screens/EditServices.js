import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import { getFirestore, doc, getDoc, updateDoc } from '@react-native-firebase/firestore';

const EditServices = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [service, setService] = useState({});
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(getFirestore(), 'services', itemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setService(docSnap.data());
        setName(docSnap.data().name);
        setPrice(docSnap.data().price.toString());
      }
    };

    fetchData();
  }, [itemId]);

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(getFirestore(), 'services', itemId), {
        name,
        price: parseFloat(price),
      });
      console.log('Dịch vụ đã được cập nhật thành công!');
      navigation.goBack();
    } catch (error) {
      console.error('Lỗi khi cập nhật dịch vụ:', error);
    }
  };

  return (
    <View style={{ backgroundColor: '#fff' }}>
      <TextInput
        style={{ margin: 10, borderRadius: 10 }}
        placeholder="Service Name"
        value={name}
        onChangeText={(text) => setName(text)}
        underlineColor='transparent'
      />
      <TextInput
        style={{ margin: 10, borderRadius: 10 }}
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        underlineColor='transparent'
      />
      <View style={{ justifyContent: 'center', padding: 10 }}>
        <Pressable
          onPress={handleUpdate}
          style={{
            backgroundColor: "#FF6666",
            alignItems: 'center',
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Update</Text>
        </Pressable>
      </View>

    </View>
  );
};

export default EditServices;
