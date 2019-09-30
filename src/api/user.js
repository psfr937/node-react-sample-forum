export default apiEngine => ({
  list: ({ page }) => apiEngine.get('/api/users', { params: { page } }),
  emailRegister: user => apiEngine.post('/api/users', { data: user }),
  verifyEmail: ({ token }) =>
    apiEngine.post('/api/users/email/verify', {
      data: { verifyEmailToken: token }
    }),
  emailAvailable: value => apiEngine.get('/api/users/usernameAvailable'),
  requestVerifyEmail: form =>
    apiEngine.post('/api/users/email/request-verify', { data: form }),
  emailLogin: user => apiEngine.post('/api/users/emaillogin', { data: user }),

  appSocialLogin: facebookToken =>
    apiEngine.post('/auth/facebook/native', { data: facebookToken }),

  requestResetPassword: form =>
    apiEngine.post('/api/users/password/request-reset', { data: form }),
  resetPassword: ({ token, ...form }) =>
    apiEngine.put('/api/users/password', {
      data: {
        resetPasswordToken: token,
        ...form
      }
    }),
  logout: () => apiEngine.get('/api/users/logout'),
  readSelf: () => apiEngine.get('/api/users/me'),
  update: user => apiEngine.put('/api/users/me', { data: user }),
  updateAvatarURL: form =>
    apiEngine.put('/api/users/me/avatarURL', {
      data: form
    }),
  updatePassword: form =>
    apiEngine.put('/api/users/me/password', {
      data: form
    }),
  uploadAvatar: avatar =>
    apiEngine.post('/api/users/me/avatar', { files: { avatar } })
});
