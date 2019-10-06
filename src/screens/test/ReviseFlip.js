import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text, Dimensions } from 'react-native';
import CardFlip from 'react-native-card-flip';

import FlipWordFront from './FlipWordFront';
import FlipWordBack from './FlipWordBack';

const height = Dimensions.get('window').height;

class FlipWord extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <CardFlip style={{ flex: 1, borderWidth: 5, borderColor: 'red' }} ref={(card) => { this.card = card; }}>
                    <TouchableWithoutFeedback onPress={() => this.card.flip()} >
                        <View style={{ marginTop: 100 }}>
                            <FlipWordFront />
                            <Text>{ this.props.list }</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.card.flip()} >
                    <View style={{ height: 300, marginTop: 100 }}>
                        <FlipWordBack />
                    </View>
                    </TouchableWithoutFeedback>
                </CardFlip>
            </View>
        );
    }
}

export default FlipWord;
