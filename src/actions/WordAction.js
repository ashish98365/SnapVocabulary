import { SQLite } from 'expo-sqlite';

import { 
        WORD_GROUP_SELECTED, 
        LEVEL_UPDATE_SUCCESSFULL,
        NOTE_TEXT_CHANGE,
        NOTE_UPDATED
    } from '../utils/Type';

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
  } from '../utils/DatabaseType';

export const navigateToWord = (wordGroup, navigateObj, navigateTo) => (dispatch) => {
    const queryString = ' select * from ' + TABLE_NAME + ' where  ' + COLUMN_GROUP + ' =?';
    const dbConn = SQLite.openDatabase(DATABASE_NAME);
    dbConn.transaction(tx => {
        tx.executeSql(
            queryString,
            [wordGroup],
            (_, { rows: { _array } }) => {
                dispatch({ type: WORD_GROUP_SELECTED, payload: _array });
            },
            (t, error) => { console.log(error); }
        );
    });
    navigateObj(navigateTo, { wordGroup });
};

export const updateWordDifficultLevel = (wordDetail, difficultLevel) => (dispatch) => {
    const { id } = wordDetail;
    try {
        const queryString = `update ${TABLE_NAME} set ${COLUMN_LEVEL} =? where ${COLUMN_ID} =?`;
        const dbConn = SQLite.openDatabase(DATABASE_NAME);
        dbConn.transaction(tx => {
            tx.executeSql(
                queryString,
                [difficultLevel, id],
                () => {
                    //IMP newWordDetail is required bcoz with new variable new object is created otherwise 
                    //it refer to old obj and then componentWillReceiveProps is not called in WordScreen.js
                    const newWordDetail = { ...wordDetail, level: difficultLevel };
                    newWordDetail.difficultyLevelChanged = true;
                    dispatch({ type: LEVEL_UPDATE_SUCCESSFULL, payload: newWordDetail });
                },
                (t, error) => { console.log(error); }
            );
        });
    } catch (error) {
        console.log(error);
    }
};

export const changeNoteText = (text) => ({ type: NOTE_TEXT_CHANGE, payload: text });

export const updateNote = (wordDetail, noteText) => dispatch => {
    const { id } = wordDetail;
    const query = `update ${TABLE_NAME} set ${COLUMN_NOTE} =? where ${COLUMN_ID} =?`;
    const dbConn = SQLite.openDatabase(DATABASE_NAME);
    dbConn.transaction(tx => {
        tx.executeSql(
            query,
            [noteText, id],
            () => {
                const newWordDetail = { ...wordDetail, wordNote: noteText };
                dispatch({ type: NOTE_UPDATED, payload: newWordDetail });
            },
            (t, error) => { console.log(error); }
        );
    });
};
