import { SQLite } from 'expo-sqlite';

import { WORD_LIST_SELECTED, WORD_GROUP_REFRESH } from '../utils/Type';

import { 
    DATABASE_NAME,
    TABLE_NAME,
    COLUMN_WORD,
    COLUMN_GROUP,
    COLUMN_LIST_NO,
    COLUMN_LEVEL,
    COLUMN_LEVEL_NOT_DEFINE,
    PERCENT_COMPLETED
  } from '../utils/DatabaseType';

const query = `select distinct ${COLUMN_GROUP},
  COUNT(DISTINCT ${COLUMN_WORD}) || ' Words' AS ${COLUMN_WORD},
  (100 * SUM(${COLUMN_LEVEL} <> '${COLUMN_LEVEL_NOT_DEFINE}') / COUNT(${COLUMN_GROUP})) AS ${PERCENT_COMPLETED}
  from ${TABLE_NAME}  
  where ${COLUMN_LIST_NO}  = ? GROUP BY ${COLUMN_GROUP}`;

export const navigateToWordGroup = (wordList, navigateObj, navigateTo) => (dispatch) => {
    const dbConn = SQLite.openDatabase(DATABASE_NAME);
    dbConn.transaction(tx => {
        tx.executeSql(
            query,
            [JSON.stringify(wordList)], 
            (_, { rows: { _array } }) => {
                dispatch({ type: WORD_LIST_SELECTED, payload: _array });
            },
            (t, error) => { console.log(error); }
        );
    });
    navigateObj(navigateTo, { listNo: JSON.stringify(wordList) });
};

export const refreshWordGroup = (wordList) => (dispatch) => {
    const dbConn = SQLite.openDatabase(DATABASE_NAME);
    dbConn.transaction(tx => {
        tx.executeSql(
            query,
            [wordList], 
            (_, { rows: { _array } }) => {
                dispatch({ type: WORD_LIST_SELECTED, payload: _array });
            },
            (t, error) => { console.log(error); }
        );
    });
};
