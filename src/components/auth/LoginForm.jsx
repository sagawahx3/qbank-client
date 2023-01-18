import React from "react";
import UserInstance from "../UserManager"
import { useState, useEffect } from "react"

class UserAuth{

    username = '';
    password = '';
  
      constructor(username,password){

        this.username = username
        this.password = password
        
      }
  
}

export class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            token: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    
      }
      
    handleSubmit(event){
        event.preventDefault();

    let user = new UserAuth(
        this.state.username, 
        this.state.password, 
        );

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    fetch('http://127.0.0.1:8000/auth/login/', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            UserInstance.token = data.key
            UserInstance.auth = user
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
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
            Usuário
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
              />
          </label>
          <br />
          <br />
          <label>
            Senha
            <input
              name="password"
              type="text"
              value={this.state.password}
              onChange={this.handleChange}
              />
          </label>
          <br />
          <br />
        <input id="button" type="submit" value="Enviar" />
        </form>
        );
    }
}
