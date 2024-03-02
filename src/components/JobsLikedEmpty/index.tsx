import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function JobsLikedEmpty() {
  let navigate = useNavigate();
  function redirect() {
    navigate('/');
  }
  return (
    <div className="flex flex-col items-center jutify-center space-y-2 pt-2">
      <h3 className="text-xl font-semibold">Nenhuma vaga curtida ainda</h3>
      <span className="text-[#6e8098] text-base">As vagas curtidas aparecem aqui.</span>
      <button
        type="button"
        className="flex flex-row items-center text-white font-semibold bg-[#5964e0] rounded-lg p-3 text-base"
        onClick={redirect}
      >
        Buscar vagas <ArrowRight />
      </button>
    </div>
  );
}
