import React from 'react';
import {View, StyleSheet} from 'react-native';
import CallActionBox from '../../components/CallActionBox';
// import {useNavigation} from 'react-navigation/native'

// const navigation = useNavigation()

// const hangup = () => {
//   navigation.navigate("Contacts")  

// }

const CallScreen = () => {
  return (
    <View style={styles.page}>
      <View style={styles.cameraPreview} />
   
      <CallActionBox
      //  onHangupPress={hangup}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#7b4e80',
    justifyContent:"space-between"
  },
  cameraPreview: {
    width: 100,
    height: 150,
    backgroundColor: '#ffff6e',
    borderRadius: 10,
    position: 'absolute',
    right: 10,
    top: 100,
  },

});

export default CallScreen;
