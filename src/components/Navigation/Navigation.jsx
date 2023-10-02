import React, { useContext, useState } from 'react';
import './Navigation.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth.hook';
import { AuthContext } from '../../context/AuthContext';

function Navigation() {
    const navigate = useNavigate();
    const {token} = useAuth();
    const isAuthenticated = !!token;
    const [isLogout,setIsLogout] = useState(true)

    const auth = useContext(AuthContext)
  
    const logoutHandler = () => {
      auth.logout()
      setIsLogout(false)

    }
    return (
        <div className="navigation">
            <Link to="/" className='logo'>PRESENTATIONS</Link>
            <div className="links">
                {
                    isAuthenticated && isLogout
                    ?
                    <div>
                        <Link to="/" className='links__link links__home'>Главная</Link>
                        <Link to="/new_template" className='links__link links__settings'>Настройки</Link>
                        <Link to="/" className='links__link links__settings' onClick={logoutHandler}>Выйти</Link>
                    </div>
                    :
                    <div>
                        <Link to="/" className='links__link links__home'>Главная</Link>
                        <Link to="/new_template" className='links__link links__settings'>Настройки</Link>
                        <Link to="/sign_in" className='links__link links__sign-in'>Войти</Link>
                        <Link to="/sign_up" className='links__link links__sign-up'>Зарегистрироваться</Link>
                    </div>
                }
            </div>
        </div>
    );
}

export default Navigation;