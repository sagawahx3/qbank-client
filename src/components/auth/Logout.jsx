import React from 'react'
import { render } from 'react-dom';
import {useEffect, useState, setState } from 'react'


export function Logout(props){

    const [error, setError] = useState(null);


      useEffect(() => {      
    
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            token: localStorage.token
        };
        fetch('http://127.0.0.1:8000/auth/logout/', requestOptions)
            .then(async response => {
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
    
                localStorage.clear()
                window.location.href = 'http://localhost:8080/';
    
            })
            .catch(error => {
                console.error('There was an error!', error);
                window.location.href = 'http://localhost:8080/';

            });
    

        }, []);

        return (
            <div>
            <p>Saindo...</p>
            </div>
        )
    
}