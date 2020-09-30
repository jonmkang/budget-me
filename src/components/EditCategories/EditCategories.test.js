import React from 'react';
import ReactDOM from 'react-dom';
import { BudgetMeProvider } from '../../context/BudgetMeContext';
import EditCategories from './EditCategories';

describe('<AddItem/>', ()=> {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BudgetMeProvider>
            <EditCategories/>
          </BudgetMeProvider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})
  
