import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import HomePage from '../../routes/HomePage/HomePage';
import BudgetMeContext from '../../context/BudgetMeContext';
import CategoryApiService from '../../services/categories-api-service';
import ItemsApiService from '../../services/items-api-service';
import config from '../../config';
import BudgetsApiService from '../../services/budgets-api-service';

export default class App extends Component {
  static contextType = BudgetMeContext;
  
  componentDidMount(){
    const user_id = window.sessionStorage.getItem(config.USER_ID) ? window.sessionStorage.getItem(config.USER_ID) : 1;
    this.context.setUserId(user_id);

    CategoryApiService.getCategories(user_id,  (labels) => this.context.setLabels(labels),  (categories) => this.context.setCategories(categories));
    BudgetsApiService.getBudgets(user_id, (monthlyBudgets) => this.context.setMonthlyBudgets(monthlyBudgets))
    ItemsApiService.getItems(user_id,  (values)=> this.context.setBudgetValues(values), this.context.chartData.labels);
    this.context.clearError()
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


