import { rest } from 'msw';
import { Drink } from '../services/DrinksService';


export const routeHandlers = [
  rest.get(import.meta.env.VITE_DRINKS_API, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<{ drinks: Drink[] }>({
        drinks: [
          {
            idDrink: '1',
            strDrinkThumb: '../assets/apex461643588115.jpg',
            strDrink: 'test drink',
            strCategory: 'alcoholic',
            strIngredient1: 'ingredient1',
            strIngredient2: 'ingredient2',
            strIngredient3: 'ingredient3',
            strIngredient4: 'ingredient4',
            strIngredient5: 'ingredient5',
            strInstructions: 'instructions test',
            strMeasure1: 'measure1',
            strMeasure2: 'measure2',
            strMeasure3: 'measure3',
            strMeasure4: 'measure4',
            strMeasure5: 'measure15',
          },
          {
            idDrink: '2',
            strDrinkThumb: '../assets/apex461643588115.jpg',
            strDrink: 'test drink',
            strCategory: 'alcoholic',
            strIngredient1: 'ingredient1',
            strIngredient2: 'ingredient2',
            strIngredient3: 'ingredient3',
            strIngredient4: 'ingredient4',
            strIngredient5: 'ingredient5',
            strInstructions: 'instructions test',
            strMeasure1: 'measure1',
            strMeasure2: 'measure2',
            strMeasure3: 'measure3',
            strMeasure4: 'measure4',
            strMeasure5: 'measure15',
          }
        ]
      })
    );
  })
];
