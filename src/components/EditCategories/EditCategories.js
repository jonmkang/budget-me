import React, { Component } from 'react';
import BudgetMeContext from '../../context/BudgetMeContext';
import CategoryApiService from '../../services/categories-api-service';
import './EditCategories.css';

export default class EditCategories extends Component{
    static contextType = BudgetMeContext;
    constructor(props){
        super(props)
        this.state={
            category: "",
            newName: "",
            deleteCategory: false,
            error: ''
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

    handleDeleteCategory = () => {
        const name = document.getElementById('category-to-change').value
        CategoryApiService.deleteCategory(this.context.user_id, name, (labels) => this.context.setLabels(labels)) 
        this.props.cancelEditCategory()
    }

    handleSubmit = e => {
        e.preventDefault()
        const { category_to_change, title } = e.target;
        if(!title.value.length){
            return this.setState({
                error: "You must enter a name for the category"
            })
        }
        const newCategory = {
            category_title: title.value
        }
        CategoryApiService.updateCategoryTitle(this.context.user_id, category_to_change.value, newCategory, (labels) => this.context.setLabels(labels))
        this.props.cancelEditCategory()

        this.setState({
            error: ''
        })
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
            <div ref={this.setWrapperRef} className="edit-container">
                <form onSubmit={(e)=>this.handleSubmit(e)} className="edit-form">
                    <div>
                        <div className="category-names">
                            <label htmlFor="category_to_change">Category To Edit: </label>
                            <select 
                                id="category_to_change"
                                name="category_to_change"
                                className="edit-labels" 
                                onChange={(e)=>this.setCategory(e)}
                                >
                                    {labels}
                            </select>
                            {/*checks if user wants to delete selected category*/}
                            <button 
                                className="submit-cancel-buttons delete-button"
                                type="button" 
                                onClick={()=>this.setDeleteCategory()}>
                                    Delete Category</button>
                        </div>
                        
                        
                        
                        
                        {/*If user wants to delete category, renders this and asks for confirmation*/}
                        {this.state.deleteCategory 
                            &&
                        <div>
                            <p>Are you sure you want to delete the {this.state.category} category?</p>
                            <button 
                                className="submit-cancel-buttons" 
                                onClick={()=>this.setDeleteCategory()} 
                                type="button">
                                    No</button>
                            <button 
                                className="submit-cancel-buttons" 
                                type="submit"
                                onClick={()=>this.handleDeleteCategory()}>
                                    Yes</button>    
                        </div>}
                    </div>

                    {/*Only renders if user is not trying to delete category*/}
                    {!this.state.deleteCategory  
                        &&
                    <div className="category-names edit-title-container">
                        <label htmlFor="title" className="edit-title">Edit Name: </label>
                        <input 
                            className="edit-title"
                            autoComplete="off"
                            id="title" 
                            name="title" 
                            defaultValue={this.state.category}
                            onChange={(e)=>this.setName(e)}></input>
                    </div>}

                    {/*Only renders if user is not trying to delete category*/}
                    {!this.state.deleteCategory  
                        &&
                    <div>
                        <button 
                            className="submit-cancel-buttons" 
                            type="button"
                            onClick={()=>this.props.cancelEditCategory()}>
                                Cancel
                            </button>
                        <button 
                            className="submit-cancel-buttons" 
                            type="submit">
                                Submit
                            </button>
                    </div>}
                    {this.state.error}
                </form>
            </div>
        )
    }
}