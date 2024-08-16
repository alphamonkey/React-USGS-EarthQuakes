import {View, Text, Pressable, StyleSheet} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TopBarView({title, onClose}) {
    return (
        <View style={styles.topBar}>
            <Pressable  onPress = {onClose} style={styles.closeButton}>
                <Ionicons name='close' size={24} color='#fff' />
            </Pressable>
            <Text style={styles.title}>{title}</Text>
            <View style = {styles.blank}/>
        </View>      
    )
}

const styles = StyleSheet.create({
    topBar: {
        flex:1,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:12,
        marginRight:12,
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
    blank: {
        height:24,
        width:24,
    }
});