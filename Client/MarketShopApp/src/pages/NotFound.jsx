import React from 'react'
import "@styles/NotFound.scss"
//import "./404.js"

const NotFound = () => {
    return (
        <div className='body404'>
            <a href="/" className='exit404'>
                <svg height="0.8em" width="0.8em" viewBox="0 0 2 1" preserveAspectRatio="none">
                    <polyline
                        fill="none"
                        stroke="#777777"
                        stroke-width="0.1"
                        points="0.9,0.1 0.1,0.5 0.9,0.9"
                    />
                </svg> Inicio
            </a>
            <div className="background-wrapper">
                <h1 id="visual" className='title404'>Err:404</h1>
            </div>
            <p className='text404'>Pagina o ruta no encontrada</p>
        </div>
    )
}
export default NotFound