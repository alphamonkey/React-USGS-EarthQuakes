import { StatusBar } from 'expo-status-bar';
import { registerCallableModule, StyleSheet, Text, View } from 'react-native';
import  RefreshButton  from './components/RefreshButton';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function App() {
  const refreshPressed = () => {
    alert('Foo');
  }
  return (
    <View style={styles.container}>
      <RefreshButton onPress={refreshPressed} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(31, 31, 31)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
