import React, {useState, useEffect} from 'react'
import { StyleSheet, TextInput, View, Pressable, Text, Alert } from 'react-native'
import {Voximplant} from 'react-native-voximplant';
// import {useNavigation} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/core';
import {APP_NAME, ACC_NAME} from '../../constants'

const LoginScreen = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const voximplant = Voximplant.getInstance();

    const navigation = useNavigation();
    
    useEffect(() => {
        const connect = async () => {
            const status = await voximplant.getClientState()
            if (status === Voximplant.ClientState.DISCONNECTED){
                await voximplant.connect()
            } else if (status === Voximplant.ClientState.LOGGED_IN){
                redirectHome();
            }
        }
        connect()
    },[])
    
    const signIn = async () => {
        try {
            const fqUsername = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
            await voximplant.login(fqUsername, password)
            redirectHome()
        }   
        catch (e) {
            Alert.alert(e.name, `Error code : ${e.code}`)
        }
    }
    
    const redirectHome = () => {
        navigation.reset({index: 0, routes: [{name: 'Contacts',}]})
    }

    return (
        <View style={styles.container}>
            <TextInput
             placeholder="username"
             onChangeText={setUsername}
             value={username}
             style={styles.input}
             autoCapitalize="none"
             />
            <TextInput
             placeholder="password"
             onChangeText={setPassword}
             value={password}
             secureTextEntry
             style={styles.input}
             />
             <Pressable onPress={signIn} style={styles.button}>
                 <Text style={styles.text}>Sign In  🚀🚀</Text>
             </Pressable>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'stretch',
        backgroundColor:"#eee",
        padding:20
    },
    input:{
        backgroundColor:"#fff",
        margin: 3,
        borderRadius:5,
        padding:10,
        marginBottom:10
    },
    button:{
        marginTop:30,
        alignItems:"center",
        backgroundColor:"#4267B2",
        borderRadius:7,
        padding:10
    },
    text:{
        color:"#fff",
        fontSize:20
    }
})
