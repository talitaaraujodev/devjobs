import { useContext } from 'react';
import { Heart, MapPinned } from 'lucide-react';
import { Job } from '../../services/models/Job';
import { AppContext, AppContextType } from '../../contexts/AppContext';

interface CardJobDetailsProps {
  job: Job;
}
export function CardJobDetails({ job }: CardJobDetailsProps) {
  const { jobs, setJobs, setJob, jobsLiked, setJobsLiked } = useContext(AppContext) as AppContextType;

  function adcJobLiked() {
    const jobsUpdated = jobs.map((item) => {
      if (item.id === job.id) {
        return { ...item, liked: true };
      }

      return item;
    });
    setJobs(jobsUpdated);
    setJob((job) => {
      job.liked = true;
      return job;
    });

    setJobsLiked([
      ...jobsLiked,
      {
        id: job.id,
        name: job.name,
        description: job.description,
        company: job.company,
        location: job.location,
        date: job.date,
        liked: true,
      },
    ]);
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
    // remove itemLiked on jobsLiked
    itemsLiked.splice(itemLiked[0].index, 1);
    setJobsLiked(itemsLiked);

    // update jobs and job
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
      className="flex-col bg-white border-2 rounded-lg cursor-pointer py-5 px-4 w-[28rem] h-[32rem] focus-visible:ring-1 focus-visible:ring-[#5964e0] outline-none hidden md:flex"
      tabIndex={0}
    >
      <h3 className="text-lg font-semibold text-[#000]">{job.name}</h3>
      <span className="text-sm font-extralight pt-1 text-[#6e8098] pb-1">{job.company}</span>
      <div className="flex items-center mb-3 justify-between">
        <button
          type="button"
          className="bg-[#5964e0] font-semibold text-center text-base text-white rounded-lg py-2 px-3 hover:bg-[#5a63d3] hover:cursor-pointer hover:transition-all"
        >
          Candidatar-se
        </button>
        {job.liked ? (
          <button type="button" className="bg-white hover:transition-all" onClick={() => removeJobLiked()}>
            <Heart color="#5964e0" className="fill-[#5964e0] hover:fill-none" />
          </button>
        ) : (
          <button type="button" className="bg-white hover:transition-all" onClick={() => adcJobLiked()}>
            <Heart color="#5964e0" className="hover:fill-[#5964e0]" />
          </button>
        )}
      </div>
      <div className="border-b w-full" />
      <div className="overflow-y-auto overflow-x-hidden py-2">
        <h2 className="text-xl font-semibold text-[#000] ">Descrição</h2>
        <span className="text-[#6e8098]">{job.description}</span>
        <div className="border-b w-full pt-4" />
        <h2 className="text-xl font-semibold text-[#000] py-1">Localização</h2>
        <div className="flex items-center justify-start py-2">
          <MapPinned color="#5964e0" size={22} className="mr-1" />
          <span className="text-[#6e8098]">{job.location}</span>
        </div>
        <div className="border-b w-full pt-4" />
      </div>
    </div>
  );
}
