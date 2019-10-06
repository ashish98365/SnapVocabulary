import { combineReducers } from 'redux';

import dataDownload from './DownloadReducer';
import wordListDetail from './WordListReducers';
import wordGroup from './WordGroupReducer';
import words from './WordReducer';
import search from './SearchReducer';
import reviseMenu from './ReviseMenuReducer';
import reviseSelected from './ReviseSelectedReducer';

export default combineReducers({
    dataDownload, wordListDetail, wordGroup, words, search, reviseMenu, reviseSelected
});
