export default {
  logout(app, next){
    app.$refs.modal.confirm('Do you want to logout?', {
      yes: () => {
        app.isAuthenticated = false;
        localStorage.token = '';
        next({ path: '/' }); 
        return; 
      }
    });
  }
}