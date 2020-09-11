import React, { Component } from 'react';
import './Item.css'
import BudgetMeContext from '../../context/BudgetMeContext';

export default class Item extends Component{
    static contextType = BudgetMeContext;

    constructor(props){
        super(props)
        this.state={
            active: false
        }
    }

    
    handleItem = () => {
        this.setState({
            active: true
        })
    }

    handleCancel = () => {
        this.setState({ 
            active: false
        })
    }

    updateItem = e => {
        e.preventDefault();
        const { setItem, createData } = this.context;
        const { purchase, amount } = e.target

        let itemInfo = [this.props.category, this.props.index, [purchase.value, parseInt(amount.value)]];
        setItem(itemInfo);

        const { chartData, budget_values } = this.context;
        createData(chartData.labels, budget_values);
        this.handleCancel();
    }

    render(){
        const item = this.props.item;
        const title = item[0].split('_').join(' ');
        
        if(title === "Leftover budget"){
            return(
                <></>
            )
        }

        if(this.state.active){
            return(
                <li className="item">
                    <form onSubmit={(e)=>this.updateItem(e)}>
                        <label>Purchase: </label>
                        <input type="text" name="purchase" defaultValue={title}/><br/>
                        <label>Amount: </label>
                        <input type="int" name="amount" defaultValue={item[1]}/><br/>
                        <button type="button" onClick={()=>this.handleCancel()}>Cancel</button>
                        <button type="submit" >Update</button>
                    </form>
                </li>
            )
        }
        
        return(
            <li className="item" >
                {title}: ${item[1]} 
                <br/><button type="button" onClick={()=>this.handleItem()}>Edit</button>
            </li>
        )
    }
}