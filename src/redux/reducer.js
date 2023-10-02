const initialState = JSON.parse(localStorage.getItem('myAppState')) || {
    customers: [],
};

export const ADD_CUSTOMER= 'ADD_CUSTOMER'
export const REMOVE_CUSTOMER = 'REMOVE_CUSTOMER'

export const customersReducer = (state = initialState, action) => {
    switch (action.type) {
    case ADD_CUSTOMER:
        return {...state, customers: [...state.customers, action.payload] };
    case REMOVE_CUSTOMER :
        return {...state, customers: state.customers.filter(item => item.id !== action.payload) };
    default:
        return state;
    }
};