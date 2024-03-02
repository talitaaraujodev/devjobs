const jobService = {
  async getJobs(url: string) {
    const response = await fetch(url, { method: 'GET', headers: { 'content-type': 'application/json' } });
    try {
      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      console.error('Error ao obter jobs:', error);
    }
  },
};

export { jobService };
