import { useState, useCallback, useEffect } from 'react';
import { Pressable, StyleSheet, View} from 'react-native';
import { useMyContextController, login } from '../context/index';
import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/AntDesign";
import firestore from '@react-native-firebase/firestore';

 export default LoginScreen = ({navigation})=>{
  const [email, setEmail] = useState("");
  const [password, setPassword] =useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  // useEffect (() => {
  //   if(userLogin != null)
  //       navigation.navigate("Home")

  // }, [userLogin])
    // console.log("sfs",userLogin)
  const onSubmit = () => {
    login(dispatch, email, password);
    navigation.navigate("Home");
}
return (
      <View style ={{flex:1, justifyContent:"center", alignContent:"center", backgroundColor: 'white'}}>
        <Text style={{fontSize: 30, fontWeight: "bold", alignSelf:"center", color: "#FF6666"}}>
          LOGIN
          </Text> 
        <TextInput
        style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          underlineColor='transparent'
        />
        <TextInput
        style={styles.textInput}
          placeholder="Password"
          //secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
          underlineColor='transparent'
        />
        <Pressable
        mode="contained" 
        onPress={onSubmit} 
        style={styles.textButton}
        >
         <Text style={{color: '#fff', fontWeight:'bold', alignSelf:'center', fontSize:18}}>Đăng Nhập</Text>
          </Pressable>
      </View>
    );
  }

      
  const styles = StyleSheet.create({
    textInput:{
      margin: 10, 
      borderTopRightRadius: 20, 
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    textButton:{
      margin: 10,
      padding: 15,
      borderTopRightRadius: 20, 
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      backgroundColor: '#FF6666',
    }
  })