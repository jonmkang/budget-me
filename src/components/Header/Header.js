import React, { Component } from 'react';
import "./Header.css"
import Menu from '../Menu/Menu'

export default class Header extends Component{
    

    render(){
        return (
            <div className="header">   
                <Menu/>
                <h2>BudgetMe</h2>
            </div>
        )
    }
}