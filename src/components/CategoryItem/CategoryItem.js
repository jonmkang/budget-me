import React, { Component } from 'react';
import BudgetMeContext from '../../context/BudgetMeContext';
import './CategoryItem.css';

export default class CategoryItem extends Component{
    static contextType = BudgetMeContext;

    render(){
        const data = this.context.chartData.datasets[0].data;
        const legendItem = {
            text: this.props.item,
            amount: data[this.props.idx],
            index: this.props.idx
        };
        
        return (
            <>
                <li 
                    className="item" 
                    onClick={(e)=>this.context.setCurrentCategory(e, legendItem)}
                    key={this.props.idx+this.props.item}>
                        {this.props.item}: ${data[this.props.idx]}
                    </li>
            </>
            
        )
    }
}