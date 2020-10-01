import React, { Component } from 'react';
import './Item.css'
import BudgetMeContext from '../../context/BudgetMeContext';
import ItemsApiService from '../../services/items-api-service';

export default class Item extends Component{
    static contextType = BudgetMeContext;

    constructor(props){
        super(props)
        this.state={
            active: false,
            handleDelete: false,
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
            this.props.handleOutsideClick();
            this.props.handleEditingItem();
            this.setState({
                handleDelete: false
            });
            this.handleCancel();
        }
    };

    
    handleItem = () => {
        this.props.handleEditingItem();

        this.setState({
            active: true
        });
    }

    handleCancel = () => {
        this.setState({ 
            active: false
        });
        this.props.handleEditingItem();
    }

    handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const handleDelete = !this.state.handleDelete;
        this.setState({
            handleDelete
        });
    }

    submitDelete = e => {
        const item_id = this.props.item[2];

        ItemsApiService.deleteItem(item_id, this.context.user_id, (values)=> this.context.setBudgetValues(values));

        this.handleCancel();
    }

    updateItem = e => {
        e.preventDefault();
        const { setItem, createData } = this.context;
        const { purchase, amount } = e.target;

        if(amount.value <= 0){
            return this.setState({
                error: "You must pick a number larger than 0"
            });
        };

        let item_id = this.props.item[2];
        let itemInfo = [this.props.category, this.props.index, [purchase.value, parseInt(amount.value), item_id]];
        
        //creates object to push to database
        const itemObj = {
            item_id: item_id,
            amount: parseInt(amount.value),
            user_id: this.context.user_id,
            category_id: this.context.categories[this.props.category.split('_').join(' ')].category_id
        };
        
        ItemsApiService.editItem(itemObj, this.context.user_id);
        setItem(itemInfo);

        //resets data values based off of the new created item
        const { chartData, budget_values } = this.context;
        createData(chartData.labels, budget_values);
        this.handleCancel();
    }

    render(){
        const item = this.props.item;
        const title = item[0].split('_').join(' ');
        
        if(title === "Leftover budget"){
            return(
                <></>
            )
        };

        if(this.state.active && this.props.editingItem){
            return(
                <li className="list-edit" ref={this.setWrapperRef}>
                    <form onSubmit={(e)=>this.updateItem(e)} className="item-edit-box">

                        <div className="edit-labels">
                            <label htmlFor="purchase">Purchase: </label>
                            <input type="text" name="purchase" defaultValue={title}/>
                        </div>

                        <div className="edit-labels">
                            <label htmlFor="amount">Amount: </label>
                            <input type="number" name="amount" defaultValue={item[1]}/>
                        </div>
                        <div>
                            {this.state.error}
                        </div>

                        {
                            this.state.handleDelete ? 
                            <div className="edit-labels">
                                <p>Confirm Delete?</p>

                                <button 
                                    className="submit-cancel-buttons"
                                    onClick={(e)=>this.handleDelete(e)}>
                                        No
                                        </button>
                                <button 
                                    className="submit-cancel-buttons"
                                    onClick={()=>this.submitDelete()}>
                                        Yes
                                        </button>
                            </div> 
                                :
                            <div className="edit-labels">
                                <button 
                                    className="submit-cancel-buttons" 
                                    type="button" 
                                    onClick={()=>this.handleCancel()}>
                                        Cancel
                                    </button>

                                
                                <button
                                    className="submit-cancel-buttons" 
                                    type="button"
                                    onClick={(e)=>this.handleDelete(e)}>
                                        Delete Item
                                    </button>
                                

                                <button 
                                    className="submit-cancel-buttons" 
                                    type="submit" >
                                        Save Changes
                                    </button>
                            </div>
                        }
                    </form>
                </li>
            )
        };
        
        if(!this.props.editingItem){
            return(
                <li className="item" 
                    onClick={()=>this.handleItem()} >
                    {title}: ${item[1]} 
                </li>
            )
        };
        
        return(
            <></>
        )
    }
}