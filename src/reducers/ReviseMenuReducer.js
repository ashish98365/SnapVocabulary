import { REVISE_MENU } from '../utils/Type';

const INITIAL_STATE = {
    reviseMenuArray: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REVISE_MENU:
            return { ...state, reviseMenuArray: action.payload };
        default:
            return { ...state };
    }
};
