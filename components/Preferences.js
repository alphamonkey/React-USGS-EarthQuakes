import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultPreferences = {
    'radius':50,
    'minmag':1,
    'daysago':1
  }

  export const setPreference = async (prefKey, value)  => {
    try {
      console.log('Attempting to set ' + prefKey + 'to ' + value);

      await AsyncStorage.setItem(prefKey.toString(), value.toString());
    } catch (error) {
        console.log(error);
      Alert.alert('Preferences Error', error);
    }
  }

  export const getPreference = async (prefKey) => {
    try {
      const value = await AsyncStorage.getItem(prefKey.toString());
      console.log('Got Key: ' + prefKey);
      if (value === null) {
        return defaultPreferences[prefKey];
      } 
      else {
        return value;
      }
      } catch(e) {
        console.log(e);
        return defaultPreferences[prefKey];
    }
}


    export const getAllKeys = async () => {
        let keys = []
        try {
          keys = await AsyncStorage.getAllKeys()
        } catch(e) {
          // read key error
        }
      
        console.log('All Keys:' + JSON.stringify(keys));
        // example console.log result:
        // ['@MyApp_user', '@MyApp_key']
      }
    
  