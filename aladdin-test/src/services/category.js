import axios from "axios";


const Category = {
  getList: () => {
    return axios.get('https://aladdinbtest.azurewebsites.net/api/Articles');
  },
  get: (id) => {
    return axios.get(`https://aladdinbtest.azurewebsites.net/api/Articles/${id}`);
  }
}

export default Category;
