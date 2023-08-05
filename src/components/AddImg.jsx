import React from 'react';
import './AddImg.css'
import { useEffect, useState } from 'react';

function AddImg({picture, uploadFile, isFile, removeFile, id, title}) {
    return (
            <div className="pictures__margin">
                <li key={id}></li>
                <div className="pictures__board">
                    <img className='to_deduce_picture' src={picture} alt=""/>
                    <div className="pictures__upload">
                        {isFile ? <p className='unknown'>{title}</p> : <p className="upload">Загрузить</p>}
                        {
                            isFile
                            ?
                            <p className='uploaded__picture'></p>
                            :
                            <input className='upload__picture' type="file" id='uplf' onChange={uploadFile} accept="image/*" value='' title="Загрузить файл"/>
                        }
                    </div>
                    {
                        isFile
                        ?
                        <div className='pictures__upload__settings'>
                            <button className='change__picture' id={id} translate="no">Изменить</button>
                            <button className='delete__picture' id={id} onClick={removeFile} translate="no">Удалить</button>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
    );
}

export default AddImg;