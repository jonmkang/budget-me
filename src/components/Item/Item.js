import React, { Component } from 'react';
import './Item.css'
import BudgetMeContext from '../../context/BudgetMeContext';
import ItemApiService from '../../services/items-api-service';

export default class Item extends Component{
    static contextType = BudgetMeContext;

    constructor(props){
        super(props)
        this.state={
            active: false
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
            this.props.handleOutsideClick()
            this.props.handleEditingItem();
            this.handleCancel()
        }
    };

    
    handleItem = () => {
        this.props.handleEditingItem();

        this.setState({
            active: true
        })
    }

    handleCancel = () => {
        this.setState({ 
            active: false
        })
        this.props.handleEditingItem();
    }

    updateItem = e => {
        e.preventDefault();
        const { setItem, createData, user_id } = this.context;
        const { purchase, amount } = e.target
        console.log(this.props)
        
        let itemInfo = [this.props.category, this.props.index, [purchase.value, parseInt(amount.value), this.props.item.item_id]];

        setItem(itemInfo);


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
        }

        if(this.state.active && this.props.editingItem){
            return(
                <li className="list-edit" ref={this.setWrapperRef}>
                    <form onSubmit={(e)=>this.updateItem(e)} className="item-edit-box">

                        <div className="edit-labels">
                            <label>Purchase: </label>
                            <input type="text" name="purchase" defaultValue={title}/>
                        </div>

                        <div className="edit-labels">
                            <label>Amount: </label>
                            <input type="int" name="amount" defaultValue={item[1]}/>
                        </div>

                        <div className="edit-labels">
                            <button 
                                className="submit-cancel-buttons" 
                                type="button" 
                                onClick={()=>this.handleCancel()}>
                                    Cancel
                                </button>

                            <button 
                                className="submit-cancel-buttons" 
                                type="submit" >
                                    Save Changes
                                </button>
                        </div>
                    </form>
                </li>
            )
        }
        
        if(!this.props.editingItem){
            return(
                <li className="item" 
                    onClick={()=>this.handleItem()} >
                    {title}: ${item[1]} 
                </li>
            )
        }
        
        return(
            <></>
        )
    }
}