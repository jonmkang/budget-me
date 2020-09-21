import React, { Component } from 'react';
import BudgetMeContext from '../../context/BudgetMeContext';
import CategoryApiService from '../../services/categories-api-service';
import './AddCategory.css';

export default class AddCategory extends Component {
    static contextType = BudgetMeContext;

    constructor(props){
        super(props)
        this.state={
            error: ""
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
            this.props.cancelCategory()
        }
    };

    addCategory = e => {
        e.preventDefault()
        const { category_title } = e.target

        if(!category_title.value){
            return this.setState({
                error: "Enter a title for the new category"
            })
        }

        const category_to_add = {
            category_title: category_title.value
        }

        CategoryApiService.addCategory(this.context.user_id, category_to_add, (labels) => this.context.setLabels(labels), (categories) => this.context.setCategories(categories))
        
        this.setState({
            error: ''
        })
        this.props.cancelCategory()
    }

    render(){
        return(
            <div ref={this.setWrapperRef} className="add-category-container">
                <form onSubmit={(e)=>this.addCategory(e)}>
                    <div className="add-category-box">
                        <label>Category Title:</label>
                        <input type="text" name="category_title" autoComplete="off"/>
                    </div>
                    
                    <div className="add-category-buttons">
                        <button className="submit-cancel-buttons" type="button" onClick={()=>this.props.cancelCategory()}>Cancel</button>
                        <button className="submit-cancel-buttons" type="submit">Submit</button>
                    </div>
                    {this.state.error}
                </form>
            </div>
        )
    }
}