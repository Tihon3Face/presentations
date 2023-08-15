import React,{useState,useEffect} from 'react';

function ModalImg({active,setActive,content,changeImg,changeTitle}) {
    useEffect(() => {
        const btnChange = document.getElementById('title-change');
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
            <div className={active ? 'settings__window active_2': 'settings__window'} onClick={(e) => e.stopPropagation()}>
                <div className="settings__window__flex">
                    <h2>Настройки</h2>
                    <form action="#">
                        <div className='settings__window__flex__title'>
                            <label htmlFor='title'>Поменять название</label>
                            <div>
                                <input type="text" id='title' placeholder={content.title === '' ? 'Без имени' : content.title} value={inputText} onChange={(e) => setInputText(e.target.value)} maxLength={12}/>
                                <button id='title-change' className='fkjmgfjsd' onClick={(e) => inputText.split(' ').join('') === '' ? changeTitle(content,'Без имени',setActive,e) : changeTitle(content,inputText,setActive,e)}>Изменить</button>
                            </div>
                        </div>
                        <div className='settings__window__flex__change'>
                            <label htmlFor='change'>Поменять изображение</label>
                            <img src="https://628d592dcf7ea9001ed030c9.storage.yandexcloud.net/9a08b444-06c9-47b1-86b7-b6344d235ac7.png" alt="" />
                            <input type="file" accept='image/*' id='change' title='Поменять изображение' onChange={changeFile} key={content.id}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalImg;