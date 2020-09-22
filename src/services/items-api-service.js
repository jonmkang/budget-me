import config from '../config';

const ItemsApiService = {
    getItems(user_id,  setBudgetValues){
        fetch(`${config.API_BASE_URL}/items/${user_id}`, {
            method: "GET"
          })
            .then(
              res => res.json())
            .then(res => 
              { 
                const values_arr = res.map(item => [item.item_name, item.amount, item.category_title, item.item_id])
                setBudgetValues(values_arr)
              }
            )
    },
    editItem(item,  user_id){
      return fetch(`${config.API_BASE_URL}/items/${user_id}/${item.item_id}`, {
        method: 'PATCH',
        body: JSON.stringify(item),
        headers:{
          "Accept":"application/json",
          'Content-type': 'application/json', 
        }
      })
    },
    addItem(item, user_id, addItem,  setBudgetValues){
      return fetch(`${config.API_BASE_URL}/items/${user_id}`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers:{
          "Accept":"application/json",
          'Content-type': 'application/json', 
        }
      })
        .then(res => res.json())
        .then(res => {
          addItem(item.category_id, item.item_name, item.amount)
          this.getItems(user_id, setBudgetValues)
        })
    },
    deleteItem(item_id, user_id, setBudgetValues){
      return fetch(`${config.API_BASE_URL}/items/${user_id}/${item_id}`, {
        method: 'DELETE',
      })
        .then(res => {
          this.getItems(user_id, setBudgetValues)
        })
    }
}

export default ItemsApiService;