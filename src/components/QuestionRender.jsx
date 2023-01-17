import { useState, useEffect } from "react"
import BankInstance from "./Bank"
import { Question } from "./Question"
import UserInstance from "./UserManager"
import '../styles/button.scss'

var quest = BankInstance.getQuestion()

export function QuestionRender(props){
    
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answerstate, setAnswer] = useState(0)
    const [iscorrect, setCorrect] = useState(0)

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/question/')
        .then(response =>{
            if(response.ok){
                return response.json()
            }
            throw response;
        })
        .then( data=> {
            setData(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            setError(error)
        })
        .finally(()=>{
            setLoading(false);
        })
    }, [])


    if(loading) return "Loading...";

    if(error) return "Error!";

    console.log(data)

    console.log(data[0].id)


    function checkAnswer(answer){
 
        let x = quest.checkAnswer(answer)
    
        if(answer == data[0].correct){
            setCorrect(1);
            UserInstance.answeredQuestions.push(quest.id)
            UserInstance.rightQuestions.push(quest.id)
           }
           else {
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
             <>
             <br />
             <br />
            <h1>Questão {data[0].id}</h1>
            <br />
            <h2>{data[0].body}</h2>
            <br />
            <button type="button" onClick = {() => {checkAnswer(1)}}>{data[0].ans1}</button><br></br>
            <button type="button" onClick = {() => {checkAnswer(2)}}>{data[0].ans2}</button><br></br>
            <button type="button" onClick = {() => {checkAnswer(3)}}>{data[0].ans3}</button><br></br>
            <button type="button" onClick = {() => {checkAnswer(4)}}>{data[0].ans4}</button><br></br>
            <button type="button" onClick = {() => {checkAnswer(5)}}>{data[0].ans5}</button><br></br>
            </>
            
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
            <p>A resposta correta é: {data[0].correct} </p><br></br>
            <button type="button" onClick = {() => {getNewQuestion()}}>Nova Questão</button><br></br>
            </>
            }

        </section>
    )
}