import { WORD_LIST_SELECTED, WORD_GROUP_REFRESH } from '../utils/Type';

const INITIAL_STATE = {
    wordGroupArray: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WORD_LIST_SELECTED:
            return { ...state, wordGroupArray: action.payload };
        default:
            return { ...state };
    }
};
