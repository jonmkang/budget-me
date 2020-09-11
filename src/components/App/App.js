import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import HomePage from '../../routes/HomePage/HomePage';
import BudgetMeContext from '../../context/BudgetMeContext';

export default class App extends Component {
  static contextType = BudgetMeContext;
  
  componentDidMount(){
      this.context.clearError()
      this.context.setData({
        chartData: {
          labels: ['Restaurants', 'Bills', 'Groceries', 'Pet Supplies', 'Leftover Budget', 'Investments'],
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [65, 59, 80, 81, 40, 22]
            }
          ]
      },
      currentCategory: { name: 'Total', amount: 347,  index: null }
    })
  }


  render(){
    return (
      <div className="App">
        <Switch>
          <Route component={HomePage}></Route>
        </Switch>
      </div>
    );
  }
}


