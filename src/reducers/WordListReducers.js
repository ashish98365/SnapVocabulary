import { SHOW_WORD_LIST } from '../utils/Type';

const INITIAL_STATE = {
    wordListDetails: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_WORD_LIST:
            return { ...state, wordListDetails: action.payload };
        default:
            return { ...state };
    }
};
