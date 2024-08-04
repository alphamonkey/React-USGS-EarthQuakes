import { StatusBar } from 'expo-status-bar';
import { registerCallableModule, StyleSheet, Text, View, Alert } from 'react-native';
import { useState } from 'react'
import  RefreshButton  from './components/RefreshButton';
import EventList from './components/EventList';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function App() {

  const [features, setFeatures] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState('Press to refresh');
  const refreshPressed = async () => {
    setIsLoading(true);
    let queryDate = new Date();
    queryDate.setDate(queryDate.getDate() - 1);
    console.log(queryDate.toISOString());
    try {
      const response = await fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventtype=earthquake&starttime=' + queryDate.toISOString(),);
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

    <View style={styles.container}>
      <EventList features={features} />
      {isLoading? (<Text style={styles.title}>Loading</Text>):(<RefreshButton onPress={refreshPressed} />
      
      )
      
      }
      
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'rgb(31, 31, 31)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:12,


  },
  title: {
    color:'#fff',
    padding:8,
  },
});
