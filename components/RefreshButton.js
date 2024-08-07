import {View, Pressable, StyleSheet} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RefreshButton({onPress}) {
    return (

        <View style={styles.refreshButtonContainer}>
            <Pressable  onPress = {onPress} style={styles.refreshButton}>
                <Ionicons name="reload" size={26} color='rgb(31, 31, 31)' />
           </Pressable>
        </View>
    );
}

const styles= StyleSheet.create ({
    refreshButtonContainer: {
        width:44,
        height:44,

        marginRight:8,
        borderWidth:4,
        borderColor:'rgb(102,211,110)',
        borderRadius:42,
        padding:3,
    },
    refreshButton: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:42,
        backgroundColor:'#fff',
    },
})