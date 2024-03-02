import { useContext } from 'react';
import { CardJobLiked } from '../../components/CardJobLiked';
import { AppContext, AppContextType } from '../../contexts/AppContext';
import { JobsLikedEmpty } from '../../components/JobsLikedEmpty';

export function JobsLikedPage() {
  const { jobsLiked } = useContext(AppContext) as AppContextType;

  return (
    <div className="flex flex-col justify-center my-12 px-4 md:px-12">
      <h2 className="text-3xl font-semibold py-3 text-left">Vagas Curtidas</h2>
      <div className="w-full border-b mb-4" />
      <>
        {jobsLiked.length === 0 ? (
          <JobsLikedEmpty />
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 md:grid-cols-2 sm:grid-cols-2">
            {jobsLiked.map((jobliked) => {
              return <CardJobLiked job={jobliked} />;
            })}
          </div>
        )}
      </>
    </div>
  );
}
