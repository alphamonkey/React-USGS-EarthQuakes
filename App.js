import { StatusBar } from 'expo-status-bar';
import { registerCallableModule, StyleSheet, Text, View, Alert, SafeAreaView } from 'react-native';
import { useState } from 'react'
import  RefreshButton  from './components/RefreshButton';
import EventList from './components/EventList';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import FeatureDetail from './components/FeatureDetail';
import * as Location from 'expo-location';

export default function App() {

  const [features, setFeatures] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('Press to refresh');
  const [pickedFeature, setPickedFeature] = useState(null);

  const featurePicked = (feature) => {
    setPickedFeature(feature);
    setIsModalVisible(true);
  }
  const closeModal = () => {
    setIsModalVisible(false);
  }
  const refreshPressed = async () => {
    setIsLoading(true);
    
    var locationPermissionStatus = await Location.getForegroundPermissionsAsync();
    if (locationPermissionStatus.granted !== true) {
       locationPermissionStatus = await Location.requestForegroundPermissionsAsync();
    }
    if (locationPermissionStatus.granted !== true) {
      alert('No location permissions');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    let radius = 50 * 1.6;
    console.log(radius);
    
    
    let queryDate = new Date();
    queryDate.setDate(queryDate.getDate() - 1);
    console.log(queryDate.toISOString());
    try {
      const response = await fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventtype=earthquake&starttime=' + queryDate.toISOString() + '&latitude=' + currentLocation.coords.latitude + '&longitude=' + currentLocation.coords.longitude + '&maxradiuskm=' + radius,);
      if (response.status === 200) {
        const json = await response.json();
        setTitle(json.metadata.title);

        setFeatures(json.features);

      } else {
        let body = await response.text();
        Alert.alert('HTTP Error ' + response.status, body);
      }
    } catch (error) {
      Alert.alert('Fetch Error', error);
    } 
    setIsLoading(false);
  }
  return (
    <SafeAreaView style={styles.topLevelContainer}>
      

      <View style={styles.primaryContainer}>
      
        <EventList features={features} onSelect={featurePicked} />
        <View style={styles.bottomBar}>
          <RefreshButton onPress={refreshPressed} />
          {isLoading? (<Text style={styles.title}>Loading...</Text>):(<Text style={styles.title}>Press Refresh to Go</Text>)
          }
          
        </View>
      </View>
      <FeatureDetail feature={pickedFeature} isVisible={isModalVisible} onClose={closeModal} />
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
    borderRadius:16,
    marginLeft:4,
    marginRight:4,
  },
  primaryContainer: {
    flex:1,

  },
  title: {
    color:'#fff',
    padding:12,
    fontSize:20,
    

  
  },
});
