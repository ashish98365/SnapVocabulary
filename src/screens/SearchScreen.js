import React, { Component } from 'react';
import { View, FlatList, TouchableWithoutFeedback, Text, Dimensions } from 'react-native';
import { SearchBar, Divider, Overlay, ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import HeaderExample from '../components/HeaderExample';
import { getMatchedWordForKeyword } from '../actions';
import WordDetailList from '../components/WordDetailList';
import WordDetail from '../components/WordDetail';
import GeneralList from '../components/GeneralList';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

class SearchScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Search',
            // tabBar: {
            //     icon: ({ tintColor }) => {
            //         return <Icon name="search" type='font-awesome' size={30} color={tintColor} />;
            //     }
            // }
        };
    }

    state = { searchArray: [], keyword: '', isVisible: false, wordDetail: {}, isLoading: false };

    componentWillReceiveProps(newProps) {
        this.setState({ searchArray: newProps.searchArray, isLoading: false });
    }

    onListPress = (wordDetail) => {
        this.setState({ isVisible: true, wordDetail });
    }

    updateSearch = keyword => {
        if (!keyword) {
            this.setState({ searchArray: [], keyword });
            return;
        }
        this.props.getMatchedWordForKeyword(keyword);
        this.setState({ keyword, isLoading: true });
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => {
        const { id, word, level, wordGroup, listNo, meaning, sentence } = item;
        return (
            <TouchableWithoutFeedback onPress={() => this.onListPress(item)}>
                <ListItem
                    style={{ borderBottomWidth: 1, borderColor: '#ddd' }}
                    title={<View style={{ alignItems: 'center', justifyContent: 'center' }}><Text>{word}</Text></View>}
                    subtitle={
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}><Text>{`Word Group: ${wordGroup}`}</Text><Text>{`Word List: ${listNo}`}</Text></View>
                    }
                />
            </TouchableWithoutFeedback>
        );
    }

    render() {
        const { searchArray, keyword } = this.state;
        let searchContent = (
            <View>
                <FlatList 
                    keyExtractor={this.keyExtractor}
                    data={searchArray}
                    renderItem={this.renderItem}
                />
                <Overlay 
                    isVisible={this.state.isVisible}
                    style={{ padding: 0 }}
                    width={WIDTH - 60}
                    onBackdropPress={() => this.setState({ isVisible: false, wordDetail: {} })}
                >
                    <WordDetail isFromSearchScreen wordDetail={this.state.wordDetail} />
                </Overlay>
            </View>
        );
        if (searchArray.length < 1) {
            searchContent = (
                <View style={styles.noResultTextContainer}>
                    <Text style={styles.noResultText}>No Result Found</Text>
                </View>
            );
        }
        return (
            <View style={{ flex: 1 }}>
                <SearchBar
                    placeholder="Search word or group"
                    onChangeText={this.updateSearch}
                    value={keyword}
                    showLoading={this.state.isLoading}
                />
                <Divider style={{ backgroundColor: 'blue', height: 1, marginTop: 4 }} />
                
                {searchContent}
            </View>
        );
    }
}

const mapStateToProps = ({ search: { searchArray } }) => {
    return { searchArray };
};

const styles = {
    noResultTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noResultText: {
        fontSize: 22,
        textAlign: 'center',
        marginTop: 20
    }
}

export default connect(mapStateToProps, { getMatchedWordForKeyword })(SearchScreen);
