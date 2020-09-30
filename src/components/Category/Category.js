import React, { Component } from 'react';

import Item from '../Item/Item';
import BudgetMeContext from '../../context/BudgetMeContext';
import './Category.css';
import CategoryItem from '../CategoryItem/CategoryItem';

export default class Category extends Component {
    static contextType = BudgetMeContext;
    constructor(props){
        super(props)
        this.state={
            editingItem: false
        }
    }

    handleOutsideClick = () => {
        this.setState({
            editingItem: false
        });
    }
    
    handleEditingItem = () => {
        const editingItem = !this.state.editingItem;
        this.setState({
            editingItem
        });
    }
    
    render(){
        //Gets item name, index value and chart data
        const { name, index } = this.context.currentCategory;
        const data = this.context.chartData.datasets[0].data;
        
        //If the category index exists, creates items based off category
        if(index || index === 0){
            const findName = name.split(' ').join('_');
            
            //checks to see if values exist for the category
            if(this.context.budget_values[findName]){
                const items = this.context.budget_values[findName].map((item, idx) => 
                <Item 
                    category={findName} 
                    index={idx} 
                    key={idx+item} 
                    item={item}
                    editingItem={this.state.editingItem}
                    handleOutsideClick={() => this.handleOutsideClick()}
                    handleEditingItem={() => this.handleEditingItem()}/>);

                return(
                    <div >
                        <h5>{name}: ${data[index]}</h5>
                        <ul className="list" >
                            {items}
                        </ul>
                    </div>
                );
            };
            return(
                <div>
                    <h5>{name}: $0</h5>
                    <p className="empty-list">Add an item for this category!</p>
                </div>
            );
        };

        //If no categories exist, renders add new values
        // if(this.props.hasOwnProperty('data'))
        if(this.context.chartData.datasets[0].data.length === 0){
            return (
                <div>
                    Add a new category and some expenditures!
                </div>
            )
        }

        //If category index doesn't exist, creates values based off of category totals
        const total = (this.props.hasOwnProperty('data') ? this.props.data.datasets[0].data.reduce((a, b) => a+b) : null);

        //builds category elements off of labels and context data
        const categories = (this.props.data.hasOwnProperty('labels') ? this.props.data.labels.map((item, idx)=> 
            <CategoryItem 
                editing={false}
                className="item" 
                key={idx+item}
                idx={idx} 
                item={item}/>) 
                : null);

        return(
            <div>
                <h5>Total spent: ${total}</h5>
                <ul className="list-total">
                    {categories}
                </ul>
            </div>
        )
        
    }
}