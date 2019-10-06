import { SQLite } from 'expo-sqlite';

import { SEARCH_WORD } from '../utils/Type';
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

export const getMatchedWordForKeyword = keyword => dispatch => {
    const queryString = 'select * from ' + TABLE_NAME + ' where lower("' +
                        COLUMN_WORD + '") LIKE \'' + keyword + '%\' or lower("' + 
                        COLUMN_GROUP + '") LIKE \'' + keyword + '%\'';
    const dbConn = SQLite.openDatabase(DATABASE_NAME);
    dbConn.transaction(tx => {
        tx.executeSql(
            queryString, 
            [],
            (_, { rows: { _array } }) => {
                dispatch({ type: SEARCH_WORD, payload: _array });
            },
            (t, error) => { console.log(error); }
        );
    });
};
