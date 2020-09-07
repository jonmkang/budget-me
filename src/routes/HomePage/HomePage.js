import React, { Component } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import "./HomePage.css"



export default class HomePage extends Component{
    static defaultProps = {
        location: {},
        history: {
          push: () => {},
        },
    }

    render(){
        return(
            <div>
                <Header/>
                <section className='description'>
                    BudgetMe is a free-to-use budgeting web application.  Simply enter your total budget by the month and keep track of your spending by adding it to customizable categories
                </section>
                <div className='home-page-search'>

                </div>
                <section className='register-text'>
                    
                </section>
                
            </div>
            
        )
    }
}