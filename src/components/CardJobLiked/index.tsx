import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Heart } from 'lucide-react';
import { Job } from '../../services/models/Job';
import { AppContext, AppContextType } from '../../contexts/AppContext';

interface CardJobLikedProps {
  job: Job;
}
export function CardJobLiked({ job }: CardJobLikedProps) {
  let navigate = useNavigate();

  const { jobs, setJobs, setJob, jobsLiked, setJobsLiked } = useContext(AppContext) as AppContextType;

  function redirect() {
    setJob(job);
    navigate('/job-details');
  }

  function removeJobLiked() {
    const itemsLiked = [...jobsLiked];

    let itemLiked = itemsLiked
      .filter((item) => item.id === job.id)
      .map((item, index) => {
        return {
          index: index,
          id: item.id,
          name: item.name,
          description: item.description,
          company: item.company,
          location: item.location,
          date: item.date,
          liked: false,
        };
      });

    itemsLiked.splice(itemLiked[0].index, 1);
    setJobsLiked(itemsLiked);

    const jobsUpdated = jobs.map((item) => {
      if (item.id === job.id) {
        return { ...item, liked: false };
      }

      return item;
    });
    setJobs(jobsUpdated);
    setJob((job) => {
      job.liked = false;
      return job;
    });
  }

  return (
    <div
      className="bg-white border rounded-lg flex flex-col w-96 overflow-hidden py-5 px-4 hover:cursor-pointer hover:shadow-md transition-all my-2  outline-none focus-visible:ring-1 focus-visible:ring-[#5964e0]"
      tabIndex={0}
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="text-xl font-semibold text-[#000] hover:cursor-pointer hover:underline"
          onClick={redirect}
        >
          {job.name}
        </button>
        <button type="button" className="hover:bg-gray-100 p-2 rounded transition-all" onClick={removeJobLiked}>
          <Heart color="#5964e0" className="fill-[#5964e0]" />
        </button>
      </div>
      <span className="text-sm font-extralight pt-1 text-[#6e8098]">{job.location}</span>
      <span className="text-sm font-extralight text-[#6e8098] pb-1">
        {formatDistanceToNow(job.date, { locale: ptBR, addSuffix: true })}
      </span>
      <span className="text-sm text-[#6e8098] line-clamp-[8]">{job.description}</span>
      <button
        type="button"
        className=" mt-4 text-white font-semibold bg-[#5964e0] hover:bg-[#5a63d3] transition-all rounded p-2"
      >
        Candidatar-se agora
      </button>
    </div>
  );
}
