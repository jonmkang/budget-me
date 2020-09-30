import React from 'react';
import ReactDOM from 'react-dom';
import AddCategory from './AddCategory';
import { BudgetMeProvider } from '../../context/BudgetMeContext';

beforeEach(() => {
  jest.resetModules();
});


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BudgetMeProvider>
    <AddCategory />
  </BudgetMeProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
