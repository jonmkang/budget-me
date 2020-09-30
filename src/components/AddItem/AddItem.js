import React, { Component } from 'react';
import BudgetMeContext from '../../context/BudgetMeContext';
import ItemsApiService from '../../services/items-api-service';
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
            this.props.cancelItem();
        };
    }

    handleCategory = e => {
        const newCategory = e.target.value;
        this.setState({
            newCategory
        });
    }

    handleSubmit = e =>{
        e.preventDefault();
        const { purchase, amount, category } = e.target;
        const data = this.context.chartData.datasets[0].data;

        //create item object to send to backend
        const newItem = {
            item_name: purchase.value,
            amount: parseInt(amount.value),
            category_id: this.context.categories[category.value].category_id,
            user_id: this.context.user_id
        };

        //If a name isn't given, sends error
        if(!purchase.value){
            return this.setState({
                error: "Please give a name to the expenditure"
            });
        };

        //if a valid amount isn't given, sends error
        if(!amount.value || amount.value <= 0){
            return this.setState({
                error: "Please give a positive number for the amount"
            });
        };

        //If all criterion passes, tries to add item to the backend with a fetch request
        ItemsApiService.addItem(newItem, this.context.user_id, (category, purchase, amount) => this.context.addItem(category, purchase, amount), (values)=> this.context.setBudgetValues(values));
        
        //resets all errors
        this.setState({
            error: null
        });

        const index = this.context.chartData.labels.indexOf(category.value);

        //creates a legend item to set the category to the one the item was added to
        const legendItem = {
            text: category.value,
            amount: data[index],
            index: index
        };

        this.context.setCurrentCategory(e, legendItem);
        this.props.cancelItem();
    }

    render(){
        const categories = this.context.chartData.labels.map((item, idx) => <option value={item} key={idx}>{item}</option>);
        
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