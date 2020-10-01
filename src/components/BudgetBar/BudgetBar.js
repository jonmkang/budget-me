import React, { Component } from 'react';
import BudgetMeContext from '../../context/BudgetMeContext';
import BudgetsApiService from '../../services/budgets-api-service';

import BudgetItem from '../BudgetItem/BudgetItem';

import './BudgetBar.css';

export default class BudgetBar extends Component {
    static contextType = BudgetMeContext;
    
    constructor(props){        
        super(props)
        this.state={
            error: '',
            addBudget: false,
            editBudgetItem: false
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

    //this handle clicks for individual budget items
    handleOutsideClick = () => {
        this.setState({
            editBudgetItem: false
        });
    }

    handleEditBudgetItem = () => {
        const editBudgetItem = !this.state.editBudgetItem;
        this.setState({
            editBudgetItem
        });
    }

    //this handles clicks for editing budget item containers
    cancelEditBudgetItem = () => {
        this.setState({
            editBudgetItem: false
        });
    }

    //this handles clicks for adding budget items
    handleNewBudgetItem = () => {
        const addBudget = !this.state.addBudget;
        this.setState({
            addBudget
        });
    }

    //this handles cancelling adding budget items
    cancelNewBudgetItem = () => {
        this.setState({
            addBudget: false
        });
    }

    handleClickOutside = e => {
        /* Check that we've clicked outside of the container and that it is open */

        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            this.cancelNewBudgetItem();
            this.props.cancelEditBudget();
        };
    }

    //This handles the form submit and checks if fields are valid
    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            error: ''
        });

        const { date, budget_title, budget_amount } = e.target;
        const date_create = date.value;
        
        if(date_create.length !== 10){
            return this.setState({
                error: "Please use a YYYY-MM-DD format"
            });
        };

        if(isNaN(Date.parse(date_create)))
        {
            return this.setState({
                error: "Please enter a valid date"
            });
        }


        if(!budget_title.value){
            return this.setState({
                error: 'Please enter a Title'
            })
        }

        if(!budget_amount.value || budget_amount.value < 0){
            return this.setState({
                error: 'Please enter a non-zero amount'
            })
        }

        const newBudget = {
            budget_amount: budget_amount.value,
            title: budget_title.value,
            date_create
        }

        BudgetsApiService.addBudget(this.context.user_id, (monthlyBudgets) => this.context.setMonthlyBudgets(monthlyBudgets), newBudget);
        this.props.cancelEditBudget()
    }

    render() {
        const monthlybudgets = this.context.monthlyBudget;

        if(monthlybudgets.length > 0){
            const budgets = monthlybudgets.map((item, idx) => 
                <BudgetItem 
                    key={idx+item} 
                    title={item[0]} 
                    amount={item[1]} 
                    date={item[2].split('T')[0]} 
                    budgetId={item[3]}
                    editBudgetItem={this.state.editBudgetItem}
                    handleEditBudgetItem={()=>this.handleEditBudgetItem()}
                    handleOutsideClick={()=>this.handleOutsideClick()}/>) 
            return(
                <div className="budgets-container" ref={this.setWrapperRef}>
                    {this.state.addBudget 
                        ? 
                        <form className="budgets-form" onSubmit={(e)=>this.handleSubmit(e)}>
                            <div className="add-item-form-inputs">
                                <label htmlFor="date">Date</label>
                                <input id="date" name="date" defaultValue={new Date().toISOString().slice(0, 10)}/>
                            </div>
                            
                            <div className="add-item-form-inputs">
                                <label name="budget_title">Deposit Title:</label>
                                <input id="budget_title" name="budget_title"/>
                            </div>
                            
                            <div className="add-item-form-inputs">
                                <label name="budget_amount">Amount </label>
                                <input type="number" id="budget_amount" name="budget_amount"/>
                            </div>
                            
                            <p className="budget-error">{this.state.error}</p>
                            
                            <div className="add-item-form-inputs">
                                <button 
                                    className="budget-button" 
                                    type="button" 
                                    onClick={()=>this.cancelNewBudgetItem()}>
                                        Cancel</button>
                                <button 
                                    className="budget-button" 
                                    type="submit">
                                        Submit</button>
                            </div>
                        </form> //If you are editing a budget item, it removes the add budget/cancel buttons
                        : !this.state.editBudgetItem ?
                        <div className="add-item-form-inputs">

                            <button 
                                className="budget-button" 
                                onClick={()=>this.props.cancelEditBudget()}>
                                    Cancel</button>
                        
                            <button 
                                className="budget-button" 
                                onClick={()=>this.handleNewBudgetItem()}>
                                    Add to budget</button>
                        </div> : <></>}
                    <div className="budget-items-container">{budgets}</div>
                </div>
            )
        }
        return(
            <div className="budgets-container" ref={this.setWrapperRef}>
                    {this.state.addBudget 
                        ? 
                        <form 
                            className="budgets-form" 
                            onSubmit={(e)=>this.handleSubmit(e)}>

                            <div className="add-item-form-inputs">

                                <label htmlFor="date">Date</label>
                                <input id="date" name="date" defaultValue={new Date().toISOString().slice(0, 10)}/>

                            </div>

                            <div className="add-item-form-inputs">

                                <label name="budget_title">Deposit Title:</label>
                                <input id="budget_title" name="budget_title"/>

                            </div>

                            <div className="add-item-form-inputs">

                                <label name="budget_amount">Amount </label>
                                <input type="number" id="budget_amount" name="budget_amount"/>

                            </div>

                            <p className="budget-error">{this.state.error}</p>

                            <div className="add-item-form-inputs">
                                <button 
                                    className="budget-button" 
                                    type="button" onClick={()=>this.cancelNewBudgetItem()}>
                                        Cancel</button>
                                <button 
                                    className="budget-button" 
                                    type="submit">
                                        Submit</button>
                            </div>
                        </form> 
                        : 
                        !this.state.editBudgetItem ? <div className="add-item-form-inputs">
                            <button className="budget-button" onClick={()=>this.props.cancelEditBudget()}>Cancel</button>
                        <button className="budget-button" onClick={()=>this.handleNewBudgetItem()}>Add to budget</button>
                        </div> : <></>}
                    {this.state.editBudgetItem ? <div className="budget-items-container"></div> : <></>}
                </div>
        )
    }
}