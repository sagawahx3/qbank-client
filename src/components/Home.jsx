import { useState, useEffect } from "react"
import BankInstance from "./Bank"
import { Question } from "./Question"

export function HomeRender(props){

    return(
        <section className = "question">
            <br /><br />
            <h1>Question Bank</h1>
            <br /><br />
            <p>- Insira questões do tópico que desejar</p><br />
            <p>- Responda e acerte ou erre</p><br />
            <p>- Acompanhe seu progresso</p>
        </section>
    )
}