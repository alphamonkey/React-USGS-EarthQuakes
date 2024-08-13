import {View, StyleSheet, FlatList, Text, Pressable} from 'react-native';
import FeatureListItem from './FeatureListItem';
export default function EventList({features, onSelect, onCloseModal, currentLocation}) {
    return (
    <View style = {styles.container} >
    
    {features && features.length === 0 ? (<Text style={styles.error}>No results to display.</Text>) :
        <FlatList
        vertical
        data = {features}
        contentContainerStyle = {styles.listContainer}
        renderItem = {( {item, index}) => (

            <Pressable onPress={() => {onSelect(item)}}>
                <FeatureListItem feature={item} currentLocation={currentLocation} />
            </Pressable>

        )}
        />
    }


    </View>
    )

}

const styles = StyleSheet.create ( {
    container: {
        flex:1,
        marginLeft:8,
        marginRight:8,
        marginTop:8,
        marginBottom:8,
        backgroundColor:'rgb(51,51,51)',
        borderRadius:16,
        alignItems:'stretch',
        justifyContent:'center',


    },
    listContainer:  {
        padding:16,
        
    },
    title: {
        color:'#fff',
    },
    error: {
        color:'#fff',
        textAlign:'center',
    }


}
);