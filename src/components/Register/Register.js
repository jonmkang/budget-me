import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import './Register.css';

export default class Register extends Component{
    constructor(props){
        super()
        this.state={
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
            this.props.cancelRegister();
        };
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    validatePassword(password) {
        const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]/;
        
        if (password.length < 8) {
            this.setState({ error: 'Password must be longer than 8 characters'});
            return false;
        }
        if (password.length > 72) {
            this.setState({ error: 'Password must be less than 72 characters'})
            return false;
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            this.setState({ error: 'Password must not start or end with empty spaces'});
            return false;
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
            this.setState({ error: 'Password must contain 1 upper case, lower case, number and special character'})
            return false;
        }
        return true;
    }

    handleRegister = e => {
        e.preventDefault();
        const { register_email, register_password, register_confirm} = e.target;
        this.setState({
            error: null
        });
        
        if(!this.validateEmail(register_email.value)){
            this.setState({ error: "You must enter a valid email to register"});
            return ;
        };

        if(!this.validatePassword(register_password.value)){
            return;
        };

        
        if(register_password.value !== register_confirm.value){
            this.setState({
                error: 'Passwords do not match, try again'
            });
            return;
        };
        
        const new_user = { 
            user_password: register_password.value,
            user_email: register_email.value
        };

        AuthApiService.postUser(new_user)
            .then(user => {
                AuthApiService.postLogin(new_user);
            })
            .catch(res=> {
                this.setState({
                    error: res.error
                })
            })

        this.setState({
            error: ''
        })
        this.props.cancelRegister()
    }

    render(){
        return(
            <div className="register-container" ref={this.setWrapperRef}>
                <form 
                    className="register-form"
                    onSubmit={(e)=>this.handleRegister(e)}
                    >
                    <div  className="register-form-inputs">
                        <label htmlFor="register_email">Email:</label>
                        <input id='register_email' name='register_email'/>
                    </div>
                    <div className="register-form-inputs">
                        <label htmlFor="register_password">Password:</label>
                        <input type="password" id='register_password' name='register_password'/>
                    </div>
                    <div className="register-form-inputs">
                        <label htmlFor="register_confirm">Confirm Password:</label>
                        <input type="password" id='register_confirm' name='register_confirm'/>
                    </div>
                    <p className="error">{this.state.error}</p>
                    <div className="register-form-inputs">
                        <button className="register-button" type="button" onClick={()=>this.props.cancelRegister()}>Cancel</button>
                        <button className="register-button" type="submit" onSubmit={(e)=>this.handleRegister(e)}>Register</button>
                    </div>
                </form>
            </div>
        )
    }
}