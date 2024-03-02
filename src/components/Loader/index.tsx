import { TailSpin } from 'react-loader-spinner';

export function Loader() {
  return (
    <div className="flex items-center justify-center py-4">
      <TailSpin
        height="80"
        width="80"
        color="#5964e0"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
