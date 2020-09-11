import React, { Component } from 'react';
import "./Header.css"

export default class Header extends Component{
    

    render(){
        return (
            <div className="header">   
                <h2>BudgetMe</h2>
                <div className="auth">
                    <button className="auth-button" type="button">Login</button>
                    <button className="auth-button" type="button">Register</button>
                </div>
            </div>
        )
    }
}