import { KeyboardEvent, useContext, useState } from 'react';
import { utils } from '../../utils';
import { environment } from '../../environments/environment';
import { profileService } from '../../services/profileService';
import { AppContext, AppContextType } from '../../contexts/AppContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function FinalizeProfilePage() {
  let navigate = useNavigate();
  const { userLogged } = useContext(AppContext) as AppContextType;
  const [data, setData] = useState<any>({
    birthDate: '',
    phone: '',
    statusCivil: '',
    address: {
      cep: '',
      logradouro: '',
      number: '',
      bairro: '',
    },
    file: null,
  });

  const handleSearchAddress = async () => {
    try {
      const response = await fetch(`${environment.apiCorreiosURL}/${data.address.cep}/json`, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
        mode: 'cors',
      });
      const result = await response.json();

      if (response.ok) {
        setData({ ...data, address: { ...data.address, logradouro: result.logradouro, bairro: result.bairro } });
      } else {
        toast.error('CEP não foi encontrado, verifique o CEP e tente novamente.');
        return;
      }
    } catch (error) {
      toast.error('CEP não foi encontrado, verifique o CEP e tente novamente.');
      console.error('Erro ao buscar endereço:', error);
    }
  };

  const handleKeyDownSearchAddress = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') await handleSearchAddress();
    return null;
  };
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('birthDate', utils.convertToISODate(data.birthDate));
    formData.append('phone', data.phone.replace(/\D/g, ''));
    formData.append('cep', data.address.cep.replace(/\D/g, ''));
    formData.append('logradouro', data.address.logradouro);
    formData.append('number', data.address.number);
    formData.append('bairro', data.address.bairro);
    formData.append('statusCivil', data.statusCivil);
    formData.append('userId', userLogged.id);

    if (data.file) {
      formData.append('file', data.file, data.file?.name);
    }
    await profileService
      .createProfile(formData)
      .then((res) => {
        if (res.errors) {
          toast.error(res.errors[0]);
          return;
        } else {
          toast.success(res.message);
          navigate('/');
        }
      })
      .catch((error) => {
        toast.error('Ocorreram erros internos ao enviar sua solicitação.');
        console.error('error:', error);
      });
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = event.target.files?.[0];
    setData({ ...data, file: file });
  };

  return (
    <div className="flex flex-col my-7 mx-auto px-4 md:px-12">
      <h2 className="text-3xl font-semibold py-3 text-left">Finalizar Perfil</h2>
      <div className="w-full border-b mb-3" />
      <form action="" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className=" flex flex-col py-2">
          <label htmlFor="phone" className="pb-2">
            Data de nascimento *
          </label>
          <input
            type="text"
            name="birth-date"
            id="birth-date"
            className="p-3 rounded-lg border outline-none focus:border-[#5964e0] transition-all w-96"
            value={data.birthDate}
            onChange={(e) => setData({ ...data, birthDate: utils.maskDate(e.target.value) })}
            maxLength={10}
            required
            placeholder="Digite sua data de nascimento..."
          />
        </div>
        <div className=" flex flex-col py-2">
          <label htmlFor="phone" className="pb-2">
            Celular *
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="p-3 rounded-lg border outline-none focus:border-[#5964e0] transition-all w-96"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: utils.maskPhone(e.target.value) })}
            maxLength={15}
            required
            placeholder="Digite seu celular..."
          />
        </div>
        <div className=" flex flex-col py-2">
          <label htmlFor="status-civil" className="pb-2">
            Status Civil *
          </label>
          <select
            name="status-civil"
            id="status-civil"
            className="p-3 rounded-lg border outline-none focus:border-[#5964e0] transition-all  w-96"
            value={data.statusCivil}
            onChange={(e) => setData({ ...data, statusCivil: e.target.value })}
            required
          >
            <option value="">Selecione o estado civil</option>
            {utils.statusCivil.map((status) => {
              return (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className=" flex flex-col py-2">
          <label htmlFor="cep" className="pb-2">
            CEP *
          </label>
          <input
            type="text"
            name="cep"
            id="cep"
            className="p-3 rounded-lg border outline-none focus:border-[#5964e0] transition-all w-96"
            value={data.address.cep}
            onChange={(e) => setData({ ...data, address: { ...data.address, cep: utils.maskCEP(e.target.value) } })}
            onKeyDown={(e) => handleKeyDownSearchAddress(e)}
            maxLength={9}
            required
            placeholder="Digite seu cep..."
          />
        </div>
        <div className=" flex flex-col py-2">
          <label htmlFor="logradouro" className="pb-2">
            Logradouro *
          </label>
          <input
            type="text"
            name="logradouro"
            id="logradouro"
            className="p-3 rounded-lg border outline-none focus:border-[#5964e0] transition-all w-96"
            value={data.address.logradouro}
            onChange={(e) => setData({ ...data, address: { ...data.address, logradouro: e.target.value } })}
            maxLength={9}
            required
            placeholder="Digite seu logradouro..."
          />
        </div>
        <div className=" flex flex-col py-2">
          <label htmlFor="number" className="pb-2">
            Número *
          </label>
          <input
            type="text"
            name="number"
            id="number"
            className="p-3 rounded-lg border outline-none focus:border-[#5964e0] transition-all w-96"
            value={data.address.number}
            onChange={(e) => setData({ ...data, address: { ...data.address, number: e.target.value } })}
            maxLength={9}
            required
            placeholder="Digite o número..."
          />
        </div>
        <div className=" flex flex-col py-2">
          <label htmlFor="bairro" className="pb-2">
            Bairro *
          </label>
          <input
            type="text"
            name="bairro"
            id="bairro"
            className="p-3 rounded-lg border outline-none focus:border-[#5964e0] transition-all w-96"
            value={data.address.bairro}
            onChange={(e) => setData({ ...data, address: { ...data.address, bairro: e.target.value } })}
            maxLength={9}
            required
            placeholder="Digite seu bairro..."
          />
        </div>

        <div className=" flex flex-col py-2">
          <label htmlFor="file" className="pb-2">
            Currículo *
          </label>
          <input
            className="relative m-0 block w-96 min-w-0 flex-auto rounded border px-3 py-3 text-base font-normal transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary "
            type="file"
            id="file"
            name="file"
            accept=".pdf, .doc, .docx"
            required
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className="text-white p-3 font-semibold text-base bg-[#5964e0] rounded-lg w-96 mt-4 hover:bg-[#5a63d3] transition-all"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
