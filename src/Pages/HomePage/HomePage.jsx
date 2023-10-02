import React,{useEffect,useState} from 'react';
import './HomePage.css'
import page from '../images/page.png'
import plus from '../images/plus.png'
import back from '../images/back.png'
import Navigation from '../../components/Navigation/Navigation';
import HomePageProject from '../components/HomePageProject/HomePageProject';

function HomePage() {
    useEffect(() => {
        const ol = document.getElementsByClassName('projects')[0];
        const pUnknown = document.getElementsByClassName('pictures__upload-file');
        const uploaded = document.getElementsByClassName('pictures__uploaded-picture');
        const MouseOver = (e) => {
            let index = 0;
            for (let item of uploaded){
                if(item === e.target){
                    pUnknown[index].style.transition = '0s';
                    pUnknown[index].style.filter = `blur(0px)`;
                }
                index++;
            }
        }
        const MouseOut = (e) => {
            let index = 0;
            for (let item of uploaded){
                if(item === e.target){
                    pUnknown[index].style.transition = '0.5s';
                    pUnknown[index].style.filter = `blur(100px)`;
                }
                index++;
            }
        }
        ol.addEventListener('mouseover', MouseOver);
        ol.addEventListener('mouseout', MouseOut);
        return () => {
            ol.removeEventListener('mouseover', MouseOver);
            ol.removeEventListener('mouseout', MouseOut);
        }
    },[])


    const [addProject,setAddProject] = useState([]);
    function createProject () {
        setAddProject(prev => [...prev,{picture: page, title:'Без имени', id: Date.now()}])
    }


    const [optionsBtn,setOptionsBtn] = useState(window.innerWidth <= 1600);
    useEffect(() => {

        const optionsOpenBtn = document.getElementsByClassName('options-btn')[0]
        const optionsCloseBtn = document.getElementsByClassName('options__btn')[0]
        const options = document.getElementsByClassName('options')[0]

        function openOptions () {
            options.style.left = '0';
            options.style.animation = 'open 0.5s ease 1 forwards'
        }

        function closeOptions (e) {
            if(e.target.closest('.options__btn')){
                options.style.left = '0';
                options.style.animation = 'close 0.5s ease 1 forwards'
            }
        }
        function displayCloseBtn () {
            if(window.innerWidth <= 1600){
                options.style.animation = 'none'
                options.style.left = '-450px'
                setOptionsBtn(true)
            }else{
                setOptionsBtn(false)
                options.style.animation = 'none'
                options.style.left = '0'
            }
        }
        displayCloseBtn()
        
        optionsOpenBtn.addEventListener('click', openOptions)
        options.addEventListener('click', closeOptions)
        window.addEventListener('resize', displayCloseBtn)
        return () => {
            optionsOpenBtn.removeEventListener('click', openOptions)
            options.removeEventListener('click', closeOptions)
            window.removeEventListener('resize', displayCloseBtn)
        }
    },[])


    return (
        <div className="container">
            <Navigation/>
            <div className='options lateral-side margin-top'>
                {
                    optionsBtn
                    ?
                    <div className='options__btn'><img className='options__btn_img' src={back} alt="" /></div>
                    :
                    null
                }
            </div>
            <div className='options-btn margin-top'><img className='options-btn__img' src={back} alt="" /></div>
            <div className='projects main-side margin-top'>
                <div className="projects__margin">
                    {
                        addProject.map((item,index) => 
                            <HomePageProject key={index} picture={item.picture} isProject={true} title={item.title}/>
                        )
                    }
                    {
                        addProject.length === 10 
                        ?
                        null
                        :
                        <HomePageProject picture={plus} isProject={false} createProject={createProject}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default HomePage;