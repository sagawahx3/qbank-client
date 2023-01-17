import { useState, useEffect } from "react"
import BankInstance from "./Bank"
import { Question } from "./Question"
import UserInstance from "./UserManager"
import '../styles/button.scss'

var quest = BankInstance.getQuestion()

export function QuestionRender(props){

    const [answerstate, setAnswer] = useState(0)
    const [iscorrect, setCorrect] = useState(0)

    function checkAnswer(answer){
 
        let x = quest.checkAnswer(answer)
    
        if(x == 1){
            setCorrect(1);
            UserInstance.answeredQuestions.push(quest.id)
            UserInstance.rightQuestions.push(quest.id)
           }
           else if(x == 2){
            UserInstance.answeredQuestions.push(quest.id)
            UserInstance.wrongQuestions.push(quest.id)          
            }

            setAnswer(1)     
     }

     function getNewQuestion(){

        setAnswer(0)
        setCorrect(0);
        quest = BankInstance.getQuestion()

     }
    

    return(
        <section className = "question">
            {quest.id != 0 &&
             <>
             <br />
             <br />
            <h1>Questão {quest.id}</h1>
            <br />
            <h2>{quest.text}</h2>
            <br />
            <button type="button" onClick = {() => {checkAnswer(1)}}>{quest.answer1}</button><br></br>
            <button type="button" onClick = {() => {checkAnswer(2)}}>{quest.answer2}</button><br></br>
            <button type="button" onClick = {() => {checkAnswer(3)}}>{quest.answer3}</button><br></br>
            <button type="button" onClick = {() => {checkAnswer(4)}}>{quest.answer4}</button><br></br>
            </>
            }
            {quest == 0 &&
            <>
            <h1>Não há questões há serem exibidas.</h1>
            </>
           }
            { answerstate == 1 &&
            iscorrect == 1 &&
            <>
            <br></br>
            <p>Resposta correta!</p><br></br>
            <button type="button" onClick = {() => {getNewQuestion()}}>Nova Questão</button><br></br>
            </>
            }
            { answerstate == 1 &&
            iscorrect == 0 &&      
            <>
            <br></br>
            <p>Resposta incorreta!</p><br></br>
            <p>A resposta correta é: {quest.correct} </p><br></br>
            <button type="button" onClick = {() => {getNewQuestion()}}>Nova Questão</button><br></br>
            </>
            }

        </section>
    )
}