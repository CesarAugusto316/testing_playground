import { AxiosError } from 'axios';
import { FC, FormEventHandler, useState } from 'react';
import { Drink, drinksService } from '../../services/DrinksService';


const initialDrinksList: Drink[] = [];

export const SearchDrink: FC = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [drinksList, setDrinksList] = useState(initialDrinksList);

  const handleDrinkSearch: FormEventHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    drinksService.get(value)
      .then(drinks => {
        console.log('drinks:', drinks);
        setDrinksList(drinks);
        setError('');
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
        setDrinksList(initialDrinksList);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    setValue('');
  };

  const DrinkList = () => {
    return (
      <div className="space-y-8">
        {drinksList.map(drink => {
          return (
            <div
              className="shadow-md p-6 bg-slate-50 rounded-xl space-y-4"
              key={drink.idDrink}>
              <h2 className="font-bold text-lg">
                {drink.strDrink}
              </h2>
              <img
                className="w-full object-cover h-72"
                src={drink.strDrinkThumb}
                alt={drink.strDrink} />
              <p>{drink.strInstructions}</p>
            </div>
          );
        })}
      </div>
    );
  };


  return (
    <div className="max-w-sm mx-auto pt-20 space-y-12">
      <form
        className="flex flex-col gap-4 px-10"
        onSubmit={handleDrinkSearch}>
        <input
          className="outline-none ring-2 ring-indigo-500 rounded-md p-2"
          type="search"
          name="search"
          placeholder="Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)} />

        <button
          className="bg-indigo-500 text-slate-100
          p-2 uppercase font-bold rounded-md hover:scale-105
          transition-all ease-in-out text-base"
          type="submit">
          search
        </button>
      </form>

      {isLoading && <h2>...isLoading</h2>}
      {!isLoading && !error && drinksList.length > 0 && <DrinkList />}
      {!isLoading && !error && drinksList.length === 0 && <h2>No drinks available</h2>}
      {error && !isLoading && <h2>{error}</h2>}
    </div>
  );
};
