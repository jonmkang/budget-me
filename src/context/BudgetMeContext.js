import React, { Component } from 'react'
import config from '../config'

const BudgetMeContext = React.createContext({
    data: [],
    userId: null,
    error: null,
    setError: () => {},
    setUserId: () => {},
    setData: () => {},
    clearError: () => {},
    clearUserId: () => {},
})

export default BudgetMeContext

export class BudgetMeProvider extends Component{
    state={
        data: [],
        error: null,
        userId: null
    }

    setUserId = userId => {
        window.sessionStorage.setItem(config.USER_ID, userId)
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }
    
    clearUserId = () => {
        window.sessionStorage.setItem(config.USER_ID, null)
    }

    setData = data => {
        this.setState({ data: data})
    }

    render() {
        const value = {
            data: this.state.data,
            user_id: this.state.user_id,
            error: this.state.error,
            setUserId: this.setUserId,
            setError: this.setError,
            clearError: this.clearError,
            clearUserId: this.clearUserId,
            setData: this.setData
        }

        return(
            <BudgetMeContext.Provider value={value}>
                {this.props.children}
            </BudgetMeContext.Provider>
        )
    }
}