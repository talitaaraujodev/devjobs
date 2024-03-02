import { Search } from 'lucide-react';
import { ChangeEvent } from 'react';

interface InputSearchJobsProps {
  value: string;
  placeholder: string;
  handleChangeSearchJobs: (event: ChangeEvent<HTMLInputElement>) => void;
}
export function InputSearchJobs(props: InputSearchJobsProps) {
  return (
    <div className="relative">
      <input
        type="text"
        name="search"
        id="search"
        placeholder={props.placeholder}
        className=" border rounded-lg md:rounded-tr-none outline-none pl-10 pt-4 pb-4 pr-4 w-[32rem] focus:border focus:border-[#5964e0] transition-all"
        value={props.value}
        onChange={props.handleChangeSearchJobs}
        tabIndex={0}
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search color="#5964e0" size={25} />
      </div>
    </div>
  );
}
