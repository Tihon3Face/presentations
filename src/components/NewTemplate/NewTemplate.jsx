import React from 'react';
import AddImg from '../olSystem/AddImg';
import ModalImages from '../ModalSystem/ModalImages';
import './NewTemplate.css';
import { useEffect, useState } from 'react';
import page from '../../images/page.png'
import up from '../../images/up.png'
import down  from '../../images/down.png'

function NewTemplate() {
    useEffect(() => {
        // const upload = document.getElementsByClassName('pictures__upload-btn');
        const inputs = document.getElementsByClassName('pictures__upload-picture');
        const ol = document.querySelector('ol');
        const pUpload = document.getElementsByClassName('pictures__upload-file');
        const pUnknown = document.getElementsByClassName('pictures__unknown-file');
        const uploaded = document.getElementsByClassName('pictures__uploaded-picture');
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


    // Основные переменные:
    // addImg - массив с уникальным id, картинкой и названием
    // background - фон за выведенной картинкой
    // deduceIndex - индекс выведенной картинки
    // isDeleted - нужно для совместного использования с deduceIndex, когда false - элемент не выведен, true - выведен 
    // (deduceIndex > -1 && isDeleted) - проверяет выведена ли картинка
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

    
    const [background,setBackground] = useState()
    const [deduceIndex,setDeduceIndex] = useState(-1);
    const [isDeleted,setIsDeleted] = useState(true);
    useEffect(() => {
        const ol = document.getElementsByTagName('ol')[0];
        const uploaded = document.getElementsByClassName('pictures__uploaded-picture');
        const picture = document.getElementsByClassName('pictures__picture');
        function funcDeduce (e) {
            [...uploaded].forEach((item,index) => {
                if(item === e.target){
                    setDeduceIndex(index);
                    setIsDeleted(true);
                    setBackground(`url("${picture[index].src}") center/cover no-repeat`);
                }
            })
        }
        ol.addEventListener('click', funcDeduce)

        return () => {
            ol.removeEventListener('click', funcDeduce)

        }
    },[addImg])
    function removeFile (e) {
        setAddImg((prevFiles) => {
            prevFiles = prevFiles.filter((prevFile) => prevFile.id !== Number(e.target.id))
            return prevFiles
        });
        const picture = document.getElementsByClassName('pictures__picture');
        if(deduceIndex > -1 && isDeleted){
            if(addImg[deduceIndex].id === Number(e.target.id)){
                if(deduceIndex === 0){
                    if(addImg.length === 1){
                        setBackground(`none`);
                        setIsDeleted(false)
                    }else{
                        setBackground(`url("${picture[deduceIndex+1].src}") center/cover`);
                        setDeduceIndex(deduceIndex)
                    }
                }else{
                    setBackground(`url("${picture[deduceIndex-1].src}") center/cover`);
                    setDeduceIndex(deduceIndex-1)
                }
            }else if(addImg[deduceIndex].id !== Number(e.target.id)){
                let compareElem = addImg.findIndex(item => item.id === Number(e.target.id))
                if(compareElem > deduceIndex){
                    setBackground(`url("${picture[deduceIndex].src}") center/cover`);
                    setDeduceIndex(deduceIndex)
                }else{
                    setBackground(`url("${picture[deduceIndex].src}") center/cover`);
                    setDeduceIndex(deduceIndex-1)
                }
            }
        }
    };



    const [activeModal,setActiveModal] = useState(false);
    useEffect(() => {
        const modalBtns = document.getElementsByClassName('pictures__change-picture');
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
        if((deduceIndex > -1 && isDeleted) && deduceIndex === addImg.findIndex(item => item.id === content.id)){
            setBackground(`url("${newImg}") center/cover`);
        }
    }
    function changeTitle (content,newValue,setActive) {
        addImg.splice(addImg.findIndex(item => Number(content.id) === item.id),1,{id:content.id,title:newValue,picture:content.picture})
        setActive(false)
    }



    function determineRatio() {
        const deducedImg = document.getElementsByClassName('presentation__deduced-img')[0];
        const presentation = document.getElementsByClassName('presentation')[0];
        if (deducedImg) {
            const preserntationRatio = presentation.offsetWidth / presentation.offsetHeight;
            const deducedImgRatio = deducedImg.naturalWidth / deducedImg.naturalHeight;
            if (presentation.offsetWidth === deducedImg.naturalWidth && presentation.offsetHeight === deducedImg.naturalHeight) {
                deducedImg.style.width = '100%';
                deducedImg.style.height = '100%';
                // deducedImg.style.border = '0px'
            }else if(presentation.offsetWidth > deducedImg.naturalWidth && presentation.offsetHeight > deducedImg.naturalHeight){
                deducedImg.style.width = 'auto';
                deducedImg.style.height = 'auto';
                // deducedImg.style.border = '2px solid white';
            } else if (preserntationRatio > deducedImgRatio) {
                deducedImg.style.width = 'auto';
                deducedImg.style.height = '100%';
                // deducedImg.style.borderRight = '2px solid white';
                // deducedImg.style.borderLeft = '2px solid white';
                // deducedImg.style.borderTop = '0';
                // deducedImg.style.borderBottom = '0';
            } else if (preserntationRatio < deducedImgRatio) {
                deducedImg.style.width = '100%';
                deducedImg.style.height = 'auto';
                // deducedImg.style.borderTop = '2px solid white';
                // deducedImg.style.borderBottom = '2px solid white';
                // deducedImg.style.borderRight = '0';
                // deducedImg.style.borderLeft = '0';
            }
        }
    }
    useEffect(() => {
        const ol = document.getElementsByTagName('ol')[0]
        determineRatio()
        window.addEventListener('mouseover', determineRatio)
        window.addEventListener('resize', determineRatio)
        ol.addEventListener('click', determineRatio)
        return () => {
            window.removeEventListener('mouseover', determineRatio)
            window.removeEventListener('resize', determineRatio)
            ol.removeEventListener('click', determineRatio)
        };
    }, [determineRatio]);
    function scrollEv(event){
        const presentation = document.getElementsByClassName('presentation')[0];
        if(event.target.closest('.presentation') === presentation){
            const delta = Math.sign(event.deltaY);
            const picture = document.getElementsByClassName('pictures__picture');
            if (delta === 1 && deduceIndex !== -1) {
                setDeduceIndex(deduceIndex === addImg.length - 1 ? deduceIndex : deduceIndex + 1 );
                setBackground(`url("${picture[addImg.length-1 === deduceIndex ? deduceIndex : deduceIndex+1].src}") center/cover no-repeat`);
            } else if (delta === -1 && deduceIndex !== -1) {
                setDeduceIndex(deduceIndex === 0 ? deduceIndex : deduceIndex - 1);
                setBackground(`url("${picture[deduceIndex === 0 ? deduceIndex : deduceIndex - 1].src}") center/cover no-repeat`)
            }
        }
    }
    useEffect(() => {
        determineRatio()
        window.addEventListener('wheel', scrollEv)
        return () => {
            window.removeEventListener('wheel', scrollEv)
        }
    },[scrollEv])
    function getTransition (event) {
        const transitionElems = document.getElementsByClassName('presentation__transbtn');
        const picture = document.getElementsByClassName('pictures__picture');
        console.log(picture)
        if(event.target.closest('.presentation__transbtn') === transitionElems[0]){
            setDeduceIndex(deduceIndex === 0 ? deduceIndex : deduceIndex - 1);
            setBackground(`url("${picture[deduceIndex === 0 ? deduceIndex : deduceIndex-1].src}") center/cover no-repeat`)
        }else if(event.target.closest('.presentation__transbtn') === transitionElems[1]){
            setDeduceIndex(deduceIndex === addImg.length - 1 ? deduceIndex : deduceIndex + 1 );
            setBackground(`url("${picture[addImg.length-1 === deduceIndex ? deduceIndex : deduceIndex+1].src}") center/cover no-repeat`);
        }
    }
    useEffect(() => {
        const transitionParent = document.getElementsByClassName('presentation__updown')[0];
        
        if(deduceIndex > -1 && isDeleted){
            transitionParent.style.transform = 'scale(1)'
        }else{
            transitionParent.style.transform = 'scale(0)'
        }
        transitionParent.addEventListener('click', getTransition);
        return () => {
            transitionParent.removeEventListener('click', getTransition);
        }
    },[getTransition])

    return (
        <div className="container">
            <div className="pictures margin-top">
                <h2 className='pictures__h2'>Слайды</h2>
                <ol className='pictures__ol'>

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
            <div className="presentation" style={{background:background}}>
                {
                    deduceIndex > -1 && isDeleted
                    ?
                    addImg.map((item,index) => {
                        if(index === deduceIndex){
                        return  <div className='presentation__backblur'>
                                    <img className='presentation__deduced-img' src={addImg[deduceIndex].picture} alt=''/>
                                </div>
                        }else{
                            return;
                        }
                    })
                    :
                    <h2>Файл не найден</h2>
                }
                <div className='presentation__updown'>
                    <div className='presentation__transbtn'><img src={up} alt=''/></div>
                    <div className='presentation__transbtn'><img src={down} alt=''/></div>
                </div>
            </div>
        </div>
    );
    
}

export default NewTemplate;