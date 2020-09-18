import React, { Component } from 'react';
import BudgetMeContext from '../../context/BudgetMeContext';
import './AddCategory.css';

export default class AddCategory extends Component {
    static contextType = BudgetMeContext;

    constructor(props){
        super(props)

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

    render(){
        return(
            <div ref={this.setWrapperRef}>
                <form onSubmit={(e)=>this.addCategory(e)}>
                    <div>
                        <label>Category Title:</label>
                        <input type="text" name="category-title"/>
                    </div>
                    
                    <div className="submit-cancel-buttons">
                        <button type="button" onClick={()=>this.props.cancelCategory()}>Cancel</button>
                        <button type="submit">Submit</button>
                    </div>
                    
                </form>
            </div>
        )
    }
}