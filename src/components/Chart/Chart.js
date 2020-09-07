import React, { Component } from 'react';
import { Bar, Line, Pie, Polar } from 'react-chartjs-2';
import Category from '../../components/Category/Category'
import './Chart.css'

export default class Chart extends Component{
    constructor(props){
        super(props)
        this.state= {
            chartData: {
                labels: ['Restaurants', 'Bills', 'Groceries', 'Pet Supplies', 'Leftover Budget', 'Investments'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [65, 59, 80, 81, 40, 22]
                  }
                ]
            },
            currentCategory: { name: 'Total', amount: 347,  index: null }
        }
    }

    handleChangeCategory = (e, legendItem) => {
        const data = this.state.chartData.datasets[0].data;
        this.setState({
            currentCategory: { name: legendItem.text, amount: data[legendItem.index],  index: legendItem.index}
        });
    }

    handleElementClick = (elementItem) => {
        if(!elementItem.length){
            return
        }
        const elementIndex = elementItem[0]._index;
        const label = this.state.chartData.labels[elementIndex];
        const data = this.state.chartData.datasets[0].data[elementIndex];

        this.setState({
            currentCategory: { name: label, amount: data, index: elementIndex}
        })
    }

    handleTotalClick = () => {
        this.setState({
            currentCategory: {name: 'Total', amount: 347,  index: null }
        })
    }

    render(){
        return(
            <div>
                <h4 className="total" onClick={() => this.handleTotalClick()}>Total Budget: {this.state.chartData.datasets[0].data.reduce((a, b) => a+b)}</h4>
                <Pie
                    data={this.state.chartData}
                    options={{ maintainAspectRatio: true,
                            legend: {
                                onClick: (e, legendItem) => this.handleChangeCategory(e, legendItem)
                            } }}
                    getElementAtEvent={(elementItem) => this.handleElementClick(elementItem)}
                    />
                <Category data={this.state.chartData} currentCategory={this.state.currentCategory}/>
            </div>
        )
    }
}