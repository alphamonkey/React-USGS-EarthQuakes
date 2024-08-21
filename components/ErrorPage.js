import {View, StyleSheet, Text} from 'react-native'

export default function ErrorPage({errorTitle, errorMessage}) {
    return (
        <View style ={styles.container}>
        <Text style = {styles.errorTitle}>{errorTitle}</Text>
        <View style = {styles.errorBody}>
            <Text style = {styles.errorMessage}>{errorMessage}</Text>
        </View>
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
        alignItems:'center',
        justifyContent:'center',
    },
    errorBody: {
        borderColor: '#fff',
        borderWidth:2.0,
        padding:16,
        marginLeft:32,
        marginRight:32,
    },  
    errorMessage: {
        color:'#fff',
    },
    errorTitle: {
        color:'rgb(211,112,102)',
        fontSize:36,
        marginBottom:12,
    },
});