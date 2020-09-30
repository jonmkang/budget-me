import React from 'react';
import ReactDOM from 'react-dom';
import { BudgetMeProvider } from '../../context/BudgetMeContext';
import CategoryItem from './CategoryItem';

describe('<AddItem/>', ()=> {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BudgetMeProvider>
            <CategoryItem/>
          </BudgetMeProvider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})
  
