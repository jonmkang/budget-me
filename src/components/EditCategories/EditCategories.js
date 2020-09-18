import React, { Component } from 'react';
import BudgetMeContext from '../../context/BudgetMeContext';
import './EditCategories.css';

export default class EditCategories extends Component{
    static contextType = BudgetMeContext;
    constructor(props){
        super(props)
        this.state={
            category: "",
            newName: "",
            deleteCategory: false
        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }
    
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside = e => {
        /* Check that we've clicked outside of the container and that it is open */

        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            this.props.cancelEditCategory()
        }
    };

    setCategory = e => {
        this.setState({
            category: e.target.value
        })
    }

    setName = e => {
        this.setState({
            newName: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
    }

    setDeleteCategory = () => {
        const deleteCategory = !this.state.deleteCategory
        this.setState({
            deleteCategory
        })
    }

    render(){
        const labels = this.context.chartData.labels.map(item => <option key={item} value={item}>{item}</option>);
        return(
            <div ref={this.setWrapperRef}>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <div>
                        <label htmlFor="category-to-change">Category To Edit: </label>
                        <select 
                            id="category-to-change"
                            name="category-to-change"
                            className="edit-labels" 
                            onChange={(e)=>this.setCategory(e)}
                            >
                                {labels}
                        </select>
                        {/*checks if user wants to delete selected category*/}
                        <button type="button" onClick={()=>this.setDeleteCategory()}>Delete Category</button>
                        
                        {/*If user wants to delete category, renders this and asks for confirmation*/}
                        {this.state.deleteCategory 
                            &&
                        <div>
                            <p>Are you sure you want to delete the {this.state.category} category?</p>
                            <button className="submit-cancel-buttons" onClick={()=>this.setDeleteCategory()} type="button">No</button>
                            <button className="submit-cancel-buttons" type="button">Yes</button>    
                        </div>}
                    </div>
                    

                    <div>
                        <label htmlFor="title">Category Name: </label>
                        <input id="title" name="title" onChange={(e)=>this.setName(e)}></input>
                    </div>
                    <div>
                        <button 
                            className="submit-cancel-buttons" 
                            type="button">
                                Cancel
                            </button>
                        <button 
                            className="submit-cancel-buttons" 
                            type="submit">
                                Submit
                            </button>
                    </div>
                </form>
            </div>
        )
    }
}