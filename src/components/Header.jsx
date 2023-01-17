import React from 'react'
import { ReactComponentElement } from "react"
import { Link } from 'react-router-dom'
import '../styles/header.scss'

const Header=()=>{

    return(
        <section class="header">
        <ul className="header-ul">
        <li><a><Link to="/">Início</Link></a></li>
        <li><a><Link to="/answer">Responder</Link></a></li>
        <li><a><Link to="/insert">Inserir</Link></a></li>
        <li><a><Link to="/user">Usuário</Link></a></li>
        </ul>
        </section>
    )
}

export default Header
