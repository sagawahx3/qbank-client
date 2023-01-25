import React from "react";
import UserInstance from "../UserManager"
import { useState, useEffect } from "react"
import { redirect, useNavigate } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { cookies } from "../../app";

export class UserAuth{

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
            username: cookies.get('username') || null,
            password: '',
            token: cookies.get('token') || null,
            wrongPassword: false

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
        headers: { 
        'Content-Type': 'application/json', 
        "Access-Control-Allow-Origin": "true"
        },
        body: JSON.stringify(user),
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

            cookies.set('token', data.key, { path: '/' });
            cookies.set('username', this.state.username, { path: '/' });

            window.location.href = 'http://localhost:8080/';

        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
            this.state.wrongPassword = true;

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
          <div>

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
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              />
          </label>
          <br />
          <br />
        <input id="button" type="submit" value="Enviar" />
        </form>
        {this.state.wrongPassword &&
            <>
            <p>Dados inválidos.</p>
            </>
           }
        </div>        
        );
    }
}

export default withCookies(LoginForm);
