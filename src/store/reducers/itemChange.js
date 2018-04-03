import {
    ITEM_MODAL_SHOW,
    ITEM_MODAL_HIDE,
    LIST_MODAL_HIDE,
    LIST_MODAL_SHOW
} from '../constants';

const initialState = {
    isItemWindowVisible: false,
    islistWindowVisible: false,
    listIndex: null,
    item: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ITEM_MODAL_SHOW:
            return {
                ...state,
                isItemWindowVisible: true,
                listIndex: action.payload.listIndex,
                item: {...action.payload.item}
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