import {View, Text, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

export default function PropertyView({propertyName, propertyValue, propertyStyle, propertyProgress}) {
    return (
        <View style = {{'flexDirection':'row','padding':2}}>
            <Text style={styles.title}>{propertyName}:</Text>
            {
                propertyProgress ? (<Progress.Bar progress={propertyValue} color = 'rgb(102,211,110)' borderColor = '#aaa' width = {200} height = {15}/>) :
                (propertyValue ? (<Text style = {propertyStyle ? propertyStyle : styles.value}>{propertyValue}</Text> ):(<Text style={styles.null}>null</Text>))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontWeight:'bold',
        marginRight:6,
        marginLeft:6,
    },
    value: {
        color: '#fff',


    },
    null: {
        color: '#888',
        fontStyle:'italic',
    }

});