import React from 'react';
import AddImg from './components/AddImg';
import ModalImages from './components/ModalImages';
import './styles/App.css';
import { useEffect, useState } from 'react';
import page from './components/page.png'

function App() {
    useEffect(() => {
        const upload = document.getElementsByClassName('pictures__upload');
        const inputs = document.getElementsByClassName('upload__picture');
        const inputs2 = document.querySelectorAll('.upload__picture');
        const ol = document.querySelector('ol');
        const pUpload = document.getElementsByClassName('upload');
        const pUnknown = document.getElementsByClassName('unknown');
        const uploaded = document.getElementsByClassName('uploaded__picture');
        const MouseOver = (e) => {
            let index = 0;
            for (let item of inputs){
                if(item === e.target){
                    // upload[index].style.transition = '0s';
                    pUpload[index].style.transition = '0s';
                    pUpload[index].style.filter = `blur(0px)`;
                }
                index++;
            }
            index = 0;
            for (let item of uploaded){
                if(item === e.target){
                    // upload[index].style.transition = '0s';
                    pUnknown[index].style.transition = '0s';
                    pUnknown[index].style.filter = `blur(0px)`;
                }
                index++;
            }
        }
        const MouseOut = (e) => {
            let index = 0;
            for (let item of inputs){
                if(item === e.target){
                    // upload[index].style.transition = '0.4s';
                    pUpload[index].style.transition = '0.4s';
                    pUpload[index].style.filter = `blur(30px)`;   
                }
                index++;
            }
            index = 0;
            for (let item of uploaded){
                if(item === e.target){
                    // upload[index].style.transition = '0.4s';
                    pUnknown[index].style.transition = '0.4s';
                    pUnknown[index].style.filter = `blur(30px)`;
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


    
    const [addImg,setAddImg] = useState([]);
    function uploadFile(event){
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            if((file.type).includes('image')){
                setAddImg((prev) => [...prev,{id:Date.now(), picture:reader.result, title:'Без имени'}])
            }else{
                alert('Вы не можете загружать какой-либо файл, кроме картинки.');
            }
        }
    }

    const [isDeleted,setIsDeleted] = useState(true);
    const [idOfDeduce,setIdOfDeduce] = useState(-1);
    useEffect(() => {
        const ol = document.getElementsByTagName('ol')[0];
        const uploaded = document.getElementsByClassName('uploaded__picture');
        const picture = document.getElementsByClassName('to_deduce_picture');
        const presentation = document.getElementsByClassName('presentation')[0];
        function funcDeduce (e) {
            if([...uploaded].includes(e.target)){
                let id = 0
                for (let item of uploaded){
                    if(item === e.target){
                        setIdOfDeduce(id)
                        setIsDeleted(true)
                        presentation.style.background = `url("${picture[id].src}") center/cover no-repeat`
                    }
                    id++;
                }
            }
        }
        ol.addEventListener('click', funcDeduce)
        
        return () => {
            ol.removeEventListener('click', funcDeduce)
        }
    },[])
    function removeFile (e) {
        setAddImg((prevFiles) => {
            prevFiles = prevFiles.filter((prevFile) => prevFile.id !== Number(e.target.id))
            return prevFiles
        });
        const presentation = document.getElementsByClassName('presentation')[0];
        const picture = document.getElementsByClassName('to_deduce_picture');
        if(idOfDeduce > -1 && isDeleted){
            if(addImg[idOfDeduce].id === Number(e.target.id)){
                if(idOfDeduce === 0){
                    if(addImg.length === 1){
                        presentation.style.background = `none`
                        setIsDeleted(false)
                    }else{
                        presentation.style.background = `url("${picture[idOfDeduce+1].src}") center/cover`
                        setIdOfDeduce(idOfDeduce)
                    }
                }else{
                    presentation.style.background = `url("${picture[idOfDeduce-1].src}") center/cover`
                    setIdOfDeduce(idOfDeduce-1)
                }
            }else if(addImg[idOfDeduce].id !== Number(e.target.id)){
                let compareElem = addImg.findIndex(item => item.id === Number(e.target.id))
                if(compareElem > idOfDeduce){
                    presentation.style.background = `url("${picture[idOfDeduce].src}") center/cover`
                    setIdOfDeduce(idOfDeduce)
                }else{
                    presentation.style.background = `url("${picture[idOfDeduce].src}") center/cover`
                    setIdOfDeduce(idOfDeduce-1)
                }
            }
        }
    };



    const [activeModal,setActiveModal] = useState(false);
    useEffect(() => {
        const modalBtns = document.getElementsByClassName('change__picture');
        const ol = document.querySelector('ol');
        function addModal (e) {
            if([...modalBtns].includes(e.target)){
                setActiveModal({ide:e.target.id})
            }
        }
        ol.addEventListener('click', addModal)
        return () => {
            ol.removeEventListener('click', addModal)
        }
    },[])
    function changeImg (content,newImg,setActive) {
        addImg.splice(addImg.findIndex(item => Number(content.id) === item.id),1,{id:content.id,title:content.title,picture:newImg})
        setActive(false);
        const presentation = document.getElementsByClassName('presentation')[0];
        if((idOfDeduce > -1 && isDeleted) && idOfDeduce === addImg.findIndex(item => item.id === content.id)){
            presentation.style.background = `url("${newImg}") center/cover`;
        }
    }
    function changeTitle (content,newValue,setActive,e) {
        e.preventDefault()
        addImg.splice(addImg.findIndex(item => Number(content.id) === item.id),1,{id:content.id,title:newValue,picture:content.picture})
        setActive(false)
    }



    useEffect(() => {
        const ol = document.getElementsByTagName('ol')[0]
        const presentation = document.getElementsByClassName('presentation')[0];
        function determineRatio() {
            const deducedImg = document.getElementById('deduced-img');
            if (deducedImg) {
                const preserntationRatio = presentation.offsetWidth / presentation.offsetHeight;
                const deducedImgRatio = deducedImg.naturalWidth / deducedImg.naturalHeight;
                if (presentation.offsetWidth > deducedImg.naturalWidth && presentation.offsetHeight > deducedImg.naturalHeight) {
                    deducedImg.style.width = 'auto';
                    deducedImg.style.height = 'auto';
                    deducedImg.style.border = '2px solid white';
                }else if(presentation.offsetWidth === deducedImg.naturalWidth && presentation.offsetHeight === deducedImg.naturalHeight){
                    deducedImg.style.width = '100%';
                    deducedImg.style.height = '100%';
                } else if (preserntationRatio > deducedImgRatio) {
                    deducedImg.style.width = 'auto';
                    deducedImg.style.height = '100%';
                    deducedImg.style.borderRight = '2px solid white';
                    deducedImg.style.borderLeft = '2px solid white';
                    deducedImg.style.borderTop = '0';
                    deducedImg.style.borderBottom = '0';
                } else if (preserntationRatio < deducedImgRatio) {
                    deducedImg.style.width = '100%';
                    deducedImg.style.height = 'auto';
                    deducedImg.style.borderTop = '2px solid white';
                    deducedImg.style.borderBottom = '2px solid white';
                    deducedImg.style.borderRight = '0';
                    deducedImg.style.borderLeft = '0';
                }
            }
        }
        determineRatio()
        window.addEventListener('mouseover', determineRatio)
        window.addEventListener('resize', determineRatio)
        ol.addEventListener('click', determineRatio)
        return () => {
            window.removeEventListener('mouseenter', determineRatio)
            window.removeEventListener('resize', determineRatio)
            ol.removeEventListener('click', determineRatio)
        };
    }, []);
    useEffect(() => {
        const ol = document.getElementsByTagName('ol')[0]
        const presentation = document.getElementsByClassName('presentation')[0];
        function determineRatio() {
            const deducedImg = document.getElementById('deduced-img');
            if (deducedImg) {
                const preserntationRatio = presentation.offsetWidth / presentation.offsetHeight;
                const deducedImgRatio = deducedImg.naturalWidth / deducedImg.naturalHeight;
                if (presentation.offsetWidth > deducedImg.naturalWidth && presentation.offsetHeight > deducedImg.naturalHeight) {
                    deducedImg.style.width = 'auto';
                    deducedImg.style.height = 'auto';

                }else if(presentation.offsetWidth === deducedImg.naturalWidth && presentation.offsetHeight === deducedImg.naturalHeight){
                    deducedImg.style.width = '100%';
                    deducedImg.style.height = '100%';
                } else if (preserntationRatio > deducedImgRatio) {
                    deducedImg.style.width = 'auto';
                    deducedImg.style.height = '100%';

                } else if (preserntationRatio < deducedImgRatio) {
                    deducedImg.style.width = '100%';
                    deducedImg.style.height = 'auto';

                }
            }
        }
        function scrollEv(event){

            const delta = Math.sign(event.deltaY);
            const picture = document.getElementsByClassName('to_deduce_picture');
            if (delta === 1 && idOfDeduce !== -1) {
                    setIdOfDeduce(idOfDeduce === addImg.length - 1 ? idOfDeduce : idOfDeduce + 1 );
                    presentation.style.background = `url("${picture[addImg.length-1 === idOfDeduce ? idOfDeduce : idOfDeduce+1].src}") center/cover no-repeat`
            } else if (delta === -1 && idOfDeduce !== -1) {
                    setIdOfDeduce(idOfDeduce === 0 ? idOfDeduce : idOfDeduce - 1);
                    presentation.style.background = `url("${picture[idOfDeduce === 0 ? idOfDeduce : idOfDeduce-1].src}") center/cover no-repeat`
            }
        }
        determineRatio()
        presentation.addEventListener('wheel', scrollEv)
        return () => {
        presentation.removeEventListener('wheel', scrollEv)
        }
    },[addImg,idOfDeduce])



    return (
        <div className="container">
            <div className="navigation">
                <h1>НАВИГАЦИЯ</h1>
            </div>
            <div className="pictures">
                <h2>Слайды</h2>
                <ol>
                    {
                        addImg.map((file,index) =>
                            <AddImg key={index} picture={file.picture} id={file.id} isFile={true} removeFile={removeFile} title={file.title}/>
                        )
                    }
                    {
                        addImg.length !== 15
                        ?
                        <AddImg picture={page} uploadFile={uploadFile} isFile={false}/>
                        :
                        null
                    }
                </ol>
            </div>
            <ModalImages active={activeModal} setActive={setActiveModal} content={addImg} changeImg={changeImg} changeTitle={changeTitle}/>
            <div className="presentation">
                {
                    idOfDeduce > -1 && isDeleted
                    ?
                    <div className='presentation__blur'>
                        <img src={addImg[idOfDeduce].picture} alt='' id='deduced-img'/>
                    </div>
                    :
                    <h2>Файл не найден</h2>
                }
            </div>
        </div>
    );
    
}

export default App;