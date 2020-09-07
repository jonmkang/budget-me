import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class Menu extends Component{
    constructor(){
        super()
        this.state={
            menuOpen: false
        };
        this.wrapper = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }
    
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }
    
    handleClickOutside = event => {
        const domNode = ReactDOM.findDOMNode(this.wrapperRef);
    
        if (!domNode || !domNode.contains(event.target)) {
            this.setState({
                menuOpen: false
            });
        }
    }
    
    setMenu = e => {
        const menuOpen = !this.state.menuOpen
        this.setState({
            menuOpen: menuOpen
        })
    }

    menuButtons = e => {
        return (
            <div>
                <Link to='/'>Home</Link>
                <Link to='/'>Login</Link>
                <Link to='/'>Register</Link>
            </div>
        )
    }

    render(){
        return(
            <div className="headerMenu">
                    {this.state.menuOpen ? this.menuButtons() : <img onClick={()=>this.setMenu()} src="https://img.icons8.com/fluent/48/000000/menu--v1.png" alt="Menu"/> }
            </div>
        )
    }
}