import {View, Pressable, StyleSheet} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CircleButton({onPress, icon, ringColor}) {
   return (
        <View style={[styles.circleButtonContainer, {borderColor:ringColor}]}>
            <Pressable  onPress = {onPress} style={styles.circleButton}>
                <Ionicons name={icon} size={26} color='rgb(31, 31, 31)' />
           </Pressable>
        </View>
    );
}

const styles= StyleSheet.create ({
    circleButtonContainer: {
        width:44,
        height:44,
        marginLeft:8,
        marginRight:8,
        borderWidth:4,
        borderRadius:42,
        padding:3,
    },
    circleButton: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:42,
        backgroundColor:'#fff',
    },
})