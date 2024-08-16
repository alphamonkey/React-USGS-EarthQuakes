import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultPreferences = {
    'radius':50,
    'minmag':1,
    'daysago':1
}

  export const setPreference = async (prefKey, value)  => {
    try {
        await AsyncStorage.setItem(prefKey.toString(), value.toString());
    } catch (error) {
        console.error(error);
        Alert.alert('Preferences Error', error);
    }
  }

  export const getPreference = async (prefKey) => {
    try {
        const value = await AsyncStorage.getItem(prefKey.toString());
        if (value === null) {
            return defaultPreferences[prefKey];
        } 
        else {
            return value;
        }
    } catch(error) {
        console.error(e);
        return defaultPreferences[prefKey];
    }
}

    
  