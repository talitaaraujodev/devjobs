import { ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, AppContextType } from '../../contexts/AppContext';
import { Job } from '../../services/models/Job';
import { InputSearchJobs } from '../../components/InputSearchJobs';
import { CardJob } from '../../components/CardJob';
import { Loader } from '../../components/Loader';
import { SearchNotFound } from '../../components/SearchNotFound';
import { CardJobDetails } from '../../components/CardJobDetails';

export function HomePage() {
  let navigate = useNavigate();

  const { jobs, job, setJob, currentPage, setCurrentPage, showLoader, setShowLoader, search, setSearch } = useContext(
    AppContext,
  ) as AppContextType;

  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  function handleChangeJobs(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setSearch(event.target.value);

    const newFilteredJobs = jobs.filter(
      (job) =>
        job.name.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredJobs(newFilteredJobs);
  }
  const handleSearch = () => {
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
  };

  const showJobDetails = (id: string) => {
    if (window.innerWidth <= 768) return navigate('/job-details');
    const filterJob = jobs.filter((job) => job.id === id);
    setJob(filterJob[0]);
  };

  return (
    <div className="flex flex-col py-4">
      <div className="flex justify-center items-center flex-col md:flex-row">
        <InputSearchJobs placeholder="Pesquisar vagas..." value={search} handleChangeSearchJobs={handleChangeJobs} />
        <button
          className="text-white font-semibold bg-[#5964e0] py-4 px-5 ml-2 rounded cursor-pointer hover:bg-[#5a63d3] transition-all mt-2 w-[24rem] md:mt-0 md:w-[8rem]"
          onClick={handleSearch}
        >
          Pesquisar
        </button>
      </div>
      {showLoader ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-center space-x-0 md:space-x-20 py-4">
            <div className="flex flex-col items-center">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => <CardJob job={job} showJobDetails={showJobDetails} key={index} />)
              ) : filteredJobs.length === 0 && search.length > 0 ? (
                <SearchNotFound />
              ) : (
                jobs.map((job, index) => <CardJob job={job} showJobDetails={showJobDetails} key={index} />)
              )}

              <button
                type="button"
                className="bg-[#5964e0]  hover:bg-[#5a63d3] transition-all text-white p-2 rounded-lg w-full md:w-[24rem] font-semibold my-5"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Ver mais
              </button>
            </div>
            <CardJobDetails job={job} />
          </div>
        </>
      )}
    </div>
  );
}
