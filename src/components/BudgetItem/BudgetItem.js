import React, { Component } from 'react';
import BudgetMeContext from '../../context/BudgetMeContext';
import BudgetsApiService from '../../services/budgets-api-service';
import './BudgetItem.css';

export default class BudgetItem extends Component{
    static contextType = BudgetMeContext;

    constructor(props){
        super(props)
        this.state={
            activeBudget: false,
            handleDelete: false,
            error: ''
        };
    }
    handleBudget = () => {
        this.props.handleEditBudgetItem();
        const activeBudget = !this.state.activeBudget;
        this.setState({
            activeBudget
        })
    }

    handleCancel = () => {
        this.props.handleEditBudgetItem();
        this.setState({
            activeBudget:false
        })
    }

    handleDelete = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const handleDelete = !this.state.handleDelete;
        this.setState({
            handleDelete
        });
        
    }

    submitDelete = (e) => {
        BudgetsApiService.deleteBudgetItem(this.context.user_id, this.props.budgetId, (monthlyBudgets) => this.context.setMonthlyBudgets(monthlyBudgets))
        this.handleDelete(e);
        this.handleCancel();
    }

    updateBudgetItem = (e) => {
        e.preventDefault();
        this.setState({
            error: ''
        })

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

        const updatedBudget = {
            amount: budget_amount.value,
            title: budget_title.value,
            date_create
        }

        BudgetsApiService.updateBudgetItem(this.context.user_id, (monthlyBudgets) => this.context.setMonthlyBudgets(monthlyBudgets), updatedBudget,  this.props.budgetId)
        this.handleBudget();
    }

    render(){
        if(!this.props.editBudgetItem){
            return(
                <div className="budget-item" onClick={()=>this.handleBudget()}>
                    <div className="budget-item-title">
                        {this.props.title}
                    </div>
                    <div className="budget-item-amount">
                        ${this.props.amount}
                    </div>
                    <div className="budget-item-date">
                        {this.props.date}
                    </div>
                </div>
            )
        }

        if(this.props.editBudgetItem && this.state.activeBudget){
            return(
                <form 
                    className="budget-edit-form" 
                    onSubmit={(e)=>this.updateBudgetItem(e)}>
                    
                    <div className="edit-labels">
                        <label htmlFor="budget_title">Expense Name: </label>
                        <input type="text" name="budget_title" defaultValue={this.props.title}/>
                    </div>
                    
                    <div className="edit-labels">
                        <label htmlFor="budget_amount">Amount: </label>
                        <input type="number" name="budget_amount" defaultValue={this.props.amount}/>
                    </div>

                    <div className="edit-labels">
                        <label htmlFor="date">Date: </label>
                        <input type="text" name="date" defaultValue={this.props.date}/>
                    </div>
                    
                    <div className="error">
                        {this.state.handleDelete && "Are you sure you want to delete?"}
                        {this.state.error}
                    </div>
                    
                    
                        {
                            !this.state.handleDelete 
                            ? 

                            <div className="edit-labels">
                                <button 
                                    className="budget-button"
                                    onClick={()=>this.handleCancel()}>
                                        Cancel</button>
                                <button
                                    className="budget-button"
                                    onClick={(e)=>this.handleDelete(e)}>
                                        Delete</button>
                                <button 
                                    className="budget-button"
                                    type="submit"
                                    >Submit</button>
                            </div> 
                            :
                            <div className="edit-labels">
                                <button
                                    className="budget-button" 
                                    onClick={(e)=>this.handleDelete(e)} 
                                    type="button">
                                        No</button>
                                <button 
                                    className="budget-button"
                                    onClick={(e)=>this.submitDelete(e)} 
                                    type="button">
                                        Yes</button>
                            </div>

                        }
                    
                    
                </form>
            )
        };

        return(
            <div></div>
        )
    }
}