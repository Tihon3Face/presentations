import React,{useState} from 'react';
import './ModalImages.css';
import ModalImg from './ModalImg';

function ModalImages({active,setActive,content,changeImg,changeTitle}) {
    return (
        <div className='containter'>
            {
                content.map((item,index) => {
                    if(item['id'] === Number(active.ide)){
                        return <ModalImg active={true} setActive={setActive} content={item} key={index} changeImg={changeImg} changeTitle={changeTitle}/>;
                    }
                    return;
                })
            }
        </div>
    );
}

export default ModalImages;