import React, { Component } from 'react';
import BudgetMeContext from '../../context/BudgetMeContext';
import "./Total.css"

export default class Total extends Component{
    static contextType = BudgetMeContext;

    constructor(props){
        super(props);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state={
            isHovering: false
        };
    }

    handleMouseHover() {
        this.setState(this.toggleHoverState);
    }

    toggleHoverState(state) {
        return {
            isHovering: !state.isHovering,
        };
    }

    render(){
        const { chartData } = this.context;

        if(this.context.chartData.datasets[0].data.length === 0){
            return (
                <div className="empty-budgets">
                    Add to your budget first!
                </div>
            )
        }

        //Create initial 0 value for variable
        let budget = 0;

        //If budget exists it adds all the budget additions to the variable
        if(this.context.monthlyBudget.length)
            this.context.monthlyBudget.forEach((item) => {
                budget+= item[1]
            })

        return(
            <div 
                onMouseEnter={this.handleMouseHover} 
                onMouseLeave={this.handleMouseHover}
                className="total-container">
                <h4 
                    className="total" 
                    onClick={() => this.context.setTotalClick()}>
                        Budget Left: ${budget - chartData.datasets[0].data.reduce((a, b) => a+b)}</h4>
                {this.state.isHovering && <div className="total-budget">View total expenditures</div>}
            </div>
        )
    }

}