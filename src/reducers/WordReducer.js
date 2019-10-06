import { 
        WORD_GROUP_SELECTED, 
        LEVEL_UPDATE_SUCCESSFULL,
        NOTE_TEXT_CHANGE,
        NOTE_UPDATED
    } from '../utils/Type';

const INITIAL_STATE = {
    wordArray: [],
    noteText: '',
    wordNoteUpdated: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WORD_GROUP_SELECTED:
            return { ...state, wordNoteUpdated: false, currentWordLevel: '', wordArray: action.payload };
        case LEVEL_UPDATE_SUCCESSFULL:
            return { ...state, wordNoteUpdated: false, currentWordLevel: action.payload };
        case NOTE_TEXT_CHANGE: 
            return { ...state, wordNoteUpdated: false, noteText: action.payload };
        case NOTE_UPDATED: 
            return { ...state, wordNoteUpdated: true, currentWordLevel: action.payload };
        default:
            return state;
    }
};
