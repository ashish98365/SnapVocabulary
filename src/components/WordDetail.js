import React, { Component } from 'react';
import { Dimensions, TextInput, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { Container, Content, Card, CardItem, Text, Button, Left, Body } from 'native-base';
import { connect } from 'react-redux';
import { Font } from 'expo'; //import is require else font error is given

import TextToSpeech from '../components/TextToSpeech';
import DifficultLevel from '../components/DifficultLevel';
import { changeNoteText, updateNote } from '../actions';
import { APP_THEME } from '../utils/Type';
import ProgressCircle from './PercentCircle';
import { COLUMN_LEVEL_NOT_DEFINE } from '../utils/DatabaseType';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

class WordDetail extends Component {

    state={ loading: true }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("../../node_modules/native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("../../node_modules/native-base/Fonts/Roboto_medium.ttf"),
            //Ionicons: require("../../node_modules/@expo/vector-icons/fonts/Ionicons.ttf"),
          });
          this.setState({ loading: false });
          if (this.props.wordDetail.wordNote) {
            this.props.changeNoteText(this.props.wordDetail.wordNote);
        } else {
            this.props.changeNoteText('');
        }
    }

    // componentDidMount() {
    //     if (this.props.wordDetail.wordNote) {
    //         this.props.changeNoteText(this.props.wordDetail.wordNote);
    //     } else {
    //         this.props.changeNoteText('');
    //     }
    // }

    onChangeText = (text) => {
        this.props.changeNoteText(text);
    }

    onButtonPress = () => {
        this.props.updateNote(this.props.wordDetail, this.props.noteText);
    }

    render() {
        const { id, word, level, wordGroup, 
            listNo, meaning, sentence, wordNote 
        } = this.props.wordDetail;

        const { bold, headerContainer, headerText, 
            wordDetailContainer, wordDetailCommon, wordDetailCommonText, textAreaStyle,buttonStyle 
        } = styles;

        if (this.state.loading) {
            return <ActivityIndicator />;
        }

        return (
            <Container>
            <Content>
              <Card style={{ flex: 1 }}>
                <CardItem bordered>
                  <Left>
                    { level !== COLUMN_LEVEL_NOT_DEFINE ? <Icon name='check-circle' type='font-awesome' color='#4dad4a' size={50} /> : <Icon name='times-circle' type='font-awesome' color='red' size={50} /> }
                    <Body>
                    <Text>{ `Group:- ${wordGroup}` }</Text>
                      <Text note>{ `Word:- ${word}` }</Text>
                      <Text note>{ `List No:- ${listNo}` }</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text>
                      <Text style={bold}>Meaning: </Text>
                      <Text>{meaning}</Text>
                    </Text>
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text>
                      <Text style={bold}>Sentence: </Text>
                      <Text>{sentence}</Text>
                    </Text>
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <TextToSpeech 
                        IconContainerStyle={{ alignSelf: 'center' }}
                        color='#000'
                        textToSpeak={word}
                    />
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <TextInput
                        style={textAreaStyle}
                        placeholder={'Notes'}
                        placeholderTextColor={'#9E9E9E'}
                        multiline
                        numberOfLines={3}
                        onChangeText={this.onChangeText}
                        value={this.props.noteText}
                        underlineColorAndroid="transparent"
                        editable={!this.props.isFromSearchScreen}
                    />

                    <Button 
                        rounded 
                        success 
                        disabled={this.props.isFromSearchScreen} 
                        onPress={this.onButtonPress} 
                        style={buttonStyle}
                    >
                        <Text> Update </Text>
                    </Button>
                  </Body>
                </CardItem>
                <CardItem bordered footer>
                    <Body>
                        { this.props.isFromSearchScreen ? <Text>{`Level: ${level.charAt(0).toUpperCase()}${level.slice(1)}`}</Text> : <DifficultLevel wordDetail={this.props.wordDetail} /> }
                    </Body>
                </CardItem>
              </Card>
            </Content>
          </Container>
        );
    }
}

const styles = {
    bold: {
        fontWeight: 'bold'
    },
    headerContainer: {
        padding: 10
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18
    },
    wordDetailContainer: {
        flex: 6.5,
        justifyContent: 'center',
        marginBottom: 10
    },
    wordDetailCommon: {
        marginTop: 10,
    },
    textAreaStyle: {
        flex: 1,
        width: '100%',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#9E9E9E',
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        height: 100,
        padding: 2
    },
    wordDetailCommonText: {
        fontSize: 16
    },
    buttonStyle: {
        alignSelf: 'center',
        marginTop: 10
    }
};

const mapStateToProps = ({ words: { noteText } }) => {
    return { noteText };
};

export default connect(mapStateToProps, { changeNoteText, updateNote })(WordDetail);
