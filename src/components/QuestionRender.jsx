import { useState, useEffect } from "react"
import BankInstance from "./Bank"
import { Question } from "./Question"
import UserInstance from "./UserManager"
import '../styles/button.scss'

var quest = BankInstance.getQuestion()

export function QuestionRender(props){

    const [r, setQuestion] = useState(0)
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

    var count= Object.keys(data).length;

    function checkAnswer(answer){
 
        let x = quest.checkAnswer(answer)
    
        if(answer == data[r].correct){
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

        var v = Math.floor((Math.random() * count));
        setQuestion(v +1)
        setAnswer(0);
        setCorrect(0);
        
     }
    

    return(
        <section className = "question">
             <>
             <br />
             <br />
            <h1>Questão {data[r].id}</h1>
            <br />
            <h2>{data[r].body}</h2>
            <br />
            <button type="button" onClick = {() => {checkAnswer(1)}}>{data[r].ans1}</button><br></br>
            <button type="button" onClick = {() => {checkAnswer(2)}}>{data[r].ans2}</button><br></br>
            <button type="button" onClick = {() => {checkAnswer(3)}}>{data[r].ans3}</button><br></br>
            <button type="button" onClick = {() => {checkAnswer(4)}}>{data[r].ans4}</button><br></br>
            <button type="button" onClick = {() => {checkAnswer(5)}}>{data[r].ans5}</button><br></br>
            </>
            
            {quest == 0 &&
            <>
            <h1>Não há questões a serem exibidas.</h1>
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
            <p>A resposta correta é: {data[r].correct} </p><br></br>
            <button type="button" onClick = {() => {getNewQuestion()}}>Nova Questão</button><br></br>
            </>
            }

        </section>
    )
}