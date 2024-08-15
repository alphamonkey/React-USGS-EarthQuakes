import { Modal, View, Text, StyleSheet, SafeAreaView, Pressable, Platform} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function PreferenceView ({isVisible, onClose}) {
    return (
<Modal animationType='slide' transparent={true} visible = {isVisible}>
    <SafeAreaView style = {styles.topLevelContainer}>
        <View style={styles.topBar}>
        <Pressable  onPress = {onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color='#fff' />
           </Pressable>
            <Text style={styles.title}>Settings</Text>
        <View style = {styles.blank}/>
        </View>
        <View style = {styles.body} />
    
    </SafeAreaView>
</Modal>
    );
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
    body: {
        flex:18,
        backgroundColor:'rgb(51,51,51)',
        marginTop:12,
        marginLeft:12,
        marginRight:12,
        marginBottom:12,
        borderRadius:16,
    },

});