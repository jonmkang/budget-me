import React, { Component } from 'react'
import config from '../config'

const BudgetMeContext = React.createContext({
    chartData: {},
    user_id: 1,
    budget_values: {},
    currentCategory: {},
    userId: null,
    error: null,
    addCategory: () => {},
    addItem: () => {},
    clearError: () => {},
    clearUserId: () => {},
    createData: () => {},
    setBudgetValues: () => {},
    setCurrentCategory: () => {},
    setData: () => {},
    setElement: () => {},
    setError: () => {},
    setItem: () => {},
    setLabels: () => {},
    setTotalClick: () => {},
    setUserId: () => {},
})

export default BudgetMeContext

export class BudgetMeProvider extends Component{
    state={
        chartData: {
            labels: ['Bills', 'Groceries', 'Investments', 'Pet Supplies', 'Restaurants'],
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
                data: [65, 59, 80, 81, 22]
              }
            ]
            },
        currentCategory: { name: 'Total', amount: 347,  index: null },
        budget_values: {
            Restaurants: [
                ["Le Gamin", 22],
                ["Pizza Prince", 18],
                ["cafe Alula", 25]
            ],
            Bills: [
                ["Electricity", 20],
                ["Internet", 30]
            ],
            Groceries: [
                ["HMart", 40],
                ["Whole Foods", 20]
            ],
            Pet_Supplies: [
                ["Cat food", 25],
                ["Cat litter", 35],
                ["Cat treats", 21]
            ],
            Investments: [
                ["Robinhood", 22]
            ],
            Leftover_Budget: [
                ["Leftover budget", 40]
            ]
        },
        error: null,
        user_id: 1
    }

    //Adds new category to context
    addCategory = category => {
        const labels = this.state.chartData.labels;
        
        if(labels.includes(category)){
            return
        }
        
        labels.push(category)

        let statusCopy = Object.assign({}, this.state.chartData)
        statusCopy.datasets[0].labels = labels;
            
        this.setState({
            chartData: statusCopy
        })
    }

    //adds item to correct category object
    addItem = (category, item, amount) => {
        const budget_values = this.state.budget_values;
        const labels = this.state.chartData.labels;

        if(!(category in budget_values)){
            budget_values[category] = [[item, parseInt(amount)]];
        }
        else
        {
            let arr = budget_values[category];
            arr.push([item, parseInt(amount)]);
            budget_values[category] = arr;
        }
        
        this.setState({
            budget_values
        })

        this.createData(labels, budget_values)
    }

    clearError = () => {
        this.setState({ error: null })
    }
    
    clearUserId = () => {
        window.sessionStorage.setItem(config.USER_ID, null)
    }

    //creates a data list for the pie graph using values from the API
    createData = (labels, budget_values) => {
        const names = labels.map(item=> item.split(' ').join('_'));
        const total_values = names.map(item =>
            budget_values[item] ?
                budget_values[item].map((a) => a[1]).reduce((a, b) => a+b) : 0)
        this.setData(total_values);
    }

    //uses api data to set budget values for app
    setBudgetValues = (values) => {
        //Creates new budget object
        const newBudget = {};

        //iterates through each item
        values.forEach(item => {
            //makes sure to create a proper object key
            const label = item[2].split(' ').join('_');


            //creates an array pair of amount and name
            const arrToPush = [item[0], item[1], item[3]];

            //If the key doesn't exist, create an array with arrToPush as arr[0]
            if(!newBudget[label]){
                newBudget[label] = [arrToPush]

            //If it exists, push arrToPush onto the existing array in the key-value pair
            }else{
                newBudget[label].push(arrToPush)
            }            
        })

        //Creates new budget in state to use for context
        this.setState({
            budget_values: newBudget
        })

        //Uses new budget values to re-create pie chart data
        this.createData(this.state.chartData.labels, newBudget)
    }

    //Handles changes on clicking legend
    setCurrentCategory = (e, legendItem) => {
        const data = this.state.chartData.datasets[0].data;
        this.setState({
            currentCategory: { name: legendItem.text, amount: data[legendItem.index],  index: legendItem.index}
        });
    }

    //Sets values from data given from API
    setData = newData => {
        if(Array.isArray(newData)){
            let statusCopy = Object.assign({}, this.state.chartData)
            statusCopy.datasets[0].data = newData;
            
            this.setState({
                chartData: statusCopy
            })
        }
    }    
    
    //handles changes in categories on pie chart
    //catches error of clicking legend due to difference in element
    setElement = (elementItem) => {
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

    setError = error => {
        console.error(error)
        this.setState({ error })
    }
    
    //Replaces the item in context with the edited item
    setItem = itemInfo => {

        //Check if item is an array
        if(Array.isArray(itemInfo)){
            //Assigns the budget values to a temp. variable and replaces the array inside the correct index
            let statusCopy = Object.assign({}, this.state.budget_values)
            statusCopy[itemInfo[0]][itemInfo[1]] = itemInfo[2];

            this.setState({
                budget_values: statusCopy
            })

            //updates the new total
            this.updateTotal()
        }
    }

    setLabels = labels => {
        if(Array.isArray(labels)){
            let statusCopy = Object.assign({}, this.state.chartData)
            statusCopy.labels = labels;

            this.setState({
                chartData: statusCopy
            })
        }
    }

    setUserId = userId => {
        window.sessionStorage.setItem(config.USER_ID, userId)
    }


    //Shows total budget allocation upon click
    setTotalClick = () => {
        this.setState({
            currentCategory: {name: 'Total', amount: 347,  index: null }
        })
    }
    
    //updates current category amount
    updateTotal = () => {
        if(this.state.currentCategory.index === null){
            return
        }

        const data = this.state.chartData.datasets[0].data;
        this.setState({
            currentCategory: {
                ...this.state.currentCategory,
                amount: data[this.state.currentCategory.index]
            }
        })
    }
    render() {
        const value = {
            chartData: this.state.chartData,
            budget_values: this.state.budget_values,
            currentCategory: this.state.currentCategory,
            user_id: this.state.user_id,
            error: this.state.error,
            createData: this.createData,
            setUserId: this.setUserId,
            setError: this.setError,
            clearError: this.clearError,
            clearUserId: this.clearUserId,
            setBudgetValues: this.setBudgetValues,
            setCurrentCategory: this.setCurrentCategory,
            setElement: this.setElement,
            setTotalClick: this.setTotalClick,
            setData: this.setData,
            setItem: this.setItem,
            setLabels: this.setLabels,
            addItem: this.addItem,
            addCategory: this.addCategory
        }

        return(
            <BudgetMeContext.Provider value={value}>
                {this.props.children}
            </BudgetMeContext.Provider>
        )
    }
}