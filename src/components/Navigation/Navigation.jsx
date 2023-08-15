import React from 'react';
import './Navigation.css'

function Navigation({children}) {
    return (
        <div className="navigation">
            {children}
        </div>
    );
}

export default Navigation;