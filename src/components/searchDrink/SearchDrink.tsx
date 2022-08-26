import { FC, FormEventHandler } from 'react';


export const SearchDrink: FC = () => {

  const handleDrinkSearch: FormEventHandler = (e) => {
    e.preventDefault();
    console.log('hello', e);
  };


  return (
    <form onSubmit={handleDrinkSearch}>
      <input type="search" name="" id="" />
    </form>
  );
};
