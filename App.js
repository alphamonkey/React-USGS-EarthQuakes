import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import CircleButton from './components/CircleButton';
import EventList from './components/EventList';
import FeatureDetail from './components/FeatureDetail';
import {setPreference, getPreference} from './components/Preferences';
import PreferenceView from './components/PreferenceView';

export default function App() {
    const [features, setFeatures] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDetailVisible, setisDetailVisible] = useState(false);
    const [isSettingsVisible, setisSettingsVisible] = useState(false);
    const [title, setTitle] = useState('Press to refresh');
    const [pickedFeature, setPickedFeature] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
  
    const settingsPressed = () => {
      setisSettingsVisible(true);
    }

    const closeSettings = () => {
      setisSettingsVisible(false);
      refreshPressed();
    }

    const featurePicked = (feature) => {
      setPickedFeature(feature);
      setisDetailVisible(true);
    }

    const closeDetail = () => {
      setisDetailVisible(false);
    }

    const milesToKilometers = (miles) => {
      return miles * 1.6
    }

    const checkLocationPermissions = async () => {
      let locationPermissionStatus = await Location.getForegroundPermissionsAsync();
    
      if (locationPermissionStatus.granted !== true) {
        locationPermissionStatus = await Location.requestForegroundPermissionsAsync();
      }

      if (locationPermissionStatus.granted !== true) {
        return false;     
      }

      return true;
    }

    useEffect(() => {
        refreshPressed();
    }, []);


  const refreshPressed = async () => {
    setIsLoading(true);
    const kmRadius = await getPreference('radius');
    const radius = milesToKilometers(parseFloat(kmRadius));
    const minmag = await getPreference('minmag');
    const daysAgo = await getPreference('daysago');
    let queryDate = new Date();
    queryDate.setDate(queryDate.getDate() - parseInt(daysAgo));

    if (checkLocationPermissions() === false) {
      console.error('Location permission not granted.');
      Alert.alert('Location Error', 'Please grant permission to use location services in Settings');
      setIsLoading(false);
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    
    if (!loc) {
      console.error('Unknown location error.');
      Alert.alert('Location Error', 'Unable to get current location');
      setIsLoading(false);
      return;  
    }

    const urlString = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventtype=earthquake' + 
      '&starttime=' + queryDate.toISOString() + 
      '&latitude=' + loc.coords.latitude + 
      '&longitude=' + loc.coords.longitude + 
      '&maxradiuskm=' + radius + 
      "&minmagnitude=" + parseFloat(minmag) + 
      "&orderby=magnitude";

    console.log(urlString);

    try {
      const response = await fetch(urlString);
      if (response.status === 200) {
        const json = await response.json();
        setTitle(json.metadata.title);
        setFeatures(json.features);
        setLastUpdated(new Date());
      } else {
          let body = await response.text();
          Alert.alert('HTTP Error ' + response.status, body);
          console.error('HTTP Error' + response.status + body);
      }
    } catch (error) {
      Alert.alert('Fetch Error', error);
      console.error('Fetch Error' + error);
    } 

    setCurrentLocation([loc.coords.latitude, loc.coords.longitude]);
    setIsLoading(false);
  }

  return (
    <SafeAreaView style={styles.topLevelContainer}>
      <View style={styles.primaryContainer}>
        {isLoading ? 
          (<ActivityIndicator size='large' color='rgb(102,211,110)' style={{flex:1}}/>)
          :
          (<EventList features={features} onSelect={featurePicked} currentLocation={currentLocation}/>)
        }
        <View style={styles.bottomBar}>
          {!isLoading ? 
            (<CircleButton onPress={refreshPressed} icon="reload" ringColor = 'rgb(102,211,110)'/>)
            :
            (<View/> ) 
          }
          {isLoading ? 
            (<Text style={styles.title}>Loading...</Text>)
            :
            (<View style = {{alignItems:'center'}}>
                <Text style={styles.title}>{features ? (features.length + ' Earthquakes'):('No data, press reload')}</Text>
                <Text style={styles.subtitle}>Last updated: {lastUpdated ? (lastUpdated.toLocaleDateString() + ' ' +  lastUpdated.toLocaleTimeString()):('Never')}</Text>
            </View>
            )
          }
          {!isLoading ? 
            (<CircleButton onPress={settingsPressed}  icon="settings-outline" ringColor = '#888'/>)
            :
            (<View />)
          }
        </View>
      </View>
      <FeatureDetail feature={pickedFeature} isVisible={isDetailVisible} onClose={closeDetail} />
      <PreferenceView isVisible={isSettingsVisible} onClose = {closeSettings} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topLevelContainer: {
    flex: 1,
    backgroundColor: 'rgb(31, 31, 31)',
  },
  bottomBar: {
    height:64,
    backgroundColor:'rgb(51,51,51)',
    alignItems:'center',
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    borderRadius:16,
    marginLeft:4,
    marginRight:4,
  },
  primaryContainer: {
    flex:1,
  },
  title: {
    color:'#fff',
    fontSize:20,
  },
  subtitle: {
    color:'#aaa',
    fontSize:12,
    marginTop:4,
  },
});
