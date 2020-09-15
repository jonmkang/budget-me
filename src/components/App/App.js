import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import HomePage from '../../routes/HomePage/HomePage';
import BudgetMeContext from '../../context/BudgetMeContext';

export default class App extends Component {
  static contextType = BudgetMeContext;
  
  componentDidMount(){
    fetch(`http://localhost:8000/api/categories/`+this.context.user_id, {
      method: "GET",
    })
      .then(
        res => res.json())
      .then(res => 
        {
          const labels = res.map(item => item.category_title)
          this.context.setLabels(labels)
      })

    fetch("http://localhost:8000/api/items/"+this.context.user_id, {
      method: "GET"
    })
      .then(
        res => res.json())
      .then(res => 
        {
          const values_arr = res.map(item => [item.item_name, item.amount, item.category_title])
          this.context.setBudgetValues(values_arr, this.context.chartData.labels)
        }
      )

      this.context.clearError()
      console.log(this.context)
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


