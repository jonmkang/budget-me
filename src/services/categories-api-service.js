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
    updateCategoryTitle(user_id, category_title, updated_title){
      fetch(`${config.API_BASE_URL}/categories/${user_id}/${category_title}`, {
        method: "PATCH",
        body: JSON.stringify(updated_title),
        headers: {
          "Accept":"application/json",
          'Content-type': 'application/json', 
        }
      })
    }
}

export default CategoryApiService;