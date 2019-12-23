import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from 'native-base';
import { Card, ListItem } from 'react-native-elements';

import { APP_THEME } from '../utils/Type';
import { getReviseMenuDetail, getSelectedReviseLevelDetail } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ReviseScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Revise List',
            // tabBar: {
            //     icon: ({ tintColor }) => {
            //         return <Icon name="clipboard-list-check" type='font-awesome' size={30} color={tintColor} />;
            //     }
            // }
        };
    }

    state = { reviseMenuArray: [] };
    
    componentDidMount() {
        //this.props.getReviseMenuDetail();
        this.props.navigation.addListener(
            'didFocus',
            () => {
                this.props.getReviseMenuDetail();
            }
        );
    }

    componentWillReceiveProps(props) {
        const { reviseMenuArray } = props;
        if (reviseMenuArray && reviseMenuArray.length > 0) {
            this.setState({ reviseMenuArray });
        }
    }

    onMenuListPress = (listNo, level, noOfWords) => {
        if (noOfWords === undefined || noOfWords === 0) {
            return;
        }
        this.props.getSelectedReviseLevelDetail(listNo, level, 
                                                this.props.navigation, 'reviseSelected'
                                                );
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => {
        const { id, listNo, total } = item;
        const output = [];
        for (const [key, value] of Object.entries(item)) {
            if (key === 'easy' || key === 'medium' || key === 'hard' || key === 'notadded') {
                output.push(
                    <TouchableOpacity key={key} onPress={this.onMenuListPress.bind(this, listNo, `${key}`, value)}>
                        <ListItem
                            title={ key == 'notadded' ? 'Not Added': (`${key}`.charAt(0).toUpperCase() + `${key}`.slice(1))}
                            subtitle={`(${value} words)`}
                            leftIcon={{ name: 'flight-takeoff' }}
                        />
                    </TouchableOpacity>
                );
            }
        }

        return (
            <Card
                title={`Word List ${listNo} (${total} words)`}
                containerStyle={styles.cardStyle}
            >
                { output }
            </Card>
        );
    }

    render() {
        if (this.state.reviseMenuArray.length > 0) {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList 
                        keyExtractor={this.keyExtractor}
                        data={this.state.reviseMenuArray}
                        renderItem={this.renderItem}
                    />
                </View>
            );
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#ecf0f1' }}>
                <View style={styles.loadStyle}>
                    <Spinner color='green' />
                    <Text>Loading. Please wait!!!</Text>
                </View>
            </View>
        );
    }
}

const styles = {
    loadStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    cardStyle: {
        borderWidth: 2,
        borderRadius: 2,
        borderColor: APP_THEME,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3
    }
};

const mapStateToProps = ({ reviseMenu: { reviseMenuArray } }) => {
    return { reviseMenuArray };
};

export default connect(mapStateToProps, 
                        { getReviseMenuDetail, getSelectedReviseLevelDetail }
                       )(ReviseScreen);
