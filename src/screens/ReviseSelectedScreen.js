import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from 'native-base';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

import ReviseCardFlip from '../components/revisecard/ReviseCardFlip';

const SCREEN_WIDTH = Dimensions.get('window').width;
const { width: screenWidth } = Dimensions.get('window');

class ReviseSelectedScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const list = navigation.getParam('list');
        let level = navigation.getParam('level');
        if (!level) {
            level = '';
        } else {
            level = level && level === 'notadded' ? 'Not Added' : (`${level}`.charAt(0).toUpperCase() + `${level}`.slice(1));
        }

        return {
            title: `${list ? `Word List ${list}` : ''} ${level ? `(${level})` : level}`
        };
    }

    renderItem = ({ item, index }) => {
        return (
            <ReviseCardFlip
                data={item}
                wordPosition={index + 1}
                totalNoOfWords={this.props.reviseSelectedArray.length}
            />
        );
    }

    render() {
        const { reviseSelectedArray } = this.props;
        if (reviseSelectedArray && reviseSelectedArray.length > 0) {
            return (
                <FlatList
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    legacyImplementation={false}
                    data={reviseSelectedArray}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id.toString()}
                    style={{ flex: 1 }}
                />
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
    }
};

const mapStateToProps = ({ reviseSelected: { reviseSelectedArray } }) => {
    return { reviseSelectedArray };
};

export default connect(mapStateToProps, null)(ReviseSelectedScreen);
