import React,{useState,useEffect} from 'react';

function ModalImg({active,setActive,content,changeImg,changeTitle}) {
    useEffect(() => {
        const btnChange = document.getElementsByClassName('modal-windows__change-title-btn')[0];
        function funcPrev (e) {
            e.preventDefault()
        }
        btnChange.addEventListener('click', funcPrev)
        return () => {
            btnChange.removeEventListener('click', funcPrev)
        }
    },[])
    const [inputText, setInputText] = useState('');
    function changeFile(event){
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            if((file.type).includes('image')){
                changeImg(content,reader.result,setActive)
            }else{
                alert('Вы не можете загружать какой-либо файл, кроме картинки.');
            }
        }
    }
    return (
        <div className={active ? 'modal-windows__settings active_1' : 'modal-windows__settings'} onClick={() => setActive(false)}>
            <div className={active ? 'modal-windows__window active_2': 'modal-windows__window'} onClick={(e) => e.stopPropagation()}>
                <div className="modal-windows__flex">
                    <h2 className='modal-windows__modal-name'>Настройки</h2>
                    <form action="#" className='modal-windows__common-form'>
                        <div className='modal-windows__change-title-form'>
                            <label htmlFor='title'>Поменять название</label>
                            <div>
                                <input 
                                    type="text"
                                    className='modal-windows__set-title'
                                    placeholder={
                                        content.title === ''
                                        ?
                                        'Без имени'
                                        :
                                        content.title
                                    }
                                    value={inputText}
                                    maxLength={12}
                                    onChange={(e) => 
                                        setInputText(e.target.value)
                                    }
                                />
                                <button 
                                    className='modal-windows__change-title-btn' 
                                    onClick={(e) => 
                                        inputText.split(' ').join('') === ''
                                        ?
                                        changeTitle(content,'Без имени',setActive,e)
                                        :
                                        changeTitle(content,inputText,setActive,e)
                                    }
                                >Изменить</button>
                            </div>
                        </div>
                        <div className='modal-windows__change-img-form'>
                            <label htmlFor='change'>Поменять изображение</label>
                            <img className='modal-windows__change-icon' src="https://628d592dcf7ea9001ed030c9.storage.yandexcloud.net/9a08b444-06c9-47b1-86b7-b6344d235ac7.png" alt="" />
                            <input type="file" accept='image/*' className='modal-windows__set-img' id='change' title='Поменять изображение' onChange={changeFile} key={content.id}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalImg;