import React, { Component } from 'react';
import './Login.css';
import AuthApiService from '../../services/auth-api-service';
import CategoryApiService from '../../services/categories-api-service';
import ItemsApiService from '../../services/items-api-service';
import TokenService from '../../services/token-service';
import BudgetMeContext from '../../context/BudgetMeContext';
import BudgetsApiService from '../../services/budgets-api-service';


export default class Login extends Component {
    static contextType = BudgetMeContext;
    
    constructor(props){        
        super(props)
        this.state={
            error: ''
        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }
    
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside = e => {
        /* Check that we've clicked outside of the container and that it is open */

        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            this.props.cancelLogin();
        };
    }

    handleLogin = e => {
        e.preventDefault()
        this.setState({
            error: null
        })
        const { login_email, login_password } = e.target;
        if(!login_email.value || !login_password.value)
            return this.setState({
                error: 'Enter valid user email and password'
            })

        AuthApiService.postLogin({
            user_email: login_email.value,
            user_password: login_password.value,
        })
            .then(res => {
                TokenService.saveAuthToken(JSON.stringify(res.authToken));
                this.context.setUserId(res.user_id);
                CategoryApiService.getCategories(res.user_id,  (labels) => this.context.setLabels(labels),  (categories) => this.context.setCategories(categories));
                ItemsApiService.getItems(res.user_id,  (values)=> this.context.setBudgetValues(values), this.context.chartData.labels);
                BudgetsApiService.getBudgets(res.user_id, (monthlyBudgets) => this.context.setMonthlyBudgets(monthlyBudgets))
                this.props.cancelLogin();
            })
            .catch(res=> {
                this.setState({
                    error: res.error
                })
            })

        
    }

    render(){
        return(
            <div className="login-container" ref={this.setWrapperRef}>
                <form
                    className='login-form'
                    onSubmit={(e) => this.handleLogin(e)}>
                    <div className="login-form-inputs">
                        <label htmlFor="login_email">Email:</label>
                        <input id='login_email' name='login_email'/>
                    </div>
                    <div className="login-form-inputs">
                        <label htmlFor="login_password">Password:</label>
                        <input type="password" id='login_password' name='login_password'/>
                    </div>
                    <p className="error">{this.state.error}</p>
                    <button className="login-button" type="submit" onSubmit={(e)=>this.handleLogin(e)}>Login</button>
                </form>
            </div>
        )
    }
}