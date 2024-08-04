import {View, StyleSheet, FlatList, Text} from 'react-native';

export default function EventList({features}) {
    return (
    <View style = {styles.container} >
    <FlatList
        vertical
        data = {features}
        contentContainerStyle = {styles.listContainer}
        renderItem = {( {item, index}) => (
            <Text style = {styles.title}>{item.properties.place}</Text>
        )}
        />
    </View>
    )

}

const styles = StyleSheet.create ( {
    container: {

        marginLeft:18,
        marginRight:18,
        paddingBottom:18,
        paddingTop:50,

    },
    listContainer: {
        
    },
    title: {
        color:'#fff',
    },
}
);