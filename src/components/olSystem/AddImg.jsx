import React from 'react';
import './AddImg.css'
import { useEffect, useState } from 'react';

function AddImg({picture, uploadFile, isFile, removeFile, id, title}) {
    return (
            <div className="pictures__margin">
                <li className="pictures__board">
                    <img className='pictures__picture' src={picture} alt=""/>
                    <div className="pictures__upload-btn">
                        {isFile ? <p className='pictures__unknown-file'>{title}</p> : <p className="pictures__upload-file">Загрузить</p>}
                        {
                            isFile
                            ?
                            <p className='pictures__uploaded-picture'></p>
                            :
                            <input className='pictures__upload-picture' type="file" onChange={uploadFile} accept="image/*" key={Date.now()} title="Загрузить файл"/>
                        }
                    </div>
                    {
                        isFile
                        ?
                        <div className='pictures__settings'>
                            <button className='pictures__change-picture' id={id} translate="no">Изменить</button>
                            <button className='pictures__delete-picture' id={id} onClick={removeFile} translate="no">Удалить</button>
                        </div>
                        :
                        null
                    }
                </li>
            </div>
    );
}

export default AddImg;