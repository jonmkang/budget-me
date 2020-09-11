import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import Category from '../../components/Category/Category'
import './Chart.css'
import BudgetMeContext from '../../context/BudgetMeContext';
import AddItem from '../AddItem/AddItem';

export default class Chart extends Component{
    static contextType = BudgetMeContext;
    constructor(props){
        super(props)
        this.state={
            addItem: false
        }
    }

    componentDidMount(){
        const { chartData, budget_values } = this.context;
        this.context.createData(chartData.labels, budget_values);
    }

    addItem = () => {
        this.setState({
            addItem: true
        })
    }

    cancelItem = () => {
        this.setState({
            addItem: false
        })
    }

    render(){
        const { chartData, currentCategory } = this.context;

        return(
            <div className="chart-container">
                <h4 className="total" onClick={() => this.context.setTotalClick()}>Monthly Budget: {chartData.datasets[0].data.reduce((a, b) => a+b)}</h4>
                <Pie
                    data={chartData}
                    options={{ maintainAspectRatio: true,
                            legend: {
                                position: 'right',
                                onClick: (e, legendItem) => this.context.setCurrentCategory(e, legendItem)
                            } }}
                    getElementAtEvent={(elementItem) => this.context.setElement(elementItem)}
                    />
                <button type="button" className="add-item" onClick={()=>this.addItem()}>Add Item</button>
                {this.state.addItem ? <AddItem cancelItem={()=>this.cancelItem()}/> : <Category data={chartData} currentCategory={currentCategory}/>}
            </div>
        )
    }
}