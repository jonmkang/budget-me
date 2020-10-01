import config from '../config';
import TokenService from '../services/token-service';

const BudgetsApiService = {
    getBudgets(user_id, setMonthlyBudgets){
        fetch(`${config.API_BASE_URL}/budgets/${user_id}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(res => {
                const monthly_budgets = res.map(item => [item.title, item.amount, item.date_create, item.budget_id])
                setMonthlyBudgets(monthly_budgets)
            })
    },
    addBudget(user_id, setMonthlyBudgets, newBudget){
        fetch(`${config.API_BASE_URL}/budgets/${user_id}`, {
            method: "POST",
            body: JSON.stringify(newBudget),
            headers: {
                "Accept":"application/json",
                'Content-type': 'application/json', 
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => res.json())
            .then(res => {
                this.getBudgets(user_id, (monthlyBudgets) => setMonthlyBudgets(monthlyBudgets))
            })
    },
    updateBudgetItem(user_id, setMonthlyBudgets, updatedBudget, budget_id){
        fetch(`${config.API_BASE_URL}/budgets/${user_id}/${budget_id}`, {
            method: "PATCH",
            body: JSON.stringify(updatedBudget),
            headers: {
                "Accept":"application/json",
                'Content-type': 'application/json', 
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => {
                this.getBudgets(user_id, (monthlyBudgets) => setMonthlyBudgets(monthlyBudgets))
            })
    },
    deleteBudgetItem(user_id, budget_id, setMonthlyBudgets){
        return fetch(`${config.API_BASE_URL}/budgets/${user_id}/${budget_id}`, {
          method: 'DELETE',
        })
          .then(res => {
            this.getBudgets(user_id, (monthlyBudgets) => setMonthlyBudgets(monthlyBudgets))
          })
      }
}

export default BudgetsApiService;