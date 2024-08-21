import react, {useState} from 'react';
import { Modal, View, Text, StyleSheet, SafeAreaView, Pressable, Platform} from 'react-native';
import MapView,  {Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT} from 'react-native-maps';
import PropertyView from './PropertyView';
import TopBarView from './TopBarView'
export default function FeatureDetail ({isVisible, feature, onClose}) {
    const [mapRef, setMapRef] = useState(null);

    const featureTime = feature ? new Date(feature.properties.time) : new Date();
    const featureLatitude = feature ? feature.geometry.coordinates[1] : 0.0;
    const featureLongitude = feature ? feature.geometry.coordinates[0] : 0.0;

    const mapReady = () => {
        if(!feature) {
            return;
        }    
        const region = {
            latitude:featureLatitude,
            longitude:featureLongitude,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3,
        }

        mapRef.animateToRegion(region);
    }
    
    return (
        <Modal animationType='slide' transparent={true} visible = {isVisible}>
        <SafeAreaView style = {styles.topLevelContainer}>
            <TopBarView title = {feature ? feature.properties.title : 'No Features Loaded' } onClose = {onClose} />
            <View style = {styles.map}>
            <MapView    ref={(ref) => setMapRef(ref)}
                            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT} style={styles.mapView} 
                            onMapReady={mapReady}>
       
                            {feature ? 
                                <Marker coordinate={{latitude: featureLatitude, longitude:featureLongitude}} 
                                        title={feature.properties.place.toString()} 
                                        description={featureLatitude + ' ' + featureLongitude}/>
                                :
                                <View />
                            }
                </MapView>
            </View>

            {feature ? (
                <View style = {styles.detail}>
                    <PropertyView propertyName = 'Time' propertyValue = {featureTime.toLocaleDateString() + ' ' + featureTime.toLocaleTimeString()} />
                    <PropertyView propertyName = 'Magnitude' propertyValue = {feature.properties.mag} />
                    <PropertyView propertyName = 'Alert' propertyValue = {feature.properties.alert} />
                    <PropertyView propertyName = 'Intensity' propertyValue = {feature.properties.cdi} />
                    <PropertyView propertyName = 'Significance' propertyValue = {feature.properties.sig}/>
                </View>):
                (<View />) 
            }
            </SafeAreaView>   
        </Modal>
    )
}

const styles = StyleSheet.create ({
    topLevelContainer: {
        flex:1,
        backgroundColor:'rgb(31,31,31)',       
    },
    map: {
        flex:18,
        backgroundColor:'rgb(51,51,51)',
        marginTop:12,
        marginLeft:12,
        marginRight:12,
        marginBottom:12,
        borderRadius:16,
    },
    detail: {
        flex:4,
        backgroundColor:'rgb(51,51,51)',
        marginLeft:12,
        marginBottom:12,
        marginRight:12,
        borderRadius:16,
        justifyContent:'space-around',
    },
    mapView: {
        width:'100%',
        height:'100%',
        borderRadius:16,
    }
});
