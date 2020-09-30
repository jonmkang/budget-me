import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import Category from '../../components/Category/Category';
import Total from '../Total/Total';
import './Chart.css';
import BudgetMeContext from '../../context/BudgetMeContext';
import AddItem from '../AddItem/AddItem';
import AddCategory from '../AddCategory/AddCategory';
import EditCategories from '../EditCategories/EditCategories';

export default class Chart extends Component{
    static contextType = BudgetMeContext;

    constructor(props){
        super(props);
        this.state={
            addItem: false,
            addCategory: false,
            isHovering: false,
            editCategory: false
        };
    }

    //creates initial data values for the demo chart
    componentDidMount(){
        const { chartData, budget_values } = this.context;
        this.context.createData(chartData.labels, budget_values);
    }

    addItem = () => {
        const addItem = !this.state.addItem;
        this.setState({
            addItem
        });
    }

    addCategory = () => {
        const addCategory = !this.state.addCategory;
        this.setState({
            addCategory
        });
    }

    editCategory = () => {
        const editCategory = !this.state.editCategory;
        this.setState({
            editCategory
        });
    }

    cancelEditCategory = () => {
        this.setState({
            editCategory: false
        });
    }

    cancelItem = () => {
        this.setState({
            addItem: false
        });
    }

    cancelCategory = () => {
        this.setState({
            addCategory: false
        });
    }

    render(){
        const { chartData, currentCategory } = this.context;
  
        return(
            <div className="chart-container">
                <Total />
                <div className="graph-container">
                    <Pie
                        data={chartData}
                        options={{
                                maintainAspectRatio: false,
                                responsive: true,
                                legend: {
                                    position: 'right',
                                    onClick: (e, legendItem) => this.context.setCurrentCategory(e, legendItem)
                                } }}
                        getElementAtEvent={(elementItem) => this.context.setElement(elementItem)}
                        />
                </div>
               

                <div className="button-container">
                    <button 
                        type="button" 
                        className="add-item" 
                        onClick={()=>this.addCategory()}>
                            Add Category
                        </button>

                    <button 
                        type="button" 
                        className="add-item" 
                        onClick={()=>this.editCategory()}>
                            Edit Categories
                        </button>

                    <button 
                        type="button" 
                        className="add-item" 
                        onClick={()=>this.addItem()}>
                            Add Item
                        </button>
                </div>    
                    {/*If this.state.addCategory is true it renders the addcategory form */}
                    {this.state.addCategory && <AddCategory cancelCategory={()=>this.cancelCategory()}/>}
                    
                    {/*If this.state.editCategory is true it renders the editcategory form */}
                    {this.state.editCategory && <EditCategories cancelEditCategory={()=>this.cancelEditCategory()}/>}
                    
                    {/*If this.state.addItem is true it renders the addItem form */}
                    {this.state.addItem && <AddItem cancelItem={()=>this.cancelItem()}/>}
                    
                    <Category data={chartData} currentCategory={currentCategory}/>
            </div>
        )
    }
}