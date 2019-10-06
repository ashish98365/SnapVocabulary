import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import { Divider, Button, Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

import TextToSpeech from '../components/TextToSpeech';
import DifficultLevel from '../components/DifficultLevel';
import { changeNoteText, updateNote } from '../actions';
import { APP_THEME } from '../utils/Type';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

class WordDetail extends Component {

    componentDidMount() {
        if (this.props.wordDetail.wordNote) {
            this.props.changeNoteText(this.props.wordDetail.wordNote);
        } else {
            this.props.changeNoteText('');
        }
    }

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
            wordDetailContainer, wordDetailCommon, wordDetailCommonText, textAreaStyle 
        } = styles;

        return (
            <Card 
                containerStyle={{ margin: 0, padding: 0, height: HEIGHT - 110, width: WIDTH - 60, justifyContent: 'space-around', borderWidth: 5, borderColor: 'green' }}
                title={`Group: ${wordGroup}`}
            >
                <ListItem                    
                    title={word}
                />
                <ListItem
                    title={`Meaning: ${meaning}`}
                />
                <ListItem
                    title={`Sentence: ${sentence}`}
                />
                <ListItem
                    title={<TextToSpeech 
                        IconContainerStyle={{ alignSelf: 'center' }}
                        color='#000'
                        textToSpeak={word}
                    />}
                />
                <ListItem
                    title={<TextInput
                        style={textAreaStyle}
                        placeholder={'Notes'}
                        placeholderTextColor={'#9E9E9E'}
                        multiline
                        numberOfLines={3}
                        onChangeText={this.onChangeText}
                        value={this.props.noteText}
                        underlineColorAndroid="transparent"
                        editable={!this.props.isFromSearchScreen}
                    />}
                />
                <ListItem
                    title={<Button 
                        title='Update Note'
                        raised
                        buttonStyle={{ backgroundColor: APP_THEME }}
                        containerStyle={{ marginRight: 15, marginLeft: 15 }}
                        onPress={this.onButtonPress}
                    />}
                />
                    {/* <View style={wordDetailContainer}>
                        <View style={[wordDetailCommon, { alignSelf: 'center' }]}>
                            <Text style={[bold, { fontSize: 24 }]}>
                                { word }
                            </Text>
                        </View>
                        <View style={wordDetailCommon}>
                            <Text style={wordDetailCommonText}>
                                <Text style={bold}>Meaning: </Text>
                                <Text>{ meaning }</Text>
                            </Text>
                        </View>
                        <View style={wordDetailCommon}>
                            <Text style={wordDetailCommonText}>
                                <Text style={bold}>Sentence: </Text>
                                <Text>{ sentence }</Text>
                            </Text>
                        </View>
                        <View style={wordDetailCommon}>
                            <TextToSpeech 
                                IconContainerStyle={{ alignSelf: 'center' }}
                                color='#000'
                                textToSpeak={word}
                            />
                        </View>
                        <View style={wordDetailCommon}>
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
                        </View>
                        <View 
                            style={[wordDetailCommon, { display: this.props.isFromSearchScreen ? 'none' : 'flex' }]}
                        >
                            <Button 
                                title='Update Note'
                                raised
                                buttonStyle={{ backgroundColor: APP_THEME }}
                                containerStyle={{ marginRight: 15, marginLeft: 15 }}
                                onPress={this.onButtonPress}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Divider style={{ backgroundColor: '#000000', height: 1 }} />
                        <View style={[headerContainer, { paddingTop: 3 }]}>
                            <DifficultLevel
                                isFromSearchScreen={this.props.isFromSearchScreen}
                                wordDetail={this.props.wordDetail}
                            />
                        </View>
                    </View> */}
            </Card>
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
    }
};

const mapStateToProps = ({ words: { noteText } }) => {
    return { noteText };
};

export default connect(mapStateToProps, { changeNoteText, updateNote })(WordDetail);
