import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { Job } from '../services/models/Job';
import { jobService } from '../services/jobService';
import { environment } from '../environments/environment';

export interface AppContextType {
  job: Job;
  setJob: Dispatch<SetStateAction<Job>>;
  jobs: Job[];
  setJobs: Dispatch<SetStateAction<Job[]>>;
  jobsLiked: Job[];
  setJobsLiked: Dispatch<SetStateAction<Job[]>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  showLoader: boolean;
  setShowLoader: Dispatch<SetStateAction<boolean>>;
  userLogged: any;
  setUserLogged: Dispatch<SetStateAction<any>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}
export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: any) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [userLogged, setUserLogged] = useState<{}>({});
  const [search, setSearch] = useState('');
  const [job, setJob] = useState<Job>({
    id: '',
    name: '',
    description: '',
    company: '',
    location: '',
    date: new Date(0),
    liked: false,
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLiked, setJobsLiked] = useState<Job[]>([]);

  const loadJobs = async () => {
    setShowLoader(true);

    let url = `${environment.apiAdzunaURL}/${currentPage}?app_id=${environment.idAdzunaAPI}&app_key=${environment.secretAdzunaAPI}&content-type=application/json`;
    url += `&title_only=Desenvolvedor`;

    await jobService
      .getJobs(url)
      .then((res) => {
        const result = res.results;
        const data = result.map((job: any) => {
          return {
            id: job.id,
            name: job.title,
            description: job.description,
            company: job.company.display_name,
            location: job.location.display_name,
            date: job.created,
            liked: false,
          };
        });
        if (jobs.length === 0) {
          setJobs(data);
          setShowLoader(!true);
        } else if (jobs.length >= 10) {
          setJobs((prevJobs) => [...prevJobs, ...data]);
          setShowLoader(!true);
        }
        setJob(data[0]);
      })
      .catch((error) => {
        setShowLoader(!true);
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    loadJobs();
  }, [currentPage]);

  return (
    <AppContext.Provider
      value={{
        job,
        setJob,
        jobs,
        setJobs,
        jobsLiked,
        setJobsLiked,
        currentPage,
        setCurrentPage,
        showLoader,
        setShowLoader,
        userLogged,
        setUserLogged,
        search,
        setSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
