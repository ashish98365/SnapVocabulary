import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Left, Right, Icon } from 'native-base';

import { navigateToWord } from '../actions';
import GeneralList from '../components/GeneralList';
import { 
    DATABASE_NAME,
    TABLE_NAME,
    COLUMN_WORD,
    COLUMN_LEVEL,
    COLUMN_GROUP,
    COLUMN_LIST_NO,
    COLUMN_MEANING,
    COLUMN_SENTENCE,
    PERCENT_COMPLETED
  } from '../utils/DatabaseType';

class WordGroupScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Word Group',
            headerRight: (
                <Text style={styles.headerRightStyle}>
                    {`List ${navigation.getParam('listNo')}`}
                </Text>
            )
        };
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => {
        return (
            <GeneralList 
                title={item[COLUMN_GROUP]}
                subtitle={item[COLUMN_WORD]}
                percent={item[PERCENT_COMPLETED]}
                action={this.props.navigateToWord}
                navigate={this.props.navigation.navigate}
                param={item[COLUMN_GROUP]}
                navigationParam={'word'}
            />
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <FlatList 
                    keyExtractor={this.keyExtractor}
                    data={this.props.wordGroupArray}
                    renderItem={this.renderItem}
                />
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
    }
};

const mapStateToProps = ({ wordGroup: { wordGroupArray }, words: { wordArray } }) => {
    return { wordGroupArray, wordArray };
};

export default connect(mapStateToProps, { navigateToWord })(WordGroupScreen);
