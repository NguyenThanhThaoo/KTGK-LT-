import { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { useMyContextController, login } from '../context';
import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/AntDesign"

 export default LoginScreen = ()=>{
  const [email, setEmail] = useState("");
  const [password, setPassword] =useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  useEffect (() => {
    if(userLogin != null)
        navigation.navigate("Home")

  }, [userLogin])
    // console.log("sfs",userLogin)
  const onSubmit = () => {
    login(dispatch, email, password);
}
return (
      <View style ={{flex:1, justifyContent:"center", alignContent:"center"}}>
        <Text style={{fontSize: 30, fontWeight: "bold", alignSelf:"center", color: "red"}}>
          LOGIN
          </Text> 
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          //secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
        />
        <Button mode="contained" onPress={onSubmit}>Đăng Nhập</Button>
        {/* <Button title="Login" onPress={handleLogin} />
        <View style={{alignItems:"center", justifyContent:'center', padding:10}}>
              <Pressable onPress={()=> navigation.navigate("Register")}>
                  <Text>Sign up</Text>
              </Pressable>
        </View> */}
      </View>
    );
  }

      