import Slider from '@react-native-community/slider';
import {View, Text, StyleSheet} from 'react-native';
import {getAllKeys, getPreference, setPreference} from './Preferences';
import { useEffect, useState } from 'react'
import PropertyView from './PropertyView'


export default function PreferenceSlider({prefKey, label, minVal, maxVal, step}) {
    const [sliderValue, setSliderValue] =  useState(minVal);

    

    const updateSlider = async () => {
        const value = await getPreference(prefKey);
        setSliderValue(parseFloat(value));
    }
    const slideFinished = async (newValue) => {
        await setPreference(prefKey, newValue);
        setSliderValue(newValue);
    }
    
    const sliderChanged = (newValue) => {
        setSliderValue(newValue);
    }

    useEffect(() => {
        updateSlider();

    }, []);

    return (
        <View style={styles.preference}>
            <PropertyView propertyName = {label} propertyValue = {sliderValue} />
            <Slider
              value = {sliderValue}
              maximumValue={maxVal}
              minimumValue={minVal}
              step={step}
              minimumTrackTintColor='rgb(102,211,110)'
              maximumTrackTintColor='#aaa'
              thumbTintColor='rgb(102,211,110)'
              onSlidingComplete = {slideFinished}
              onValueChange = {sliderChanged}

             
            />
        </View>
    )
}

const styles = StyleSheet.create({
    preference: {
        padding:12,
    },
    slider: {
        width:200,
    },
    title: {
        fontWeight:'bold',
        fontColor:'#fff',
    },
})