import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Job } from '../../services/models/Job';

interface CardJobProps {
  job: Job;
  showJobDetails: (id: string) => void;
}
export function CardJob({ job, showJobDetails }: CardJobProps) {
  return (
    <div
      className="bg-white border rounded-lg flex flex-col items-start p-2 w-96 overflow-hidden py-5 px-4 hover:cursor-pointer hover:shadow-md transition-all my-2  outline-none focus-visible:ring-1 focus-visible:ring-[#5964e0]"
      tabIndex={0}
    >
      <button
        type="button"
        onClick={() => showJobDetails(job.id)}
        className="outline-none text-xl font-semibold text-[#000] hover:cursor-pointer hover:underline"
      >
        {job.name}
      </button>
      <span className="text-sm font-extralight pt-1 text-[#6e8098]">{job.location}</span>
      <span className="text-sm font-extralight text-[#6e8098] pb-1">
        {formatDistanceToNow(job.date, { locale: ptBR, addSuffix: true })}
      </span>
      <span className="text-sm text-[#6e8098] line-clamp-[8]">{job.description}</span>
    </div>
  );
}
