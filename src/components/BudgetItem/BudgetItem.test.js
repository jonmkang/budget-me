import React from 'react';
import ReactDOM from 'react-dom';
import BudgetItem from './BudgetItem';
import { BudgetMeProvider } from '../../context/BudgetMeContext';


describe('<BudgetItem/>', ()=> {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BudgetMeProvider>
            <BudgetItem />
          </BudgetMeProvider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})
  


