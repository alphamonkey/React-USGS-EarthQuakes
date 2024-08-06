import {View, StyleSheet, FlatList, Text, Pressablew} from 'react-native';
import FeatureListItem from './FeatureListItem';
export default function EventList({features, onSelect, onCloseModal}) {
    return (
    <View style = {styles.container} >


    <FlatList
        vertical
        data = {features}
        contentContainerStyle = {styles.listContainer}
        renderItem = {( {item, index}) => (

            <Pressable onPress={() => {onSelect(item)}}>
                <FeatureListItem feature={item} />
            </Pressable>

        )}
        />

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
    },
    listContainer:  {
        padding:16,
        
    },
    title: {
        color:'#fff',
    },


}
);