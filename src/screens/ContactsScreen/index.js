import React,{useState, useEffect} from 'react';
import {View, FlatList, Text, StyleSheet, Pressable, TextInput} from 'react-native'
import dummydata from '../../../assets/data/contacts.json'
import {Voximplant} from 'react-native-voximplant';
import {useNavigation} from '@react-navigation/core'


const ContactsScreen = ()=> {
  const [searchTerm,setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(dummydata)

  const navigation = useNavigation();
  const voximplant = Voximplant.getInstance();

  // navigates to incoming call screen
  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      navigation.navigate('IncomingCall', {call: incomingCallEvent.call});
    });

    return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
    };
  }, []);

  useEffect(()=>{
    const newContacts = dummydata.filter(contact=>
      contact.user_display_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(newContacts);
      
    },[searchTerm]);
    
  // navigates to call Screem
  const callUser = (user) => {
    navigation.navigate("Calling", {user})
  }
  
  return (
    <View style={styles.page}>
      <TextInput 
         value={searchTerm}
         onChangeText={setSearchTerm}
         placeholder="Search.."
         style={styles.searchInput} 
      />
    <FlatList 
      data={filteredContacts}
      renderItem={({item})=> (
        <Pressable onPress={() => callUser(item)}>
      <Text style={styles.contactName}>{item.user_display_name}</Text>
        </Pressable>
      )}
      ItemSeparatorComponent={()=> <View style={styles.separator} />}
      />
      </View>
  )
}

export default ContactsScreen;

const styles = StyleSheet.create({
  page:{
    padding:15,
    backgroundColor:"#fff",
    flex:1
  },
  contactName:{
    fontSize:16,
    marginVertical:10,
  },
  separator:{
    width:'100%',
    height:1,
    backgroundColor:'#f0f0f0'
  },
  searchInput:{
    backgroundColor:'#f0f0f0',
    padding:10,
    borderRadius:7
  }
});
