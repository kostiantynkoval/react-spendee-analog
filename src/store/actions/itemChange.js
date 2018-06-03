import {apiRequest, apiSuccess, apiFail} from '../actions/api'

import {
    BASE_URL,
    CHANGE_ITEM_REQUEST,
    CHANGE_ITEM_SUCCESS,
    CHANGE_ITEM_FAIL,
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAIL,
    ITEM_MODAL_SHOW,
    ITEM_MODAL_HIDE,
    LIST_MODAL_SHOW,
    LIST_MODAL_HIDE,
} from '../constants';

export const showItemWindowAction = (item) => dispatch => {
    dispatch(apiSuccess(ITEM_MODAL_SHOW, item));
}

export const hideItemWindowAction = () => dispatch => {
    dispatch(apiRequest(ITEM_MODAL_HIDE));
}

export const showListWindowAction = (list) => dispatch => {
    dispatch(apiSuccess(LIST_MODAL_SHOW, list));
}

export const hideListWindowAction = () => dispatch => {
    dispatch(apiRequest(LIST_MODAL_HIDE));
}

export const changeItemAction = (item, items) => dispatch => {
    dispatch(apiRequest(CHANGE_ITEM_REQUEST));
    setTimeout(() => changeItem(item, items), 500);
    function changeItem(item, items) {
        const itemIndexes = findItem(item, items)
        items[itemIndexes.parentIndex].items.splice(itemIndexes.index,1,item);
        dispatch(apiSuccess(CHANGE_ITEM_SUCCESS, items))
        localStorage.setItem('items', JSON.stringify(items))
        dispatch(apiRequest(ITEM_MODAL_HIDE));
    }

}

export const deleteItemAction = (item, items) => dispatch => {
    dispatch(apiRequest(DELETE_ITEM_REQUEST));
    setTimeout(() => delItem(item, items), 500);
    function delItem(item, items) {
        const itemIndexes = findItem(item, items)
        items[itemIndexes.parentIndex].items.splice(itemIndexes.index,1);
        dispatch(apiSuccess(DELETE_ITEM_SUCCESS, items))
        localStorage.setItem('items', JSON.stringify(items))
        dispatch(apiRequest(ITEM_MODAL_HIDE));
    }

}

// Find item in array
function findItem(item, items) {
    let index,parentIndex = -1;
    for (let i = 0; i < items.length; i++) {
        for(let j = 0; j < items[i].items.length; j++) {
            if (items[i].items[j].id===item.id) {
                index = j;
                parentIndex = i;
            }
        }
    }
    return {parentIndex, index};
}