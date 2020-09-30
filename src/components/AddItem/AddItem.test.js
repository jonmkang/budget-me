import React from 'react';
import ReactDOM from 'react-dom';
import AddItem from './AddItem';
import { BudgetMeProvider } from '../../context/BudgetMeContext';


describe('<AddItem/>', ()=> {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BudgetMeProvider>
            <AddItem />
          </BudgetMeProvider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})
  


