import React from 'react';
import ReactDOM from 'react-dom';
import { BudgetMeProvider } from '../../context/BudgetMeContext';
import Category from './Category';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BudgetMeProvider>
    <Category/>
  </BudgetMeProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
