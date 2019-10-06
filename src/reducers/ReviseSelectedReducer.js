import { REVISE_LEVEL_SELECTED } from '../utils/Type';

const INITIAL_STATE = {
    reviseSelectedArray: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REVISE_LEVEL_SELECTED:
            return { reviseSelectedArray: action.payload };
        default:
            return { ...state };
    }
}