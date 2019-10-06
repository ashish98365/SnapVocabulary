import React, { Component } from 'react';
import {
  Animated,
  PanResponder,
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  LayoutAnimation
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, Icon } from 'react-native-elements';
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

import CardTop from './CardTop';
import Panel from './Panel';
import { APP_THEME } from '../../utils/Type';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ReviseCardFront extends Component {

    onButtonPress = () => {
        this.props.flipProp.card.flip();
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
                        title={level === 'notadded' ? 'Not Added' : level.charAt(0).toUpperCase() + level.slice(1)}
                        containerStyle={styles.cardStyle}
                    >
                        <Text style={{ marginBottom: 10, textAlign: 'center', fontSize: 22 }}>
                            {word}
                        </Text>
                        
                        <Panel title="Show Note" note={wordNote} />

                        <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='VIEW ANSWER'
                            onPress={this.onButtonPress}
                        />
                    </Card>

                    <View style={styles.counterStyle}>
                        <Text style={styles.counterTextStyle}>
                            {wordPosition}/{totalNoOfWords}
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

export default ReviseCardFront;
