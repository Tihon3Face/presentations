import React, { useEffect } from 'react';
import './HomePageProject.css'

function HomePageProject({picture,isProject,title,createProject}) {


    return (
                
            <div className="card-board flex-center">
                <img className='card-picture' src={picture} alt="" style={isProject ? null : {width:'50px',height:'50px'}}/>
                { 
                    isProject
                    ?
                    <div className="card-blur">
                        <p className='pictures__upload-file'>{title}</p>
                        <p className='pictures__uploaded-picture'></p>
                    </div>
                    :
                    null
                }
                { 
                    isProject
                    ?
                    <div className='card-settings'>
                            <button className='projects__change-project card-button' translate="no">Изменить</button>
                            <button className='projects__delete-project card-button' translate="no">Удалить</button>
                    </div>
                    :
                    <div className='card-settings'>
                        <button className='projects__add-project card-button' translate="no" onClick={() => createProject()}>Добавить проект</button>
                    </div>
                }
            </div>
    );
}

export default HomePageProject;