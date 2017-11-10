import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class error404Page extends Component{
    render(){
        return(
            <div>
                <p>404</p>
                <Link to={'/'}>retour à l'accueil</Link>
            </div>

        )
    }
}

export default error404Page;