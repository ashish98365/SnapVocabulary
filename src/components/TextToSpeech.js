import React, { Component } from 'react';
import { View } from 'react-native';
import * as Speech from 'expo-speech';
import { Icon } from 'react-native-elements';

class TextToSpeech extends Component {

    onPress = () => {
        console.log(`text ${this.props.textToSpeak}`);
        Speech.speak(this.props.textToSpeak);
    };

    render() {
        const { IconContainerStyle, color } = this.props;
        return (
            <View style={IconContainerStyle}>
                <Icon 
                    raised
                    name='volume-up'
                    type='font-awesome'
                    color={color}
                    onPress={this.onPress}
                    // color='#f50'
                />
            </View>
        );
    }
}

export default TextToSpeech;
