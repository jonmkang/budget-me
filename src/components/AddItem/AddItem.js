import React, { Component } from 'react';
import BudgetMeContext from '../../context/BudgetMeContext';
import './AddItem.css';

export default class AddItem extends Component {
    static contextType = BudgetMeContext;
    constructor(props){
        super(props)
        this.state = {
            error: null,
            newCategory: ""
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
            this.props.cancelItem()
        }
    };

    handleCategory = e => {
        const newCategory = e.target.value;
        this.setState({
            newCategory
        })
    }

    handleSubmit = e =>{
        e.preventDefault()
        const { purchase, amount, category } = e.target

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

        this.context.addItem(category.value, purchase.value, amount.value)
        this.setState({
            error: null
        })
        this.props.cancelItem()
    }

    render(){
        const categories = this.context.chartData.labels.map((item, idx) => <option value={item} key={idx}>{item}</option>)
        return(
            <div ref={this.setWrapperRef}>
                <form 
                    className="add-item-form" 
                    onSubmit={(e) => this.handleSubmit(e)} 
                    autoComplete="off"
                    >
                    
                    <div className="add-item-form-inputs">
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" onChange={(e)=>this.handleCategory(e)}>
                            {categories}
                        </select>
                    </div>
                    <div className="add-item-form-inputs">
                        <label name="purchase">Name of expenditure </label>
                        <input id="purchase" name="purchase"></input>
                    </div>
                    <div className="add-item-form-inputs">
                        <label name="amount">Amount </label>
                        <input type="number" id="amount" name="amount"></input>
                    </div>
                    <div className="add-item-form-buttons">
                        <button 
                            className="submit-cancel-buttons"
                            type="button" 
                            onClick={()=> this.props.cancelItem()}>
                                Cancel</button>
                        <button 
                            className="submit-cancel-buttons"
                            type="submit" >
                                Submit</button>
                    </div>
                    <div className="error">
                        {this.state.error}
                    </div>
                </form>
            </div>
        )
    }
}