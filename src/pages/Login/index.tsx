import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { toast } from 'sonner';
import { utils } from '../../utils';

export function LoginPage() {
  const [data, setData] = useState({ email: '', password: '' });
  let navigate = useNavigate();

  function redirect() {
    return navigate('/register');
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    await authService
      .login(data)
      .then(async (res) => {
        if (res.errors) {
          toast.error(res.errors[0]);
          return;
        } else {
          const token = res.token;
          const user = res.user;
          utils.setToken(token);
          toast.success('Usuário logado com sucesso!');

          if (user.profile && Object.keys(user.profile).length > 0) {
            navigate('/');
            return;
          }
          navigate('/register-profile');
        }
      })
      .catch((error) => {
        toast.error('Ocorreram erros internos ao enviar sua solicitação.');
        console.error('Error login:', error);
      });
  }

  return (
    <div className="w-full h-full justify-center fixed">
      <div className="w-full h-full flex flex-col justify-center items-center relative overflow-y-auto p-2">
        <form
          action=""
          method="post"
          className="px-4 py-6 bg-white shadow-md md:w-[31rem] w-[20rem]  border rounded-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-[#5964e0]  text-2xl md:text-3xl p-2 text-center">devjobs</h1>
          <h2 className="font-bold text-2xl md:text-3xl py-3">Login</h2>
          <span className="text-sm md:text-base text-gray-500">
            Preencha os campos corretamente para entrar na plataforma.
          </span>
          <div className="flex flex-col">
            <label htmlFor="email" className="py-2">
              E-mail *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full outline-none border rounded-lg p-2 focus:border-[#5964e0] transition-all"
              autoComplete="off"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
              placeholder="Digite seu e-mail..."
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="py-2">
              Senha *
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full outline-none border rounded-lg p-2 focus:border-[#5964e0] transition-all"
              autoComplete="off"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
              placeholder="Digite sua senha..."
            />
          </div>
          <div className="flex items-center justify-center p-2 ">
            <button
              className="font-medium text-[#5964e0] hover:cursor-pointer transition-all hover:underline"
              onClick={redirect}
              type="button"
            >
              Registre-se
            </button>
          </div>
          <button
            type="submit"
            className="bg-[#5964e0] w-full rounded-lg text-white text-base p-3 font-semibold mt-1 hover:bg-[#5a63d3] transition-all"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
