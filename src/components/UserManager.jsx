import { useState, useEffect } from "react"
import  BankInstance  from "./Bank"
import { Question } from "./Question"
import React from "react";
import Progress from 'react-progressbar';
import { cookies } from "../app";
import { UserAuth } from "./auth/LoginForm";

let instance;

class User{

  auth = null
  token = null;
  answeredQuestions = []
  rightQuestions = []
  wrongQuestions = []


    constructor(){
      if(instance)
      throw new Error("Cannot create a new instance of this class")

      instance = this;
    }

    getToken(){
      return this.token
    }

}

const UserInstance = new User();

export default UserInstance;

export class UserManager extends React.Component {

  wrongAns = 0


    constructor(props) {
      super(props);

      this.state = {
        isFetching: false,
        username: cookies.get('username') || null,
        totalQuestions: 0,
        rightAnswered: 0,
        wrongAnswered: 0,
        token: cookies.get('token') || null,
        data: null,
        userinfo: {wrongAns: 0},
        error: null,
        loading: true
      };

  
      
    }

componentDidMount() {
  console.log("fetching")
  this.state.isFetching = true
      let user = new UserAuth(
        this.state.username
        );

        const requestOptions = {
          method: 'GET',
          headers: { 
            'Authorization': `Token `+ this.state.token,
          },
      };

      console.log(requestOptions.headers.Authorization)
        fetch('http://127.0.0.1:8000/auth/user/', requestOptions)
        .then(response =>{
            if(response.ok){
                return response.json()
            }
            throw response;
        })
        .then( data=> {
            this.state.data = data
            console.log(data)

            fetch(`http://127.0.0.1:8000/userdata/first/?username=${this.state.username}`, requestOptions2)
        .then(response =>{
            if(response.ok){
                return response.json()
            }
            throw response;
        })
        .then( data=> {
            this.setState({userinfo: data, isFetching: false})
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            this.state.error = error
        })
        .finally(()=>{
            this.state.loading = false
        })

        })
        .catch(error => {
            console.error("Error fetching data:", error);
            this.state.error = error
        })
        .finally(()=>{
            this.state.loading = false
        })

       const requestOptions2 = {
          method: 'GET',
          headers: { 
            'Authorization': `Token `+ this.state.token,
          },
      };

  }
    
  
    render() {
      

      if(!this.state.token){
        return(
          <p>?? necess??rio realizar o login.</p>
        );
      }
      return (
        <>
        <br />
        <br />
        <p>Usu??rio: {this.state.username}</p>
        <br />
        <br />
        <p>Respostas totais: {this.state.userinfo.wrongAns}</p>
        <br />
        <>
        <h1>Taxa de acerto: {(this.state.rightAnswered/this.state.totalQuestions) *100}%</h1>
        <br />
        <p>{this.state.isFetching ? 'Fetching data...' : ''}</p>
        <div id="progressbar">
        <Progress completed= {(this.state.rightAnswered/this.state.totalQuestions) *100} />
        </div>
        </>

        </>
      );
    }
  }
