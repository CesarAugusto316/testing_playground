import { FC } from 'react';
import { SearchDrink } from './components';


export const App: FC = () => {

  return (
    <div className="font-mono bg-gray-800 w-full h-screen text-slate-400">
      <h1>Hello World</h1>
      <SearchDrink />
    </div>
  );
};
