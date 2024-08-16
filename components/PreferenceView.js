import { Modal, View, Text, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import PreferenceSlider from './PreferenceSlider';
import TopBarView from './TopBarView';

export default function PreferenceView ({isVisible, onClose}) {
    return (
        <Modal animationType='slide' transparent={true} visible = {isVisible}>
            <SafeAreaView style = {styles.topLevelContainer}>
            <TopBarView title='Settings' onClose = {onClose} />
                <View style = {styles.body}>
                    <PreferenceSlider prefKey = "radius" label = "Max radius (miles)" maxVal={500} minVal={5} step = {5}  />
                    <PreferenceSlider prefKey = "minmag" label = "Minimum Magnitude" maxVal={9} minVal={0} step = {0.5}  />
                    <PreferenceSlider prefKey = "daysago" label = "Start Date (days ago)" maxVal={365} minVal={1} step = {1}  />
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create ({
    topLevelContainer: {
        flex:1,
        backgroundColor:'rgb(31,31,31)',        
    },

    body: {
        flex:18,
        backgroundColor:'rgb(51,51,51)',
        marginTop:12,
        marginLeft:12,
        marginRight:12,
        marginBottom:12,
        borderRadius:16,
    },
});