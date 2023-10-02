import React from 'react';
import './AddImg.css'
import { useEffect, useState } from 'react';

function AddImg({picture, uploadFile, isFile, removeFile, id, title,fetchImages}) {
    return (
        <div className="pictures__margin">
            <li className="pictures__numbers flex-center">
                <img className='card-picture' src={picture} alt=""/>
                <div className="card-blur">
                    { isFile ? <p className='pictures__unknown-file'>{title}</p> : <p className="pictures__upload-file">Загрузить</p> }
                    {
                        isFile
                        ?
                        <p className='pictures__uploaded-picture'></p>
                        :
                        <input className='pictures__upload-picture' type="file" onChange={uploadFile} accept="image/*" value='' title="Загрузить файл"/>
                    }
                </div>
                {
                    isFile
                    ?
                    <div className='card-settings'>
                        <button className='pictures__change-picture card-button' id={id} translate="no">Изменить</button>
                        <button className='pictures__delete-picture card-button' id={id} onClick={removeFile} translate="no">Удалить</button>
                    </div>
                    :
                    null
                }
            </li>
        </div>
    );
}

export default AddImg;