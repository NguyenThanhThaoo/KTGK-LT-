import React, { useState } from 'react';
import { View, StyleSheet, Alert, Pressable, Text, FlatList, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { getFirestore, collection, addDoc } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const AddServices = ({ navigation }) => {
  const [services, setServices] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const db = getFirestore();

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {

        setImageUri(response.assets[0].uri);
        console.log(response.assets[0].uri)
      }
    });
  };

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
    let imageUrl = null;
      if (imageUri) {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        const storageRef = storage().ref(`Images/${services}-${Date.now()}`);
        await storageRef.put(blob);
        imageUrl = await storageRef.getDownloadURL();
      }

    try {
      await addDoc(servicesRef, {
        name: services,
        price: priceValue,
        imageUrl,
      });

      navigation.navigate('Home');
      setServices('');
      setImageUri(null);
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
      <Pressable onPress={pickImage} style={{ margin: 10 }}>
        <Text style={{ color: 'blue' }}>Select Image</Text>
      </Pressable>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: "400", height: 200, borderRadius: 10, margin: 10 }}
        />
      )}
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



// import React, { useState } from 'react';
// import { View, StyleSheet, Alert, Pressable, Text, Image } from 'react-native';
// import { TextInput, Button } from 'react-native-paper';
// import { getFirestore, collection, addDoc } from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// const AddServices = ({ navigation }) => {
//   const [services, setServices] = useState('');
//   const [price, setPrice] = useState('');
//   const [imageUri, setImageUri] = useState(null); 
//   const db = getFirestore();

//   const handleAddService = async () => {
//     if (!services || !price) {
//       console.log('Please fill in all fields.');
//       return;
//     }
//     const priceValue = parseFloat(price);
//     if (isNaN(priceValue)) {
//       Alert.alert('', 'Invalid number');
//       return;
//     }

//     const servicesRef = collection(db, 'services');

//     try {
//       const docRef = await addDoc(servicesRef, {
//         name: services,
//         price: priceValue,
//       });

//       // Kiểm tra xem người dùng đã chọn ảnh hay chưa
//       if (imageUri) {
//         // Tạo đường dẫn lưu trữ ảnh trong Storage (với tên là ID của dịch vụ)
//         const imagePath = `services/${docRef.id}.jpg`;
//         const imageRef = storage().ref().child(imagePath);

//         // Upload ảnh vào Storage
//         const response = await fetch(imageUri);
//         const blob = await response.blob();
//         await imageRef.put(blob);

//         // Lấy đường dẫn của ảnh trong Storage và lưu vào Firestore
//         const imageUrl = await imageRef.getDownloadURL();
//         await docRef.update({
//           imageUrl: imageUrl,
//         });
//       }

//       navigation.navigate('Home');
//       setServices('');
//       setPrice('');
//       setImageUri(null);
//     } catch (error) {
//       console.error('Error adding service: ', error);
//     }
//   };

//   const openImagePicker = () => {
//     launchImageLibrary({ mediaType: 'photo' }, (response) => {
//       if (!response.didCancel) {
//         setImageUri(response.uri);
//       }
//     });
//   };

//   return (
//     <View style={{ backgroundColor: '#fff' }}>
//       <TextInput
//         style={{ margin: 10, borderRadius: 10 }}
//         placeholder="Service Name"
//         value={services}
//         underlineColor='transparent'
//         onChangeText={services => setServices(services)}
//       />
//       <TextInput
//         style={{ margin: 10, borderRadius: 10 }}
//         placeholder="Price"
//         value={price}
//         underlineColor='transparent'
//         onChangeText={price => setPrice(price)}
//       />

//       {/* Hiển thị ảnh đã chọn */}
//       {/* {imageUri && (
//         <Image 
//         source={{ uri: imageUri }} 
//         style={{ width: 400, height: 200, borderRadius: 10, margin: 10 }} />
//       )} */}

//       {/* Button để mở thư viện ảnh */}
//       {/* <Pressable onPress={openImagePicker} style={{ alignItems: 'center', margin: 10, borderRadius: 10 }}>
//         <Text style={{ color: 'blue' }}>Select Image</Text>
//       </Pressable> */}

//       <Pressable onPress={pickImage} style={{ alignItems: 'center', margin: 10, borderRadius: 10 }}>
//         <Text style={{ color: 'blue' }}>Select Image</Text>
//       </Pressable>

//       {imageUri && (
//         <Image
//           source={{ uri: imageUri }}
//           style={{ width: "400", height: 200, borderRadius: 10, margin: 10 }}
//         />
//       )}

      
//       <View style={{ justifyContent: 'center', padding: 10 }}>
//         <Pressable
//           onPress={handleAddService}
//           style={{
//             backgroundColor: "#FF6666",
//             alignItems: 'center',
//             padding: 15,
//             borderRadius: 10,
//           }}
//         >
//           <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Add Service</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// export default AddServices;
