import React from 'react';
import ReactDOM from 'react-dom';
import { BudgetMeProvider } from '../../context/BudgetMeContext';
import Header from './Header';

describe('<AddItem/>', ()=> {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BudgetMeProvider>
            <Header/>
          </BudgetMeProvider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})
  
