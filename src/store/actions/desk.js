// import request from 'superagent';
import {push} from 'react-router-redux';
import {apiRequest, apiSuccess, apiFail} from '../actions/api'

import {
    BASE_URL,
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAIL,
    REMOVE_TODO_REQUEST,
    REMOVE_TODO_SUCCESS,
    REMOVE_TODO_FAIL,
    REORDER_TODO_REQUEST,
    REORDER_TODO_SUCCESS,
    REORDER_TODO_FAIL,
    ADD_LIST_REQUEST,
    ADD_LIST_SUCCESS,
    ADD_LIST_FAIL,
    REMOVE_LIST_REQUEST,
    REMOVE_LIST_SUCCESS,
    REMOVE_LIST_FAIL,
    REORDER_LIST_REQUEST,
    REORDER_LIST_SUCCESS,
    REORDER_LIST_FAIL,
} from '../constants';


export const addTodoAction = todoData => dispatch => {
    dispatch(apiRequest(ADD_TODO_REQUEST));

    setTimeout(() => addTodo(), 500);
    function addTodo() {

        console.log('todoData', todoData)
        dispatch(apiSuccess(ADD_TODO_SUCCESS, todoData))
    }

}

export const reorderTodoAction = todoData => dispatch => {
    dispatch(apiRequest(REORDER_TODO_REQUEST));

    setTimeout(() => reorderTodo(), 500);
    function reorderTodo() {
        console.log('todoData', todoData)

        dispatch(apiSuccess(REORDER_TODO_SUCCESS, todoData))
    }

}


export const reorderListAction = listData => dispatch => {
    dispatch(apiRequest(REORDER_LIST_REQUEST));

    setTimeout(() => reorderList(), 500);
    function reorderList() {

        dispatch(apiSuccess(REORDER_LIST_SUCCESS, listData))
    }

}