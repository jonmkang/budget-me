import React, { Component } from 'react';
import './HomePage.css';
import Header from '../../components/Header/Header';
import "./HomePage.css"
import Chart from '../../components/Chart/Chart';
import BudgetMeContext from '../../context/BudgetMeContext';


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
                <section className='description'>
                    BudgetMe is a free-to-use budgeting web application.  Keep track of your spending by adding it to customizable categories.
                </section>
                <div className='chart-home'>
                    <Chart props={this.context.data}/>
                </div>
                <section className='register'>
                    
                </section>
                
            </div>
            
        )
    }
}