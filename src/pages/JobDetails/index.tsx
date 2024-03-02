import { useContext } from 'react';
import { AppContext, AppContextType } from '../../contexts/AppContext';
import { MapPinned } from 'lucide-react';

export function JobDetailsPage() {
  const { job } = useContext(AppContext) as AppContextType;

  return (
    <div className="flex justify-center py-12">
      <div
        className="flex flex-col bg-white w-[40rem] rounded-lg py-4 px-5 hover:cursor-pointer border outline-none focus-visible:ring-1 focus-visible:ring-[#5964e0]"
        tabIndex={0}
      >
        <span className="text-gray-500 pb-2">{job.location}</span>
        <div className="flex md:flex-row flex-col justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold">{job.name}</h2>
          <button
            type="button"
            className="bg-[#5964e0] rounded text-white font-semibold p-3 text-base hover:bg-[#5a63d3] transition-all md:w-[10rem] md:mt-0 w-full mt-2"
          >
            Candidatar-se
          </button>
        </div>
        <strong className="text-lg text-[#5964e0] font-semibold pt-2 pb-6">{job.company}</strong>
        <h2 className="text-xl md:text-2xl font-bold py-2">Descrição</h2>
        <span className="text-lg text-[#6e8098]">{job.description}</span>
        <h2 className="text-xl md:text-2xl font-bold py-2">Localização</h2>
        <div className="flex items-center justify-start py-2">
          <MapPinned color="#5964e0" size={24} className="mr-2" />
          <span className="text-lg text-[#6e8098]">{job.location}</span>
        </div>
      </div>
    </div>
  );
}
