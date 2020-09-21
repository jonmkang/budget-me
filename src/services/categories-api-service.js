import config from '../config';

const CategoryApiService = {
    getCategories(user_id, setLabels){
        fetch(`${config.API_BASE_URL}/categories/${user_id}`, {
            method: "GET",
          })
            .then(
              res => res.json())
            .then(res => 
              {
                const labels = res.map(item => item.category_title)
                setLabels(labels)
            })
    },
    updateCategoryTitle(user_id, category_title, updated_title, setLabels){
      fetch(`${config.API_BASE_URL}/categories/${user_id}/${category_title}`, {
        method: "PATCH",
        body: JSON.stringify(updated_title),
        headers: {
          "Accept":"application/json",
          'Content-type': 'application/json', 
        }
      })
        .then(res => {
          this.getCategories(user_id, (labels) => setLabels(labels))
        })
    },
    deleteCategory(user_id, category_title, setLabels){
      fetch(`${config.API_BASE_URL}/categories/${user_id}/${category_title}`, {
        method: "DELETE",
      })
        .then(resp => {
          this.getCategories(user_id, (labels) => setLabels(labels))
        })
    },
    addCategory(user_id, category_title, setLabels){
      fetch(`${config.API_BASE_URL}/categories/${user_id}`, {
        method: "POST",
        body: JSON.stringify(category_title),
        headers: {
          "Accept":"application/json",
          'Content-type': 'application/json', 
        }
    })
  }
}

export default CategoryApiService;