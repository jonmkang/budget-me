import React, { Component } from 'react';
import BudgetMeContext from '../../context/BudgetMeContext';
import './AddItem.css';

export default class AddItem extends Component {
    static contextType = BudgetMeContext;
    constructor(props){
        super(props)
        this.state = {
            category: false,
            error: null,
            newCategory: ""
        }
    }

    handleCategory = e => {
        if(e.target.value === 'add-category'){
            this.setState({
                category: true
            })
        }else{
            this.setState({
                category: false
            })
        }
    }

    handleNewCategory = e => {
        const newCategory = e.target.value;
        this.setState({
            newCategory
        })
    }

    handleSubmit = e =>{
        e.preventDefault()
        const { purchase, amount } = e.target
        let category = ''

        if(!purchase.value){
            return this.setState({
                error: "Please give a name to the expenditure"
            })
        }

        if(!amount.value || amount.value <= 0){
            return this.setState({
                error: "Please give a positive number for the amount"
            })
        }

        if(!this.state.category){
            category = e.target.category.value;
        }else{
            category = this.state.newCategory
        }

        this.context.addCategory(category)
        this.context.addItem(category, purchase.value, amount.value)
        this.setState({
            error: null
        })
        this.props.cancelItem()
    }

    render(){
        const categories = this.context.chartData.labels.map((item, idx) => <option value={item} key={idx}>{item}</option>)
        return(
            <div>
                <form className="add-item-form" onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">
                    <div className="add-item-form-inputs">
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" onChange={(e)=>this.handleCategory(e)}>
                            {categories}
                            <option value="add-category">Add category</option>
                        </select>
                        {this.state.category ? <input id="new-category" name="new-category" placeholder="Enter category" onChange={(e)=>this.handleNewCategory(e)}/> : <></>}
                    </div>
                    <div className="add-item-form-inputs">
                        <label name="purchase">Name of expenditure </label>
                        <input id="purchase" name="purchase"></input>
                    </div>
                    <div className="add-item-form-inputs">
                        <label name="amount">Amount: </label>
                        <input type="number" id="amount" name="amount"></input>
                    </div>
                    <div className="add-item-form-buttons">
                        <button type="button" onClick={()=> this.props.cancelItem()}>Cancel</button>
                        <button type="submit" >Submit</button>
                    </div>
                </form>
                {this.state.error}
            </div>
        )
    }
}