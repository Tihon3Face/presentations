import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import HomePage from './Pages/HomePage/HomePage';
import NewTemplate from './components/NewTemplate/NewTemplate';
import Navigation from './components/Navigation/Navigation';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import SignInPage from './Pages/SignInPage/SignInPage';
import { useAuth } from './hooks/auth.hook';
import { useDispatch, useSelector } from 'react-redux';



function App() {
    const {token,userId,login,logout} = useAuth();
    const isAuthenticated = !!token;


    const customers = useSelector(state => state.customers);
    console.log(customers)
    const dispatch = useDispatch();
    const addCustomer = (name) => {
        const customer = {
            name,
            id:Date.now()
        }
        dispatch({type:'ADD_CUSTOMER', payload:customer})
    }
    const removeCustomer = (customer) => {
        dispatch({type:'REMOVE_CUSTOMER', payload: customer.id})
    }
    return (
        <AuthContext.Provider value={{token,login,logout,userId,isAuthenticated}}>
            <BrowserRouter>
                    <Routes>
                        <Route exact path='/presentations' element={<HomePage/>} />
                        <Route path='/new_template' element={<NewTemplate/>}/>
                        <Route path='/sign_in' element={<SignInPage/>} />
                        <Route path='/sign_up' element={<SignUpPage/>}/>
                    </Routes>
            </BrowserRouter>


            <div>
                <button onClick={() => addCustomer(prompt())}>Добавить</button>
                <h1>Почётные долбоёбы:</h1>
                {
                    customers.length > 0
                    ?
                    <h1>
                        {customers.map(customer => 
                            <div key={customer.id} style={{border:'1px solid black'}} onClick={() => removeCustomer(customer)}>{customer.name}</div>
                        )}
                    </h1>
                    :
                    <h1>нет их еблан</h1>
                }
                
            </div>
        </AuthContext.Provider>

    );
}

export default App;