import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import HomePage from '../../routes/HomePage/HomePage';
import BudgetMeContext from '../../context/BudgetMeContext';
import CategoryApiService from '../../services/categories-api-service';
import ItemsApiService from '../../services/items-api-service';

export default class App extends Component {
  static contextType = BudgetMeContext;
  
  componentDidMount(){
    CategoryApiService.getCategories(this.context.user_id,  (labels) => this.context.setLabels(labels));
    ItemsApiService.getItems(this.context.user_id,  (values)=> this.context.setBudgetValues(values), this.context.chartData.labels);

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


