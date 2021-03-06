import React, { Component } from 'react';
import './HomePage.css';
import Header from '../../components/Header/Header';
import "./HomePage.css"
import Chart from '../../components/Chart/Chart';
import BudgetMeContext from '../../context/BudgetMeContext';
import TokenService from '../../services/token-service';


export default class HomePage extends Component{
    static contextType = BudgetMeContext;
    static defaultProps = {
        location: {},
        history: {
          push: () => {},
        },
    }

    render(){
        return(
            <div className="background">
                <Header/>
                {
                    TokenService.hasAuthToken() ? 
                <section className='description'>
                    Welcome to BudgetMe! Please use this application for your own use.  If you have any ideas for improvement please email me at jon.m.kang@gmail.com
                </section>
                    :
                <section className='description'>
                    BudgetMe is a free-to-use budgeting web application.  Keep track of your spending by adding it to customizable categories.  This demo can be used for public use.  Please register to keep track of your own private budget.
                </section>
                }
                <div className='chart-home'>
                    <Chart props={this.context.data}/>
                </div>
            </div>
            
        )
    }
}