import { useContext } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { AppContext, AppContextType } from '../../contexts/AppContext';
import { utils } from '../../utils';

export function ProfilePage() {
  const { userLogged } = useContext(AppContext) as AppContextType;
  const user = { ...userLogged };

  const name = String(user?.name);
  const index = name.indexOf(' ');
  const firstLetterName = name.charAt(0).toLowerCase();
  const secondLetterName = name.charAt(index + 1).toLowerCase();

  const username = `${firstLetterName.toUpperCase()}${secondLetterName.toUpperCase()}`;

  return (
    <div className="flex flex-col justify-center items-center py-12 px-4">
      <div className="rounded-full p-5 uppercase text-white bg-[#5964e0] text-3xl font-bold">
        <h2>{username}</h2>
      </div>
      <form action="" method="post">
        <div className="flex flex-col p-2">
          <label htmlFor="name" className="py-2 px-1 md:ml-0 ml-2">
            Nome *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="p-2 rounded-lg md:w-96 w-80 outline-none border focus:border-[#5964e0] md:ml-0 ml-2"
            value={user.name}
          />
        </div>
        <div className="flex flex-col p-1">
          <label htmlFor="birth-date" className="py-2 px-1 md:ml-0 ml-2">
            Data de nascimento *
          </label>
          <input
            type="text"
            name="birth-date"
            id="birth-date"
            className="p-2 rounded-lg  md:w-96 w-80 outline-none border focus:border-[#5964e0] md:ml-0 ml-2"
            value={user.profile?.birthDate ? format(user.profile?.birthDate, 'dd/MM/yyyy', { locale: ptBR }) : ''}
          />
        </div>
        <div className="flex flex-col p-1">
          <label htmlFor="email" className="py-2 px-1 md:ml-0 ml-2">
            E-mail *
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="p-2 rounded-lg  md:w-96 w-80 outline-none border focus:border-[#5964e0] md:ml-0 ml-2"
            value={user.email}
          />
        </div>
        <div className="flex flex-col p-1">
          <label htmlFor="phone" className="py-2 px-1 md:ml-0 ml-2">
            Celular *
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="p-2 rounded-lg  md:w-96 w-80 outline-none border focus:border-[#5964e0] md:ml-0 ml-2"
            value={utils.maskPhone(user.profile?.phone)}
          />
        </div>
        <div className="flex flex-col p-1">
          <label htmlFor="cpf" className="py-2 px-1 md:ml-0 ml-2">
            CPF *
          </label>
          <input
            type="text"
            name="cpf"
            id="cpf"
            className="p-2 rounded-lg  md:w-96 w-80 outline-none border focus:border-[#5964e0] md:ml-0 ml-2"
            value={utils.maskCPF(user.cpf)}
          />
        </div>
        <div className="flex flex-col p-1">
          <label htmlFor="status-civil" className="py-2 px-1 md:ml-0 ml-2">
            Status Civil *
          </label>
          <select
            name="status-civil"
            id="status-civil"
            className="p-2 rounded-lg  md:w-96 w-80 outline-none border focus:border-[#5964e0] md:ml-0 ml-2"
          >
            <option selected value={user.profile?.statusCivil}>
              {user.profile?.statusCivil === 'SINGLE'
                ? utils.statusCivilType.single
                : user.profile?.statusCivil === 'MARRIED'
                  ? utils.statusCivilType.married
                  : user.profile?.statusCivil === 'DIVORCED'
                    ? utils.statusCivilType.divorced
                    : utils.statusCivilType.widowed}
            </option>
          </select>
        </div>
        <div className="flex flex-col p-1">
          <label htmlFor="file-curriculo" className="py-2 px-1 md:ml-0 ml-2">
            Currículo *
          </label>
          <input
            className="relative m-0 block w-full min-w-0 flex-auto rounded border px-3 py-[0.32rem] text-base font-normal transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            type="file"
            id="file-curriculo"
            name="file-curriculo"
            accept=".pdf, .doc, .docx"
            value={''}
          />
        </div>
        <button
          type="submit"
          className="w-full text-white font-semibold p-2 rounded-lg bg-[#5964e0] hover:bg-[#5a63d3] transition-all  mt-4"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
