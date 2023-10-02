import { createStore } from 'redux';
import {customersReducer} from './reducer';

const initialState = JSON.parse(localStorage.getItem('myAppState')) || {
    customers: [],
};

const store = createStore(customersReducer, initialState);

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('myAppState', JSON.stringify(state));
});

export default store;