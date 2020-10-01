import React from 'react';
import ReactDOM from 'react-dom';
import BudgetBar from './BudgetBar';
import { BudgetMeProvider } from '../../context/BudgetMeContext';


describe('<BudgetBar/>', ()=> {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BudgetMeProvider>
            <BudgetBar />
          </BudgetMeProvider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})
  


