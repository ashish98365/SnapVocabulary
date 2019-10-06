import { SQLite } from 'expo-sqlite';

import { REVISE_LEVEL_SELECTED } from '../utils/Type';
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

export const getSelectedReviseLevelDetail = (list, level, navigateObj, navigateTo) => dispatch => {
    const query = `SELECT * FROM ${TABLE_NAME} WHERE ${COLUMN_LIST_NO} = ${list} AND 
                    ${COLUMN_LEVEL} = '${level}' ORDER BY RANDOM()`;
    const dbConn = SQLite.openDatabase(DATABASE_NAME);
    dbConn.transaction(tx => {
        tx.executeSql(
            query,
            [],
            (_, { rows: { _array } }) => {
                dispatch({ type: REVISE_LEVEL_SELECTED, payload: _array });
                navigateObj.navigate(navigateTo, { list, level });
            },
            (t, error) => { console.log(error); }
        );
    });
};
