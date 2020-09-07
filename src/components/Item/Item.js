import React, { Component } from 'react';
import './Item.css'

export default class Item extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const item = this.props.item;
        const title = item[0].split('_').join(' ')
        return(
            
            <li className='item'>
                {title}: ${item[1]} 
            </li>
        )
    }
}