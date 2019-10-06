import { SEARCH_WORD } from '../utils/Type';

const INITIAL_STATE = {
    searchArray: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_WORD:
            return { ...state, searchArray: action.payload };
        default:
            return { ...state };
    }
};
