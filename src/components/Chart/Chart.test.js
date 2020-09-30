import React from 'react';
import ReactDOM from 'react-dom';
import { BudgetMeProvider } from '../../context/BudgetMeContext';
import Chart from './Chart';

jest.mock('react-chartjs-2', () => ({
    Pie: () => null
}));

describe('<AddItem/>', ()=> {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BudgetMeProvider>
            <Chart/>
          </BudgetMeProvider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})
  
