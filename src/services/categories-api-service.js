import config from '../config';

const CategoryApiService = {
    getCategories(user_id, setLabels, setCategories){
        fetch(`${config.API_BASE_URL}/categories/${user_id}`, {
            method: "GET",
          })
            .then(
              res => res.json())
            .then(res => 
              {
                const labels = res.map(item => item.category_title)
                setCategories(res)
                setLabels(labels)
            })
    },
    updateCategoryTitle(user_id, category_title, updated_title, setLabels, setCategories){
      fetch(`${config.API_BASE_URL}/categories/${user_id}/${category_title}`, {
        method: "PATCH",
        body: JSON.stringify(updated_title),
        headers: {
          "Accept":"application/json",
          'Content-type': 'application/json', 
        }
      })
        .then(res => {
          this.getCategories(user_id, (labels) => setLabels(labels), (categories) => setCategories(categories))
        })
    },
    deleteCategory(user_id, category_title, setLabels, setCategories){
      fetch(`${config.API_BASE_URL}/categories/${user_id}/${category_title}`, {
        method: "DELETE",
      })
        .then(resp => {
          this.getCategories(user_id, (labels) => setLabels(labels), (categories) => setCategories(categories))
        })
    },
    addCategory(user_id, category_title, setLabels, setCategories){
      fetch(`${config.API_BASE_URL}/categories/${user_id}`, {
        method: "POST",
        body: JSON.stringify(category_title),
        headers: {
          "Accept":"application/json",
          'Content-type': 'application/json', 
        }
      })
          .then(res => {
            this.getCategories(user_id, (labels) => setLabels(labels), (categories) => setCategories(categories))
          })
    },
    getCategoryByName(user_id, category_title){
      fetch(`${config.API_BASE_URL}/categories/${user_id}/${category_title}`, {
        method: "GET",
      })
        .then(
          res => {
            res.json()
            console.log(res.category)
          })
    }
}

export default CategoryApiService;