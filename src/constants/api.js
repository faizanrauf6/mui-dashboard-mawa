const api = {
  auth: {
    signup: 'users/signup',
    login: 'users/signin',
    logout: 'users/logout',
    me: 'users/me',
  },
  dashboardInfo: 'users/dashboard',
  complaints: 'complaints/all',
  changeComplaintStatus: 'complaints/update-status',
};

export default api;
