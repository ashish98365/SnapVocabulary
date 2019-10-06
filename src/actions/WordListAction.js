import { SQLite } from 'expo-sqlite';

import { SHOW_WORD_LIST } from '../utils/Type';
import { 
    DATABASE_NAME,
    TABLE_NAME,
    COLUMN_WORD,
    COLUMN_LEVEL,
    COLUMN_GROUP,
    COLUMN_LIST_NO,
    COLUMN_MEANING,
    COLUMN_SENTENCE,
    COLUMN_LEVEL_NOT_DEFINE,
    PERCENT_COMPLETED
  } from '../utils/DatabaseType';

export const getWordListDetail = () => dispatch => {
    try {
        const query = `SELECT '${'Word List'} '|| ${COLUMN_LIST_NO} AS listNo, 
                        COUNT(DISTINCT ${COLUMN_GROUP}) || ' Groups' AS ${COLUMN_GROUP}, 
                        (100 * SUM(${COLUMN_LEVEL} <> '${COLUMN_LEVEL_NOT_DEFINE}') / COUNT(${COLUMN_LIST_NO})) AS ${PERCENT_COMPLETED}
                        FROM ${TABLE_NAME} GROUP BY ${COLUMN_LIST_NO} ORDER BY CAST(listNo AS UNSIGNED)`;

        const dbConn = SQLite.openDatabase(DATABASE_NAME);
        dbConn.transaction(tx => {
            tx.executeSql(
                query,
                [],
                (_, { rows: { _array } }) => {
                    dispatch({ type: SHOW_WORD_LIST, payload: _array });
                },
                (t, error) => { console.log(error); }
            );
        });
    } catch (error) {
        console.log(error);
    }
};

