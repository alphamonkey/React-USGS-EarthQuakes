import react from 'react';
import { Modal, View, Text, StyleSheet, SafeAreaView} from 'react-native';

import React from 'react';
export default function FeatureDetail ({isVisible, feature}) {
    return (
        
    <Modal animationType='slide' transparent={true} visible = {isVisible}>
    <SafeAreaView style = {styles.topLevelContainer}>
        <View style={styles.topBar}>
            <Text style={styles.title}>{feature ? (feature.properties.title):('No feature loaded')}</Text>
        </View>
      
       <View style = {styles.map}>

        </View>
       <View style = {styles.detail} />
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
    },
    map: {
        flex:18,
        backgroundColor:'rgb(51,51,51)',
      
        marginLeft:12,
        marginRight:12,
        marginBottom:12,
    },
    detail: {
        flex:4,
        backgroundColor:'rgb(51,51,51)',
        marginLeft:12,
        marginBottom:12,
        marginRight:12,
    },
    modalContent: {
        flex:1,
    
    },
    title: {
        color:'#fff',
        fontSize:16,
        fontWeight:'bold',

    }
});
