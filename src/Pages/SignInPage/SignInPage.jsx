import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import '../AuthOrReg.css'
import '../../App.css';
import back from '../images/back.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function SignInPage() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext)
    const {loading,request,error} = useHttp()
    const [form,setForm] = useState({username:'',password:'',email:''})

    function changeHandler (event) {
        setForm({...form, [event.target.name]: [event.target.value]})
    }

    
    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token,data.userId)
            navigate('/')
        }catch(e){
        }
    }

    const [adaptiveBtn,setAdaptiveBtn] = useState( 1000 < window.innerWidth);
    useEffect(() => {
        const authorization = document.getElementsByClassName('auth-or-reg')[0];
        function determineWidth () {
            const authorizationWidth = parseInt(authorization.offsetWidth, 10);
            const windowWidth = window.innerWidth;
            if((authorizationWidth + 201) > windowWidth){ 
                setAdaptiveBtn(false);
            }else{
                setAdaptiveBtn(true);
            }
        }

        
        const allInputs = document.getElementsByClassName('auth-or-reg__input')
        const hr = document.getElementsByClassName('auth-or-reg__input-line')
        function hrAnimateStart (e) {
            let index = [...allInputs].indexOf(e.target)
            hr[index].style.animation = 'border-bottom 0.5s 1 ease'
            hr[index].style.backgroundColor = 'rgb(0, 240, 240)';
        }

        function hrAnimateEnd (e) {
            let index = [...allInputs].indexOf(e.target)
            hr[index].style.animation = 'none';
            hr[index].style.backgroundColor = 'rgb(0, 189, 189)';
        }


        determineWidth()

        window.addEventListener('resize', determineWidth);
        for (const input of allInputs) {
            input.addEventListener('focus', hrAnimateStart );
        }
        for (const input of allInputs) {
            input.addEventListener('blur', hrAnimateEnd );
        }
        return () => {
            window.removeEventListener('resize', determineWidth)
            for (const input of allInputs) {
                input.addEventListener('focus', hrAnimateStart );
            }
            for (const input of allInputs) {
                input.removeEventListener('blur', hrAnimateEnd );
            }
        };
    }, []);

    return (
        <div className='container flex-center auth-or-reg-background'>
            {
                adaptiveBtn
                ?
                <div className="back-btn" title='Назад'>
                    <Link to='/'><img className="back-img" src={back} alt="" /></Link>
                </div>
                :
                null
            }
            <div className='auth-or-reg'>
                {
                    !adaptiveBtn
                    ?
                    <div className='auth-or-reg__header'>
                        <div className="back-btn"
                            title='Домой'
                            style={{borderBottom:'none'}}
                        >
                        <Link to='/'><img className="back-img" src={back} alt="" /></Link>
                    </div>
                        <p className='logo'>PRESENTATIONS</p> 
                    </div>
                    :
                    <div className='auth-or-reg__header'>
                        <p className='logo'>PRESENTATIONS</p> 
                    </div>
                }
                <form action="#" className='auth-or-reg__form auth-or-reg-margin-top'>
                    <h2 className='auth-or-reg__caption'>Авторизация</h2>
                    <div className='auth-or-reg__inputs'>
                        <label className='auth-or-reg__label' htmlFor="username">
                            Введите своё имя
                            <input className='auth-or-reg__input' id='username' placeholder='Username' type="text" name='username' onChange={changeHandler}/>
                            <hr className='auth-or-reg__input-line'/>
                        </label>
                        <label className='auth-or-reg__label' htmlFor="password">
                            Введите пароль
                            <input className='auth-or-reg__input' id='password' placeholder='Password' type="password" name='password' onChange={changeHandler}/>
                            <hr className='auth-or-reg__input-line'/>
                        </label>
                    </div>
                    <div className='auth-or-reg__buttons'>
                        <div className='auth-or-reg__buttons-flex'>
                            <button 
                                className={
                                    loading
                                    ?
                                    'auth-or-reg__button loading-grayscale auth-or-reg__button-cursor'
                                    :
                                    'auth-or-reg__button auth-or-reg__button-hover auth-or-reg__button-active'
                                } 
                                onClick={loginHandler}
                                disabled={loading}
                                >
                                    Войти
                                    <div className={loading ? 'loading' : null}></div>
                            </button>
                            <div className='auth-or-reg__sign-in'>
                                <p className='auth-or-reg__sign-in-caption'>Ещё не создали аккаунт?</p>
                                <Link className='auth-or-reg__button auth-or-reg__button-hover auth-or-reg__button-active' to='/sign_up'>
                                    Зарегистрироваться
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignInPage;