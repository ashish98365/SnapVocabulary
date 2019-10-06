import { DATA_DOWNLOADED_SUCCESSFULLY } from '../utils/Type';

const INITIAL_STATE = {
    isDataDownloaded: false,
    noOfWordList: "0"
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DATA_DOWNLOADED_SUCCESSFULLY:
            return { isDataDownloaded: true, noOfWordList: action.payload };
        default:
            return { ...state };
    }
};
