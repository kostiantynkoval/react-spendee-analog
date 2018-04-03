import {
    ITEM_MODAL_SHOW,
    ITEM_MODAL_HIDE,
    LIST_MODAL_HIDE,
    LIST_MODAL_SHOW
} from '../constants';

const initialState = {
    isItemWindowVisible: false,
    isListWindowVisible: false,
    item: {},
    list: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ITEM_MODAL_SHOW:
            return {
                ...state,
                isItemWindowVisible: true,
                item: {...action.payload}
            };
        case ITEM_MODAL_HIDE:
            return {
                ...state,
                isItemWindowVisible: false,
                listIndex: null,
                item: {}
            };
        case LIST_MODAL_SHOW:
            return {
                ...state,
                isListWindowVisible: true,
                list: {...action.payload}
            };
        case LIST_MODAL_HIDE:
            return {
                ...state,
                isListWindowVisible: false,
            };
        default:
            return {
                ...state
            }
    }
}