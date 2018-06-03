import {apiRequest, apiSuccess} from '../actions/api'

import {
    BASE_URL,
    GET_ITEMS_FAIL,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAIL,
    REORDER_TODO_SUCCESS,
    ADD_LIST_REQUEST,
    ADD_LIST_SUCCESS,
    ADD_LIST_FAIL,
    RENAME_LIST_REQUEST,
    RENAME_LIST_SUCCESS,
    RENAME_LIST_FAIL,
    REMOVE_LIST_REQUEST,
    REMOVE_LIST_SUCCESS,
    REMOVE_LIST_FAIL,
    REORDER_LIST_SUCCESS,
    LIST_MODAL_HIDE,
} from '../constants';

export const getItemsAction = () => dispatch => {
    dispatch(apiRequest(GET_ITEMS_REQUEST));

    setTimeout(() => getItems(), 1500);
    function getItems() {



        /*const itemsArr = [
            {
                name: 'Продукты',
                id: 'products',
                items: [
                    {id: 'item-0', name: 'Супермаркет', date: '2018-06-01T14:36', content: 'Крупы и прочие сыпучие', amount: 100}, {id: 'item-1', name: 'Рынок', date: '2018-06-02T18:15', content: 'Купил мяса на неделю', amount: 250}, {id: 'item-2', name: 'Продуктовый на углу', date: '2018-06-03T11:38', content: 'Сметанка к борщу', amount: 15},
                ]
            },
            {
                name: 'Развлечения',
                id: 'leisure',
                items: [
                    {id: 'item-3', name: 'Ресторан', date: '2018-06-01T19:20', content: 'Сходили поужинать', amount: 300}, {id: 'item-5', name: 'Кино', date: '2018-06-02T11:46', content: 'Сходили на новый мультфильм с семьей', amount: 200},
                ]
            }
        ];
        const itemsStr = JSON.stringify(itemsArr);
        localStorage.setItem('items', itemsStr);*/
        const items = JSON.parse(localStorage.getItem('items'));

        dispatch(apiSuccess(GET_ITEMS_SUCCESS, items))
    }

}

export const addTodoAction = (items) => dispatch => {
    dispatch(apiRequest(ADD_TODO_REQUEST));

    setTimeout(() => addTodo(), 500);
    function addTodo() {
        dispatch(apiSuccess(ADD_TODO_SUCCESS, items))
        localStorage.setItem('items', JSON.stringify(items))
    }

}

export const addListAction = (items) => dispatch => {
    dispatch(apiRequest(ADD_LIST_REQUEST));

    setTimeout(() => addTodo(), 500);
    function addTodo() {
        dispatch(apiSuccess(ADD_LIST_SUCCESS, items))
        localStorage.setItem('items', JSON.stringify(items))
    }

}

export const reorderTodoAction = items => dispatch => {
    setTimeout(() => reorderTodo(), 500);
    function reorderTodo() {
        dispatch(apiSuccess(REORDER_TODO_SUCCESS, items))
        localStorage.setItem('items', JSON.stringify(items))
    }

}


export const reorderListAction = items => dispatch => {
    setTimeout(() => reorderList(), 500);
    function reorderList() {
        dispatch(apiSuccess(REORDER_LIST_SUCCESS, items))
        localStorage.setItem('items', JSON.stringify(items))
    }

}

export const removeListAction = items => dispatch => {
    dispatch(apiRequest(REMOVE_LIST_REQUEST));

    setTimeout(() => reorderList(), 500);
    function reorderList() {
        dispatch(apiSuccess(REMOVE_LIST_SUCCESS, items))
        localStorage.setItem('items', JSON.stringify(items))
    }

}

export const renameListAction = items => dispatch => {
    dispatch(apiRequest(RENAME_LIST_REQUEST));

    setTimeout(() => reorderList(), 500);
    function reorderList() {
        dispatch(apiSuccess(RENAME_LIST_SUCCESS, items))
        localStorage.setItem('items', JSON.stringify(items))
        dispatch(apiRequest(LIST_MODAL_HIDE))
    }

}