import { useState, useEffect } from "react"
import  BankInstance  from "./Bank"
import { Question } from "./Question"
import React from "react";
import Progress from 'react-progressbar';

let instance;

class User{

  answeredQuestions = []
  rightQuestions = []
  wrongQuestions = []


    constructor(){
      if(instance)
      throw new Error("Cannot create a new instance of this class")

      instance = this;
    }

}

const UserInstance = new User();

export default UserInstance;

export class UserManager extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        totalQuestions: UserInstance.answeredQuestions.length,
        rightAnswered: UserInstance.rightQuestions.length,
        wrongAnswered: UserInstance.wrongQuestions.length,
      };
  
    }
  
    render() {
      return (
        <>
        <br />
        <br />
        <p>Questões registradas: {(BankInstance.id -1)}</p>
        <br />
        <br />
        <p>Respostas totais: {this.state.totalQuestions}</p>
        <br />
        <>
        <h1>Taxa de acerto: {(this.state.rightAnswered/this.state.totalQuestions) *100}%</h1>
        <br />
        <div id="progressbar">
        <Progress completed= {(this.state.rightAnswered/this.state.totalQuestions) *100} />
        </div>
        </>

        </>
      );
    }
  }
