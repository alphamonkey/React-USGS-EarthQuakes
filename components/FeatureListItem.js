import {Text, View, StyleSheet} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {getDistance} from "geolib";

export default function FeatureListItem({feature, currentLocation}) {
    const strippedPlace = feature.properties.place.split(' of ')[1];
    const featureLatitude = feature.geometry.coordinates[1];
    const featureLongitude = feature.geometry.coordinates[0];
    const currentLatitude = currentLocation[0];
    const currentLongitude = currentLocation[1];

    const getMagStyle= () => {
        let magStyle = styles.magnitude;
        
        if (feature.properties.mag < 3.0) {
            magStyle = styles.lowMagnitude;
        }
      
        if (feature.properties.mag > 6.0) {
            magStyle = styles.highMagnitude;
        }

        return magStyle;
    }

    const metersToMiles = (meters) => {
        const kilometers = meters / 1000;
        return kilometers * 0.621371;
    }

    const computeDistance = () => {
        return Math.trunc(metersToMiles(getDistance({latitude:featureLatitude, longitude:featureLongitude},{latitude:currentLatitude, longitude:currentLongitude}))); 
    }

    const getDateTimeString = () => {
        const featureTime = new Date(feature.properties.time);
        const localeTime = featureTime.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        const localeDate = featureTime.toLocaleDateString();
        return localeDate + ' ' + localeTime;
    }

    return (
        <View style={styles.container}>
            <View style={{flex:1.25}}> 
                <Text style={styles.title}>{strippedPlace ? strippedPlace : feature.properties.place}</Text>
                {feature && currentLocation ? (
                    <View style={styles.subtitleView}>
                        <Text style={styles.subtitle}>{getDateTimeString()}</Text>
                        <Text style={styles.subtitle}>{computeDistance()} mi</Text>
                    </View>)
                    :
                    (<View />)
                }
            </View>
     
            {feature.properties.mag ? (
                <View style = {styles.magView}> 
                    <Text style={getMagStyle()}>{feature.properties.mag.toFixed(2)}</Text>
                    <Ionicons name="pulse-outline" size={24} color={getMagStyle().color} />
                </View>
            ):   
            (<Text />)}
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        height:48,
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
    },
    subtitle: {
        color:'#aaa',
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
        flex:1,
    },

})