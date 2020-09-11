import React, { Component } from 'react';
import Item from '../Item/Item';
import BudgetMeContext from '../../context/BudgetMeContext';
import './Category.css';

export default class Category extends Component {
    static contextType = BudgetMeContext;
    
    render(){
        const { name, index } = this.context.currentCategory;
        const data = this.context.chartData.datasets[0].data;
        
        if(index || index === 0){
            const findName = name.split(' ').join('_');
            const items = this.context.budget_values[findName].map((item, idx) => <Item category={findName} index={idx} key={idx+item} item={item}/>)
            return(
                <div >
                    <h5>{name}: ${data[index]}</h5>
                    <ul className="list">
                        {items}
                    </ul>
                </div>
            )
        }

        const total = this.props.data.datasets[0].data.reduce((a, b) => a+b);
        const categories = this.props.data.labels.map((item, idx)=> <li className="item" key={idx}>{item}: ${this.props.data.datasets[0].data[idx]}</li>)
        return(
            

            <div>
                <h5>Total spent: {total}</h5>
                <ul className="list">
                    {categories}
                </ul>
            </div>
        )
        
    }
}