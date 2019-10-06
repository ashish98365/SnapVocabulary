import React, { Component } from 'react';
import { View, Text, AsyncStorage, Dimensions, FlatList, NetInfo } from 'react-native';
import _ from 'lodash';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import { downloadWordsFromApi, navigateToWordGroup, getWordListDetail } from '../actions';
import { 
    NO_OF_WORD_LIST,
    DATADOWNLOADED
} from '../utils/Type';
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
import GeneralList from '../components/GeneralList';

const SCREEN_WIDTH = Dimensions.get('window').width;

class WordListScreen extends Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Word Lists',
            // tabBar: {
            //     icon: ({ tintColor }) => {
            //         return <Icon name="leanpub" type='font-awesome' size={30} color={tintColor} />;
            //     }
            // }
        };
    }

    state = { isDataDownloaded: null, dataItem: null };
    
    async componentDidMount() {
        const dataDownloaded = await AsyncStorage.getItem(DATADOWNLOADED);
        if (dataDownloaded === 'true') {
            this.props.getWordListDetail();
            this.props.navigation.addListener(
                'didFocus',
                () => {
                    this.props.getWordListDetail();
                }
            );
            this.setState({ isDataDownloaded: true });
        } else {
            this.setState({ isDataDownloaded: false });
        }
    }
    
    componentWillReceiveProps(newProps) {        
        if (!_.isNull(newProps.wordListDetails) && newProps.wordListDetails.length > 0) {
            this.setState({ dataItem: newProps.wordListDetails });
        }

        if (newProps.dataDownload.isDataDownloaded) {
            this.setState({ isDataDownloaded: true });
        }
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item, index }) => {
        return (
            <GeneralList 
                title={item[COLUMN_LIST_NO]}
                subtitle={item[COLUMN_GROUP]}
                percent={item[PERCENT_COMPLETED]}
                action={this.props.navigateToWordGroup}
                navigate={this.props.navigation.navigate}
                param={index + 1}
                navigationParam={'wordGroup'}
            />
        );
    }

    render() {
        if (!_.isNull(this.state.dataItem) && this.state.dataItem.length > 0) {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList 
                        keyExtractor={this.keyExtractor}
                        data={this.props.wordListDetails}
                        renderItem={this.renderItem}
                    />
                </View>
            );
        } else if (_.isNull(this.state.isDataDownloaded) || this.state.isDataDownloaded) {
            this.props.getWordListDetail();
            return (
                <View style={{ flex: 1, backgroundColor: '#ecf0f1' }}>
                    <View style={styles.downloadStyle}>
                        <Spinner color='green' />
                        <Text>Loading</Text>
                    </View>
                </View>
            ); 
        }
        this.props.downloadWordsFromApi();
                return (
                    <View style={{ flex: 1, backgroundColor: '#ecf0f1' }}>
                        <View style={styles.downloadStyle}>
                            <Spinner color='green' />
                            <Text>Downloading data for offline usage. Please wait!!!</Text>
                        </View>
                    </View>
                ); 

        // NetInfo.isConnected.fetch().then(isConnected => {
        //     if (isConnected) {
        //         this.props.downloadWordsFromApi();
        //         return (
        //             <View style={{ flex: 1, backgroundColor: '#ecf0f1' }}>
        //                 <View style={styles.downloadStyle}>
        //                     <Spinner color='green' />
        //                     <Text>Downloading data for offline usage. Please wait!!!</Text>
        //                 </View>
        //             </View>
        //         ); 
        //     }
        //     return (
        //         <View style={{ flex: 1, backgroundColor: '#ecf0f1' }}>
        //             <View style={styles.downloadStyle}>
        //                 <Spinner color='green' />
        //                 <Text>You are not connected to internet</Text>
        //             </View>
        //         </View>
        //     ); 
        // });
    }
}

const styles = {
    downloadStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    }
};

const mapStateToProps = ({ dataDownload, wordListDetail: { wordListDetails }, wordGroup: { wordGroupArray } }) => {
    return { dataDownload, wordListDetails, wordGroupArray };
};

export default connect(
                        mapStateToProps, 
                        { downloadWordsFromApi, navigateToWordGroup, getWordListDetail }
                    )(WordListScreen);
