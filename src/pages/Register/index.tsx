import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { utils } from '../../utils';
import { userService } from '../../services/userService';
import { toast } from 'sonner';

export function RegisterPage() {
  const [data, setData] = useState({ name: '', email: '', cpf: '', password: '' });
  let navigate = useNavigate();

  function redirect() {
    return navigate('/login');
  }
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let userData = {
      name: data.name,
      email: data.email,
      cpf: data.cpf.replace(/\D/g, ''),
      password: data.password,
    };
    await userService
      .createUser(userData)
      .then((res) => {
        if (res.errors) {
          toast.error(res.errors[0]);
          return;
        } else {
          console.log(res);
          toast.success(res.message);
          redirect();
        }
      })
      .catch((error) => {
        toast.error('Ocorreram erros internos ao enviar sua solicitação.');
        console.error('Error register:', error);
      });
  }
  return (
    <div className="w-full h-full justify-center fixed  overflow-y-scroll">
      <div className="w-full h-full flex flex-col justify-center items-center relative ">
        <form
          action=""
          method="post"
          className="px-4 py-6 bg-white shadow-md md:w-[31rem] w-[20rem]  border rounded-lg  mt-3 mb-2"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-[#5964e0]  text-2xl md:text-3xl p-1 text-center">devjobs</h1>
          <h2 className="font-bold text-2xl md:text-3xl py-2">Bem-vindo(a)!</h2>
          <span className="text-sm md:text-base text-gray-500">
            Preencha os campos corretamente para criar sua conta.
          </span>
          <div className="flex flex-col">
            <label htmlFor="name" className="py-2 text-base">
              Nome Completo *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full outline-none border rounded-lg p-2 focus:border-[#5964e0] transition-all "
              autoComplete="off"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
              placeholder="Digite seu nome..."
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="py-2 text-base">
              E-mail *
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="w-full outline-none border rounded-lg p-2 focus:border-[#5964e0] transition-all "
              autoComplete="off"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
              placeholder="Digite seu e-mail..."
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="cpf" className="py-2 text-base">
              CPF *
            </label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              className="w-full outline-none border rounded-lg p-2 focus:border-[#5964e0] transition-all "
              autoComplete="off"
              value={data.cpf}
              onChange={(e) => setData({ ...data, cpf: utils.maskCPF(e.target.value) })}
              required
              maxLength={14}
              placeholder="Digite seu cpf..."
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="py-2 text-base">
              Senha *
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full outline-none border rounded-lg p-2 focus:border-[#5964e0] transition-all "
              autoComplete="off"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
              placeholder="Digite seu senha..."
            />
          </div>
          <div className="flex items-center justify-center p-2 ">
            <button
              className="font-medium text-[#5964e0] hover:cursor-pointer transition-all hover:underline"
              onClick={redirect}
              type="button"
            >
              Logar
            </button>
          </div>
          <button
            type="submit"
            className="bg-[#5964e0] w-full rounded-lg text-white text-base p-3 font-semibold hover:bg-[#5a63d3] transition-all"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
