import { SQLite } from 'expo-sqlite';

import { REVISE_MENU } from '../utils/Type';
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
  COLUMN_LEVEL_NOT_DEFINE
} from '../utils/DatabaseType';

const reviseData = [
    { id: '1', list: '1', easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: '2', list: '2', easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: '3', list: '3', easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: '4', list: '4', easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: '5', list: '5', easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: '6', list: '6', easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: '7', list: '7', easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: '8', list: '8', easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: '9', list: '9', easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: '10', list: '10', easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: '11', list: '11', easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: '12', list: '12', easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: '13', list: '13', easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: '14', list: '14', easy: 5, medium: 70, hard: 9, notAdded: 30 }
  ];

export const getReviseMenuDetail = () => (dispatch) => {
  const query = `SELECT ${COLUMN_LIST_NO}, count(1) AS total, 
                  SUM(CASE WHEN ${COLUMN_LEVEL} = 'easy' THEN 1 ELSE 0 END) AS easy,
                  SUM(CASE WHEN ${COLUMN_LEVEL} = 'medium' THEN 1 ELSE 0 END) AS medium,
                  SUM(CASE WHEN ${COLUMN_LEVEL} = 'hard' THEN 1 ELSE 0 END) AS hard,
                  SUM(CASE WHEN ${COLUMN_LEVEL} = '${COLUMN_LEVEL_NOT_DEFINE}' THEN 1 ELSE 0 END) AS ${COLUMN_LEVEL_NOT_DEFINE} 
                  FROM ${TABLE_NAME}
                  GROUP BY ${COLUMN_LIST_NO}
                  ORDER BY CAST(${COLUMN_LIST_NO} AS UNSIGNED INTEGER)`;
  const dbConn = SQLite.openDatabase(DATABASE_NAME);
  dbConn.transaction(tx => {
    tx.executeSql(
      query,
      [],
      (_, { rows: { _array } }) => {
        dispatch({ type: REVISE_MENU, payload: _array });
      },
      (t, error) => { console.log(error); }
    );
  });
};
