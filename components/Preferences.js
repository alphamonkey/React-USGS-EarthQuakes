const defaultPreferences = {
    'radius':50,
  }

  export const setPreference = async (key, value)  => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      Alert.alert('Preferences Error', error);
    }
  }

  export const getPreference = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) {
        return defaultPreferences[key];
      } 
      } catch(e) {
        console.log(e);
        return defaultPreferences[key];
    }
  }