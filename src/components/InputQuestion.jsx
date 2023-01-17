import { useState, useEffect } from "react"
import  BankInstance  from "./Bank"
import { Question } from "./Question"
import React from "react";
import '../styles/button.scss'
import '../styles/text.scss'

export class QuestionForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        questionText: 'Insira o corpo da questão aqui',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: '',
        correctAnswer: '1'
      };
  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        const target = event.target;
        const value = target.value;

        const name = target.name;

        this.setState({
            [name]: value
          });

          let quest = new Question(this.state.questionText, 
            this.state.answer1, 
            this.state.answer2, 
            this.state.answer3, 
            this.state.answer4, 
            this.state.answer5, 
            this.state.correctAnswer);

          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quest)
        };
        fetch('http://127.0.0.1:8000/question/', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
    
                this.setState({ postId: data.id })
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });

          //BankInstance.addQuestion(
           // this.state.questionText, 
          //  this.state.answer1, 
          //  this.state.answer2, 
          //  this.state.answer3, 
          //  this.state.answer4,
          //  this.state.correctAnswer
          //  )
            
            alert('Questão adicionada com sucesso!');
    }

    handleChange(event) {
      event.preventDefault();
      const target = event.target;
      const value = target.value;

      const name = target.name;

      this.setState({
        [name]: value
      });    
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
                    <br />
                    <br />
        <label>
            Questão:
            <input
            id="questionbox"
              name="questionText"
              type="text"
              value={this.state.questionText}
              onChange={this.handleChange}
              />
          </label>
          <br />
          <br />
          <label>
            Resposta 1:
            <input
              name="answer1"
              type="text"
              value={this.state.answer1}
              onChange={this.handleChange}
              />
          </label>
          <br />
          <br />
          <label>
            Resposta 2:
            <input
              name="answer2"
              type="text"
              value={this.state.answer2}
              onChange={this.handleChange}
              />
          </label>
          <br />
          <br />
          <label>
            Resposta 3:
            <input
              name="answer3"
              type="text"
              value={this.state.answer3}
              onChange={this.handleChange}
              />
          </label>
          <br />
          <br />
          <label>
            Resposta 4:
            <input
              name="answer4"
              type="text"
              value={this.state.answer4}
              onChange={this.handleChange}
              />
          </label>
          <br />
          <br />
          <label>
            Resposta 5:
            <input
              name="answer5"
              type="text"
              value={this.state.answer5}
              onChange={this.handleChange}
              />
          </label>
          <br />
          <br />
          <label>
          Resposta correta:
          <select name="correctAnswer" value={this.state.correctAnswer} onChange={this.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <br />
          <br />
        <input id="button" type="submit" value="Enviar" />
        </form>
      );
    }
  }
