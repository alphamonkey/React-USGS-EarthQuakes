import {Text, View, StyleSheet} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {getDistance} from "geolib";
import {Intl} from 'react-native-intl';


export default function FeatureListItem({feature, currentLocation}) {

    const strippedPlace = feature.properties.place.split(' of ')[1];
    const relativeTime = (time) => {
        const rtf = new Intl.RelativeTimeFormat('en', {style:'short'});
        console.log(rtf.format)
    }
    const metersToMiles = (meters) => {
        const kilometers = meters / 1000;
        return kilometers * 0.621371;
    }

    const computeDistance = () => {
        return Math.trunc(metersToMiles(getDistance({latitude:feature.geometry.coordinates[1], longitude:feature.geometry.coordinates[0]},{latitude:currentLocation[0], longitude:currentLocation[1]}))); 
    }
    var magStyle = styles.magnitude;
    var magColor = 'rgb(211,211,102)';


    if (feature.properties.mag < 3.0) {
        magStyle = styles.lowMagnitude;
        magColor = 'rgb(102,211,211)';

    }
    if (feature.properties.mag > 6.0) {
        magStyle = styles.highMagnitude;
        magColor = 'rgb(211,112,102)';
    }
    return (
    <View style={styles.container}>
        <View> 
        <Text style={styles.title}>{strippedPlace ? strippedPlace : feature.properties.place}</Text>
        {feature && currentLocation ? (<View style={styles.subtitleView}><Text style={styles.subtitle}>{new Date(feature.properties.time).toLocaleTimeString().split(':')[0] + ':'  + new Date(feature.properties.time).toLocaleTimeString().split(':')[2]}     </Text><Text style={styles.subtitle}>{computeDistance()} mi</Text></View>):(<View />)}
        
        </View>
     
        
        {feature.properties.mag ? (
        <View style = {styles.magView}> 
             <Text style={magStyle}>{feature.properties.mag.toFixed(2)}</Text>
             <Ionicons name="pulse-outline" size={24} color={magColor} />
        </View>
       ):
        
        (<Text />)}

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
        fontWeight:'bold',
    },
    subtitleView: {
        marginTop:4,
        flexDirection : 'row',
        justifyContent:'space-between',
        alignItems:'stretch',
        
    },
    subtitle: {
        color:'#fff',
        marginLeft:4,
    },
    lowMagnitude: {
        color:'rgb(102,211,211)',
        marginRight:4,
        marginLeft:4,
    },
    magnitude: {
        color:'rgb(211,211,102)',
        marginRight:4,
        marginLeft:4,
    },
    highMagnitude: {
        color:'rgb(211,112,102)',
        marginRight:4,
        marginLeft:4,
    },
    magView: {
        alignItems:'center',
        flexDirection:'row-reverse',
    },

})