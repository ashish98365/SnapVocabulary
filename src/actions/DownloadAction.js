import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { SQLite } from 'expo-sqlite';
import * as wordDetail from '../utils/Data.json';

import { 
        DATA_DOWNLOADED_SUCCESSFULLY, 
        NO_OF_WORD_LIST,
        ALL_WORD_INFO_URL,
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
    COLUMN_SENTENCE
  } from '../utils/DatabaseType';

export const downloadWordsFromApi = () => dispatch => {
    try {
        // --------Download from api is disable by default----------------
        // const wordArrayData = await axios.get(ALL_WORD_INFO_URL);
        // const wordArray = wordArrayData.data;
        
        const wordArray = wordDetail.data;
        insertWordDetailInTable(wordArray, dispatch);
    } catch (error) {
        console.log(error);
    }
};

const insertWordDetailInTable = (wordArray, dispatch) => {
    const noOfWordGroup = wordArray.length / 6;

    let word = '';
    let difficultLevel = '';
    let group = '';
    let listNo = '';
    let meaning = '';
    let sentence = '';

    let queryString = ' insert into '  + TABLE_NAME + ' (' +COLUMN_WORD +',' + COLUMN_LEVEL + ',' 
                      + COLUMN_GROUP  + ',' + COLUMN_LIST_NO + ',' + COLUMN_MEANING + ',' 
                      + COLUMN_SENTENCE + ') VALUES ';

    for (let i = 0; i < noOfWordGroup; i++) {
        word = wordArray[i * 6] == null ? '' : wordArray[i * 6].trim();
        difficultLevel = 'notadded';
        group = wordArray[(i * 6) + 4] == null ? '' : wordArray[(i * 6) + 4].trim();
        listNo = wordArray[(i * 6) + 5] == null ? '' : wordArray[(i * 6) + 5].trim();
        meaning = wordArray[(i * 6) + 1] == null ? '' : wordArray[(i * 6) + 1].trim();
        sentence = wordArray[(i * 6) + 2] == null ? '' : wordArray[(i * 6) + 2].trim();

        queryString += ' ("' + word + '","' + difficultLevel + '","' + group + '","' 
                        + listNo + '","' + meaning + '","' + sentence + '")';
        
        if (i == (noOfWordGroup - 1)) {
            queryString += ';';
        } else {
            queryString += ',';
        }
    }

    const databaseConn = SQLite.openDatabase(DATABASE_NAME);
    databaseConn.transaction(
        tx => {
            tx.executeSql(
                queryString, 
                [], 
                () => { saveWordDetail(dispatch); },
                (t, error) => { console.log(error); }
            );
        },
        (error) => { console.log(error); }, null
    );
};

const saveWordDetail = (dispatch) => {
    const databaseConn = SQLite.openDatabase(DATABASE_NAME);
    const queryString = 'select max( cast(' + COLUMN_LIST_NO + ' as unsigned)) as \'' + NO_OF_WORD_LIST + '\'  from ' + TABLE_NAME;
    databaseConn.transaction(
        tx => {
            tx.executeSql(
                queryString, 
                [], 
                async (_, { rows: { _array } }) => {
                    const data = _array[0];  //total no of word group;
                    const payload = JSON.stringify(data[NO_OF_WORD_LIST]);
                    await AsyncStorage.setItem(DATADOWNLOADED, 'true');
                    await AsyncStorage.setItem(NO_OF_WORD_LIST, payload);
                    dispatch({ type: DATA_DOWNLOADED_SUCCESSFULLY, payload });
                },
                (t, error) => { console.log(error); }
            );
        }
    );
};
