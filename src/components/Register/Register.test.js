import React from 'react';
import ReactDOM from 'react-dom';
import Register from './Register';
import { BudgetMeProvider } from '../../context/BudgetMeContext';


describe('<Register/>', ()=> {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BudgetMeProvider>
            <Register />
          </BudgetMeProvider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})
  
