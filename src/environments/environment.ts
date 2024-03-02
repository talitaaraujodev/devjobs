export const environment = {
  apiURL: import.meta.env.VITE_URL_API || 'http://localhost:4003',
  apiCorreiosURL: import.meta.env.VITE_URL_API_CORREIOS || 'https://viacep.com.br/ws',
  apiAdzunaURL: import.meta.env.VITE_URL_API_ADZUNA || 'https://api.adzuna.com/v1/api/jobs/br/search',
  idAdzunaAPI: import.meta.env.VITE_ID_API_ADZUNA || '',
  secretAdzunaAPI: import.meta.env.VITE_SECRET_API_ADZUNA || '',
};
