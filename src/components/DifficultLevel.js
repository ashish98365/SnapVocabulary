import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';

import { updateWordDifficultLevel } from '../actions';
import { 
    LEVEL_EASY,
    LEVEL_MEDIUM,
    LEVEL_HARD,
    APP_THEME
 } from '../utils/Type';

class DifficultLevel extends Component {

    onPress = (wordDetail, difficultLevel) => {
        if (this.props.isFromSearchScreen) {
            return;
        }
        this.props.updateWordDifficultLevel(wordDetail, difficultLevel);
    };

    render() {
        const { difficultLevelSelect } = styles;
        const { level } = this.props.wordDetail;
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                <View style={{ flexDirection: 'column' }}>
                    <Avatar 
                        rounded 
                        size="small"
                        onPress={() => this.onPress(this.props.wordDetail, LEVEL_EASY)}
                        activeOpacity={0.7}
                        overlayContainerStyle={level === LEVEL_EASY ? difficultLevelSelect : {}}
                    />
                    <Text>Easy</Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Avatar 
                        rounded 
                        size="small"
                        onPress={() => this.onPress(this.props.wordDetail, LEVEL_MEDIUM)}
                        activeOpacity={0.7}
                        overlayContainerStyle={level === LEVEL_MEDIUM ? difficultLevelSelect : {}}
                    />
                    <Text>Medium</Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Avatar 
                        rounded 
                        size="small"
                        onPress={() => this.onPress(this.props.wordDetail, LEVEL_HARD)}
                        activeOpacity={0.7}
                        overlayContainerStyle={level === LEVEL_HARD ? difficultLevelSelect : {}}
                    />
                    <Text>Hard</Text>
                </View>
            </View>
        );
    }
}

const styles = {
    difficultLevelSelect: {
        backgroundColor: APP_THEME
    }
};

export default connect(null, { updateWordDifficultLevel })(DifficultLevel);
