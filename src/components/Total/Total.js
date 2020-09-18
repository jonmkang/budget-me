import React, { Component } from 'react';
import BudgetMeContext from '../../context/BudgetMeContext';
import "./Total.css"

export default class Total extends Component{
    static contextType = BudgetMeContext;

    constructor(props){
        super(props)
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state={
            isHovering: false
        }
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

        return(
            <div 
                onMouseEnter={this.handleMouseHover} 
                onMouseLeave={this.handleMouseHover}>
                <h4 className="total" onClick={() => this.context.setTotalClick()}>Budget: {chartData.datasets[0].data.reduce((a, b) => a+b)}</h4>
                {this.state.isHovering && <div className="total-budget">View total budget</div>}
            </div>
        )
    }

}