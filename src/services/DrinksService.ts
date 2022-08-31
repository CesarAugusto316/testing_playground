import axios from 'axios';


export interface Drink {
  idDrink: string
  strCategory: string,
  strDrink: string,
  strDrinkThumb: string,
  strInstructions: string,
  strIngredient1: string,
  strIngredient2: string,
  strIngredient3: string,
  strIngredient4: string,
  strIngredient5: string,
  strMeasure1: string,
  strMeasure2: string,
  strMeasure3: string,
  strMeasure4: string,
  strMeasure5: string,
}

class DrinksService {
  apiUrl = import.meta.env.VITE_DRINKS_API;

  async get(drinkQuery: string): Promise<Drink[]> {
    return new Promise((resolve, reject) => {
      axios.get(this.apiUrl, {
        params: {
          s: drinkQuery
        }
      })
        .then(({ data }) => {
          resolve(data.drinks);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export const drinksService = new DrinksService();
