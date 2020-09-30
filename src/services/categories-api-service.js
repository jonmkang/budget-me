import config from '../config';
import TokenService from '../services/token-service';
import ItemsApiService from './items-api-service';

const CategoryApiService = {
    getCategories(user_id, setLabels, setCategories){
        fetch(`${config.API_BASE_URL}/categories/${user_id}`, {
            method: "GET",
          })
            .then(
              res => res.json())
            .then(res => 
              {
                const labels = res.map(item => item.category_title);
                //sets the inital categories and labels
                //will be used more when users are implemented
                setCategories(res);
                setLabels(labels);
            })
    },
    updateCategoryTitle(user_id, category_title, updated_title, setLabels, setCategories, setBudgetValues){
      fetch(`${config.API_BASE_URL}/categories/${user_id}/${category_title}`, {
        method: "PATCH",
        body: JSON.stringify(updated_title),
        headers: {
          "Accept":"application/json",
          'Content-type': 'application/json', 
          'authorization': `bearer ${TokenService.getAuthToken()}`
        }
      })
        .then(res => {
          //resets the context based off the updated category
          this.getCategories(user_id, (labels) => setLabels(labels), (categories) => setCategories(categories));
          ItemsApiService.getItems(user_id, values => setBudgetValues(values));
        })
    },
    deleteCategory(user_id, category_title, setLabels, setCategories, setBudgetValues){
      fetch(`${config.API_BASE_URL}/categories/${user_id}/${category_title}`, {
        method: "DELETE",
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`
        }
      })
        .then(resp => {
          //resets cnotext based off the deleted category
          this.getCategories(user_id, (labels) => setLabels(labels), (categories) => setCategories(categories));
          ItemsApiService.getItems(user_id, (values) => setBudgetValues(values));
        })
    },
    addCategory(user_id, category_title, setLabels, setCategories){
      fetch(`${config.API_BASE_URL}/categories/${user_id}`, {
        method: "POST",
        body: JSON.stringify(category_title),
        headers: {
          "Accept":"application/json",
          'Content-type': 'application/json', 
          'authorization': `bearer ${TokenService.getAuthToken()}`
        }
      })
          .then(res => {
            //resets the context based off the added category
            this.getCategories(user_id, (labels) => setLabels(labels), (categories) => setCategories(categories));
          })
    },
    getCategoryByName(user_id, category_title){
      fetch(`${config.API_BASE_URL}/categories/${user_id}/${category_title}`, {
        method: "GET",
        headers:{
          'authorization': `bearer ${TokenService.getAuthToken()}`
        }
      })
        .then(
          res => {
            res.json();
          })
    }
}

export default CategoryApiService;