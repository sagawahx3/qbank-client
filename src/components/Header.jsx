import React from 'react'
import { ReactComponentElement } from "react"
import { Link } from 'react-router-dom'
import '../styles/header.scss'
import UserInstance from './UserManager'
import { isAuth } from './auth/AuthTools'
import { cookies } from '../app'

const Header=()=>{

    if (!!cookies.get('token')){

        return(
            <section class="header">
            <ul class="header-ul">
            <li><a><Link to="/">Início</Link></a></li>
            <li><a><Link to="/answer">Responder</Link></a></li>
            <li><a><Link to="/insert">Inserir</Link></a></li>
            <li><a><Link to="/user">Usuário</Link></a></li>
            <li><a><Link to="/logout">Logout</Link></a></li>
            </ul>
            </section>
        )
    }
    else{
                return(
                    <section class="header">
                    <ul class="header-ul">
                    <li><a><Link to="/">Início</Link></a></li>
                    <li><a><Link to="/login">Login</Link></a></li>
                    </ul>
                    </section>
                )
     }
}

export default Header
