import React, { Component } from 'react';
import "./Header.css"
import BudgetMeContext from '../../context/BudgetMeContext';
import TokenService from '../../services/token-service';
import CategoryApiService from '../../services/categories-api-service';
import ItemsApiService from '../../services/items-api-service';

import Login from '../Login/Login';
import Register from '../Register/Register';
import BudgetBar from '../BudgetBar/BudgetBar';

export default class Header extends Component{
    static contextType = BudgetMeContext;

    constructor(){
        super()
        this.state={
            login: false,
            register: false,
            editBudgets: false
        }
    }

    handleLoginButton = () => {
        const login = !this.state.login;
        this.setState({
            login,
            register: false,
            editBudgets: false
        })
    }

    handleRegisterButton = () => {
        const register = !this.state.register;
        this.setState({
            register,
            login: false,
            editBudgets: false
        })
    }

    handleEditBudgetsButton = () => {
        const editBudgets = !this.state.editBudgets;
        this.setState({
            editBudgets,
            register: false,
            login: false
        })
    }

    cancelLogin = () => {
        this.setState({
            login: false
        })
    }

    cancelRegister = () => {
        this.setState({
            register: false
        })
    }

    cancelEditBudget = () => {
        this.setState({
            editBudgets: false
        })
    }

    handleLogoutClick = () => {
        this.context.clearUserId();
        TokenService.clearAuthToken();
        CategoryApiService.getCategories(1,  (labels) => this.context.setLabels(labels),  (categories) => this.context.setCategories(categories));
        ItemsApiService.getItems(1,  (values)=> this.context.setBudgetValues(values), this.context.chartData.labels);
    }

    render(){
        return (
            <div className="header">   
                <h2>BudgetMe</h2>
                
                {TokenService.hasAuthToken() ?
                    <div className="auth">
                        <button className="auth-button" type="button" onClick={()=>this.handleEditBudgetsButton()}>Set Budgets</button>
                        <button className="auth-button" type="button" onClick={()=>this.handleLogoutClick()}>Logout</button>
                    </div>
                :    
                <div className="auth">
                    <button className="auth-button" type="button" onClick={()=>this.handleEditBudgetsButton()}>Set Budgets</button>
                    <button className="auth-button" type="button" onClick={()=>this.handleLoginButton()}>Login</button>
                    <button className="auth-button" type="button" onClick={()=>this.handleRegisterButton()}>Register</button>
                </div>
                }
                {this.state.editBudgets && <BudgetBar cancelEditBudget={()=>this.cancelEditBudget()}/>}
                {this.state.login && <Login cancelLogin={()=>this.cancelLogin()}/>}
                {this.state.register && <Register cancelRegister={()=>this.cancelRegister()} />}
            </div>
        )
    }
}