import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import { BudgetMeProvider } from '../../context/BudgetMeContext';


describe('<Login/>', ()=> {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BudgetMeProvider>
            <Login />
          </BudgetMeProvider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})
  
