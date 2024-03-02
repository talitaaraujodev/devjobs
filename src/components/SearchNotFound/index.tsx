import { useContext } from 'react';
import { AppContext, AppContextType } from '../../contexts/AppContext';

export function SearchNotFound() {
  const { search } = useContext(AppContext) as AppContextType;
  return (
    <span className="text-[#6e8098]">
      A busca: <strong className="text-[#000] font-semibold">{search}</strong> não encontrou nenhum resultado.
    </span>
  );
}
