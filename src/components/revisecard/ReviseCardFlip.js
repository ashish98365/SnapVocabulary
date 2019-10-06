import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Dimensions } from 'react-native';
import CardFlip from 'react-native-card-flip';

import ReviseCardFront from './ReviseCardFront';
import ReviseCardBack from './ReviseCardBack';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ReviseCard extends Component {

    state = { selfObj: this };

    render() {
        const { data, wordPosition, totalNoOfWords } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <CardFlip style={styles.loadStyle} ref={(card) => { this.card = card; }}>
                    <View style={{ flex: 1 }}>
                        <ReviseCardFront 
                            data={data}
                            wordPosition={wordPosition}
                            totalNoOfWords={totalNoOfWords}
                            flipProp={this.state.selfObj}
                        />
                    </View>                
                    <TouchableWithoutFeedback onPress={() => this.card.flip()} >
                        <View style={{ flex: 1 }}>
                            <ReviseCardBack
                                data={data}
                                wordPosition={wordPosition}
                                totalNoOfWords={totalNoOfWords}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </CardFlip>
            </View>
        );
    }
}

const styles = {
    loadStyle: {
        flex: 1,
        width: SCREEN_WIDTH
    }
};

export default ReviseCard;
