export const utils = {
  maskCEP: (value: string) => {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    return value;
  },
  maskCPF: (value: string) => {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');

    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value;
  },
  maskPhone: (value: string) => {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    return value;
  },
  maskDate: (value: string) => {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '$1/$2');
    value = value.replace(/(\d{2})(\d)/, '$1/$2');
    return value;
  },
  convertToISODate: (formattedDate: string) => {
    const parts = formattedDate.split('/');
    if (parts.length === 3) {
      const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      return isoDate;
    }
    return '';
  },
  getToken() {
    return localStorage.getItem('token');
  },
  setToken(token: string) {
    return localStorage.setItem('token', token);
  },
  statusCivil: [
    {
      value: 'SINGLE',
      label: 'Solteiro (a)',
    },
    {
      value: 'MARRIED',
      label: 'Casado (a)',
    },
    {
      value: 'DIVORCED',
      label: 'Divorciado (a)',
    },
    {
      value: 'WIDOWED',
      label: 'Viúvo (a)',
    },
  ],
  statusCivilType: {
    single: 'Solteiro (a)',
    married: 'Casado (a)',
    divorced: 'Divorciado (a)',
    widowed: 'Viúvo (a)',
  },
};
