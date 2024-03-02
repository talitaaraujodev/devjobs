import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AlertCircle, CircleUserRound, Heart, LogOutIcon, User, X } from 'lucide-react';
import { confirmAlert } from 'react-confirm-alert';
import { utils } from '../../utils';
import { userService } from '../../services/userService';
import { AppContext, AppContextType } from '../../contexts/AppContext';

export function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  let navigate = useNavigate();

  const { setUserLogged } = useContext(AppContext) as AppContextType;

  const toggleDropdown = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  async function me() {
    await userService
      .getUserLogged()
      .then((res) => {
        setUserLogged(res);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    me();
  }, []);

  function logout() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className=" w-full h-full md:w-[30rem] md:h-[16rem] flex flex-col justify-between bg-white rounded-lg shadow dark:bg-gray-700 p-4">
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-all"
                onClick={onClose}
              >
                <X color="#9ca3af" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center px-2 py-4">
              <AlertCircle color="#5964e0" size={52} />
              <h2 className="text-center font-medium text-xl md:text-2xl ">Tem certeza que deseja sair?</h2>
              <span className="text-center text-base font-normal">Para prosseguir clique no botão "Sim, sair".</span>
            </div>
            <div className="w-full border-b" />
            <div className="flex justify-end items-center  p-3">
              <button
                className="bg-[#5964e0] text-white font-semibold py-2 px-4 rounded hover:opacity-90 hover:cursor-pointer transition-all"
                onClick={() => {
                  utils.setToken('');
                  setUserLogged({});
                  navigate('/login');
                  onClose();
                }}
              >
                Sim, sair
              </button>
              <button
                className=" bg-gray-400 text-white font-semibold py-2  px-4 rounded ml-2 hover:opacity-90 hover:cursor-pointer transition-all"
                onClick={onClose}
              >
                Voltar
              </button>
            </div>
          </div>
        );
      },
    });
  }

  return (
    <>
      <div className="relative bg-[url('./assets/bg-pattern-header.svg')] bg-no-repeat min-h-[12rem] w-full bg-cover flex flex-col justify-center">
        <div className="flex justify-between items-center">
          <Link className="text-white font-bold text-4xl pl-14 hover:cursor-pointer" to={'/'}>
            devjobs
          </Link>
          <div className="flex pr-2">
            <button type="button" onClick={toggleDropdown} className="hover:opacity-85 transition-all ">
              <CircleUserRound color="#fff" className="mr-2" size={25} />
            </button>
            {isOpenMenu && (
              <div className="origin-top-right absolute right-0 mt-8 mr-1 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <li className="block px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div className="flex justify-start items-center space-x-2">
                      <User color="#5964e0" />
                      <NavLink to={'/profile'}>Meu Perfil</NavLink>
                    </div>
                  </li>
                  <li className="block px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div className="flex justify-start items-center space-x-2">
                      <Heart color="#5964e0" />
                      <NavLink to={'/jobs-liked'}>Minhas Vagas</NavLink>
                    </div>
                  </li>
                </div>
              </div>
            )}
            <button type="button" className="hover:opacity-85 transition-all">
              <LogOutIcon color="#fff" size={25} onClick={logout} />
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
