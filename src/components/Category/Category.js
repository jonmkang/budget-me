import React, { Component } from 'react';
import Item from '../Item/Item';


export default class Category extends Component {
    constructor(props){
        super(props)
        this.state={
            categoryItems: [
                {
                    Le_Gamin: 22,
                    Pizza_Prince: 18,
                    Cafe_Alula: 25
                },
                {
                    Electricity: 20,
                    Internet: 39
                },
                {
                    Hmart: 40,
                    Whole_Foods: 20,
                    Associated_Foods: 20
                },
                {
                    Cat_food: 25,
                    Cat_litter: 35,
                    Cat_treats: 21
                },
                {
                    Leftover_budget: 40
                },
                {
                    Robinhood: 22
                }
            ]
        }
    }
    
    render(){
        const { name, amount, index } = this.props.currentCategory;
        if(index){
            const items = Object.entries(this.state.categoryItems[index]).map((item, idx)=> <Item key={idx+item} item={item}/>)
            return(
                <div>
                    {name}: {amount}
                    <ul>
                        {items}
                    </ul>
                </div>
            )
        }

        const total = this.props.data.datasets[0].data.reduce((a, b) => a+b);
        const categories = this.props.data.labels.map((item, idx)=> <li className="item" key={idx}>{item}: {this.props.data.datasets[0].data[idx]}</li>)
        return(
            

            <div>
                Total: {total}
                <ul>
                    {categories}
                </ul>
            </div>
        )
        
    }
}