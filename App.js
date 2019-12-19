import React, { Component } from 'react';
import { Text } from 'react-native';
import {
          createAppContainer, 
          createBottomTabNavigator, 
          createStackNavigator,
          NavigationActions
        } from 'react-navigation';
import { Provider } from 'react-redux';
import { SQLite } from 'expo-sqlite';
import { Icon } from 'react-native-elements';

import store from './src/store';
import WordListScreen from './src/screens/WordListScreen';
import SearchScreen from './src/screens/SearchScreen';
import ReviseMenuScreen from './src/screens/ReviseMenuScreen';
import ReviseSelectedScreen from './src/screens/ReviseSelectedScreen';
import WordGroupScreen from './src/screens/WordGroupScreen';
import WordScreen from './src/screens/WordScreen';
import { APP_THEME } from './src/utils/Type';
import { 
          DATABASE_NAME,
          TABLE_NAME,
          COLUMN_ID,
          COLUMN_WORD,
          COLUMN_LEVEL,
          COLUMN_GROUP,
          COLUMN_LIST_NO,
          COLUMN_MEANING,
          COLUMN_SENTENCE,
          COLUMN_NOTE
        } from './src/utils/DatabaseType';

const databaseConn = SQLite.openDatabase(DATABASE_NAME);

const mainNavigator = createBottomTabNavigator({
  learn: { screen: createStackNavigator({
    wordList: { screen: WordListScreen },
    wordGroup: { screen: WordGroupScreen },
    word: { screen: WordScreen }
  }, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: APP_THEME
      },
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        color: '#ffffff'
      },
      headerTintColor: '#ffffff'
    }
  }),
  navigationOptions: { title: 'Learn' } 
  },
  search: { screen: createStackNavigator({
    searchScreen: { screen: SearchScreen }
  },
  {
    defaultNavigationOptions: {
      
      headerStyle: {
        backgroundColor: APP_THEME
      },
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        color: '#ffffff'
      },
      headerTintColor: '#ffffff'
    } 
  }),
  navigationOptions: { title: 'Search' }
 },
  revise: { screen: createStackNavigator({
    reviseMenu: { screen: ReviseMenuScreen },
    reviseSelected: { screen: ReviseSelectedScreen }
  }, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: APP_THEME
      },
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        color: '#ffffff'
      },
      headerTintColor: '#ffffff'
    }
  }),
  navigationOptions: { title: 'Revise' }
}
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName = '';
      if (routeName === 'learn') {
        iconName = 'leanpub';
      } else if (routeName === 'search') {
        iconName = 'search';
      } else if (routeName === 'revise') {
        iconName = 'hourglass-half';
      }
      return <Icon name={iconName} type='font-awesome' size={20} color={tintColor} />;
    } 
  }),
  tabBarOptions: {
    activeTintColor: '#fee505',
    inactiveTintColor: '#ffffff',
    labelStyle: { fontSize: 14 },
    style: {
      backgroundColor: APP_THEME
    }
  }
});

const AppContainer = createAppContainer(mainNavigator);

class App extends Component {
  
  componentDidMount() {
    databaseConn.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE if not exists ' + TABLE_NAME + ' ( ' 
        + COLUMN_ID + ' INTEGER PRIMARY KEY AUTOINCREMENT,'
        + COLUMN_WORD + ' TEXT,'
        + COLUMN_LEVEL + ' TEXT,'
        + COLUMN_GROUP + ' TEXT,'
        + COLUMN_LIST_NO + ' TEXT,'
        + COLUMN_MEANING + ' TEXT,'
        + COLUMN_SENTENCE + ' TEXT,'
        + COLUMN_NOTE + ' TEXT'
        + ')'
      );
    });
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
