import {Text, View, StyleSheet} from 'react-native';

export default function FeatureListItem({feature}) {
    const strippedPlace = feature.properties.place.split(' of ')[1];
    var magStyle = styles.magnitude;
    if (feature.properties.mag < 3.0) {
        magStyle = styles.lowMagnitude;
    }
    if (feature.properties.mag > 6.0) {
        magStyle = styles.highMagnitude
    }
    return (
    <View style={styles.container}>
        <Text style={styles.title}>{strippedPlace ? strippedPlace : feature.properties.place}</Text>
        {feature.properties.mag ? (<Text style={magStyle}>{feature.properties.mag.toFixed(2)}</Text>):(<Text />)}
               
    </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        height:44,
        borderWidth:1,
        borderColor: 'rgb(31,31,31)',
        marginBottom:1,
        padding:2,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',

    },    
    title: {
        color:'#fff',
        marginLeft:4,
    },
    lowMagnitude: {
        color:'rgb(102,211,211)',
        marginRight:4,
    },
    magnitude: {
        color:'rgb(211,211,102)',
        marginRight:4,
    },
    highMagnitude: {
        color:'rgb(211,112,102)',
        marginRight:4,
    },

})