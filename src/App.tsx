import { FC } from 'react';
import { SearchDrink } from './components';


export const App: FC = () => {

  return (
    <div className="font-mono bg-slate-100 w-full 
    min-h-screen text-slate-600 p-4">
      <SearchDrink />
    </div>
  );
};
