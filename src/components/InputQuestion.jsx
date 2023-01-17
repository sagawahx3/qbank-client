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

          BankInstance.addQuestion(
            this.state.questionText, 
            this.state.answer1, 
            this.state.answer2, 
            this.state.answer3, 
            this.state.answer4,
            this.state.correctAnswer
            )
            
            alert('Questão ' + ((BankInstance.id) - 1) + ' adicionada com sucesso!');
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
          Resposta correta:
          <select name="correctAnswer" value={this.state.correctAnswer} onChange={this.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>
        <br />
          <br />
        <input id="button" type="submit" value="Enviar" />
        </form>
      );
    }
  }
