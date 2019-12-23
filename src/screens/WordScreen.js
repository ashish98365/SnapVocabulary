import React, { Component } from 'react';
import { View, FlatList, Text, TouchableWithoutFeedback, 
    LayoutAnimation, Dimensions, Alert 
} from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Overlay } from 'react-native-elements';
import _ from 'lodash';
import Modal from 'react-native-modalbox';

import WordDetail from '../components/WordDetail';

const WIDTH = Dimensions.get('window').width;

class WordScreen extends Component {
    
    static navigationOptions = ({ navigation }) => {
        let wordGroup = navigation.getParam('wordGroup');
        if (wordGroup.length > 6) {
            const tempWord = WordScreen.getCapitalWord(wordGroup.toLowerCase().slice(0, 6));
            wordGroup = `${tempWord}...`;
        }
        return {
            title: 'Words',
            headerRight: (
                <Text style={styles.headerRightStyle}>
                    {`${wordGroup}`}
                </Text>
            )
        };
    }

    static getCapitalWord = (word) => word.charAt(0).toUpperCase() + word.slice(1);

    state = { isVisible: false, wordDetail: {} };

    componentWillReceiveProps(newProps) {
        if (newProps.currentWordLevel && newProps.currentWordLevel.difficultyLevelChanged && !newProps.wordNoteUpdated) {
            this.setState({ isVisible: true, wordDetail: newProps.currentWordLevel });
            const { id, level } = newProps.currentWordLevel;
            this.props.wordArray.find(wordDetail => wordDetail.id === id).level = level;
        } else if (newProps.wordNoteUpdated) {
            this.setState({ isVisible: true, wordDetail: newProps.currentWordLevel });
            const { id, wordNote } = newProps.currentWordLevel;
            this.props.wordArray.find(wordDetail => wordDetail.id === id).wordNote = wordNote;
            Alert.alert('Note Updated Successfully');
        }
    }

    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    onPress(wordDetail) {
        this.setState({ isVisible: true, wordDetail });
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => {
        const { id, word, level, wordGroup, listNo, meaning, sentence } = item;
        return (
            <TouchableWithoutFeedback onPress={this.onPress.bind(this, item)}>
                <ListItem
                    style={{ borderBottomWidth: 1, borderColor: '#ddd' }}
                    title={word}
                    chevronColor="#000000"
                    chevron
                />
            </TouchableWithoutFeedback>
        );
    };

    render() {
        return (
            <View style={{ flex: 1 }} >
                <FlatList 
                    keyExtractor={this.keyExtractor}
                    data={this.props.wordArray}
                    renderItem={this.renderItem}
                />
                <Overlay 
                    isVisible={this.state.isVisible}
                    style={{ padding: 0, borderWidth: 5, borderColor: 'green' }}
                    width={WIDTH - 60}
                    onBackdropPress={() => this.setState({ isVisible: false, wordDetail: {} })}
                >
                    <WordDetail 
                        wordDetail={this.state.wordDetail}
                    />  
                </Overlay>
            </View>
        );
    }
}

const styles = {
    headerRightStyle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
};

const mapStateToProps = ({ words: { wordArray, currentWordLevel, wordNoteUpdated } }) => {
    return { wordArray, currentWordLevel, wordNoteUpdated };
};

export default connect(mapStateToProps, null)(WordScreen);
