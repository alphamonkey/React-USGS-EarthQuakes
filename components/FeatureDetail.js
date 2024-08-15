import react, { useEffect } from 'react';
import { Modal, View, Text, StyleSheet, SafeAreaView, Pressable, Platform} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import MapView,  {PROVIDER_GOOGLE, PROVIDER_DEFAULT} from 'react-native-maps';
import {Marker}from 'react-native-maps';
import {useState, useRef} from 'react';
import PropertyView from './PropertyView';

export default function FeatureDetail ({isVisible, feature, onClose}) {


    const [mapRef, setMapRef] = useState(null);

    const mapReady = () => {
        if(!feature) {
            return;
        }
        console.log(feature.geometry.coordinates[0]);
        console.log(feature.geometry.coordinates[1]);
        const region = {
            latitude:feature.geometry.coordinates[1],
            longitude:feature.geometry.coordinates[0],
            latitudeDelta: 0.3,
            longitudeDelta: 0.3,
        }
        mapRef.animateToRegion(region);
    }
    const featureTime = feature ? new Date(feature.properties.time) : new Date();

    return (

    <Modal animationType='slide' transparent={true} visible = {isVisible}>
    <SafeAreaView style = {styles.topLevelContainer}>
        <View style={styles.topBar}>
        <Pressable  onPress = {onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color='#fff' />
           </Pressable>
            <Text style={styles.title}>{feature ? (feature.properties.title):('No feature loaded')}</Text>
        <View style = {styles.blank}/>
        </View>
        
       <View style = {styles.map}>
       <MapView 
        ref={(ref) => setMapRef(ref)}
       provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT} style={styles.mapView} 
       onMapReady={mapReady}  
     >
       
        {feature ? (
 <Marker coordinate={{latitude: feature.geometry.coordinates[1], longitude:feature.geometry.coordinates[0]}} title={feature.properties.place.toString()} description={feature.geometry.coordinates[1] + ' ' + feature.geometry.coordinates[0]}/>
        ):(
            <View />
        )}
       
       
        

        </MapView>
        </View>
        {feature ? (
       <View style = {styles.detail}>
            <PropertyView propertyName = 'Time' propertyValue = {featureTime.toLocaleDateString() + ' ' + featureTime.toLocaleTimeString()} />
            <PropertyView propertyName = 'Magnitude' propertyValue = {feature.properties.mag} />
            <PropertyView propertyName = 'Alert' propertyValue = {feature.properties.alert} />
            <PropertyView propertyName = 'Intensity' propertyValue = {feature.properties.cdi} />
            <PropertyView propertyName = 'Significance' propertyValue = {feature.properties.sig / 1000} propertyProgress = {true}/>
       </View>):(<View />) }
    </SafeAreaView>   
    </Modal>
 
    )
}

const styles = StyleSheet.create ({
    topLevelContainer: {
        flex:1,
        backgroundColor:'rgb(31,31,31)',
        
    },
    topBar: {
        flex:1,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:12,
        marginRight:12,
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
    blank: {
        height:24,
        width:24,
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
    modalContent: {
        flex:1,
    
    },
    title: {
        color:'#fff',
        fontSize:16,
        fontWeight:'bold',
        paddingLeft:12,
        paddingRight:12,
   

    },
    closeButton: {
        backgroundColor:'rgb(211,112,102)',
        borderRadius:6,
    },
    mapView: {
        width:'100%',
        height:'100%',
        borderRadius:16,
    }
});
