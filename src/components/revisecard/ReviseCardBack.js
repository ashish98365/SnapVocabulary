import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, Icon } from 'react-native-elements';
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

import CardTop from './CardTop';
import Panel from './Panel';
import { APP_THEME } from '../../utils/Type';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ReviseCardBack extends Component {

    renderCardContents(wordDetail) {
        const { word, wordGroup, meaning, sentence } = wordDetail;
        const { wordPosition } = this.props;
        const { totalNoOfWords } = this.props;
        return (
            <View>
                <CardTop
                    userName={'Word Group'}
                    lightColor={'#27AFFF'}
                    darkColor={'#032269'}
                    badgeText={'UPDATE'}
                    data={wordGroup}
                />
                <View>
                    <Text style={styles.updateText}>
                        Meaning: { meaning }
                    </Text>
                    <Text style={styles.updateText}>
                        Sentence: { sentence }
                    </Text>
                </View>
                <View style={styles.reactionBox}>
                    <Text 
                        style={[styles.reactionCount, { color: '#032269' }]}
                    >
                        {wordPosition} / {totalNoOfWords}
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        const { word, wordGroup, meaning, sentence, level, wordNote } = this.props.data;
        const { wordPosition } = this.props;
        const { totalNoOfWords } = this.props;
        return (
                <View
                    style={styles.slideStyle}
                >
                    <Card
                        title={wordGroup.toUpperCase()}
                        titleStyle={{ fontSize: 18 }}
                        containerStyle={styles.cardStyle}
                    >
                        <Text style={{ marginBottom: 13, fontSize: 16 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Meaning: 
                            </Text> 
                            <Text> {meaning}</Text> 
                        </Text>
                        
                        <Text style={{ marginBottom: 13, fontSize: 16 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Sentence: 
                            </Text> 
                            <Text> {sentence}</Text> 
                        </Text>
                    </Card>

                    <View style={styles.counterStyle}>
                        <Text style={styles.counterTextStyle}>
                            {wordPosition} / {totalNoOfWords}
                        </Text>
                    </View>
                </View>
        );
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    cardStyle: {
        width: SCREEN_WIDTH - 40,
        marginLeft: 10,
        marginRight: 10,
        //borderColor: '#af1fc1',
        borderWidth: 3,
        borderColor: APP_THEME
    },
    counterStyle: {
        width: 66,
        height: 66,
        borderRadius: 66 / 2,
        borderColor: APP_THEME,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    counterTextStyle: {
        fontSize: responsiveFontSize(2)
    }
};

export default ReviseCardBack;
