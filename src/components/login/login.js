export default {
  name: 'login',
  data () {
    return {
        user: {
          username: '',
          password: '',
          getCredentials: function() {
            var buffer = new Buffer(this.username + ':' + this.password);
            return buffer.toString('base64');
          }
       },
       apiErrors: null,
    }
  },
  methods: {
    validate(){
      this.$validator.validateAll().then(success => {
        if(success) this.acessar()
      }).catch((e) => {
        this.$root.$refs.toastr.e("Please fill out all mandatory fields");
      });
    },
  	acessar(){
        this.apiErrors = null;

        this.$http.post('login', null, {
          headers: {
            'Authorization': 'Basic ' + this.user.getCredentials()
          }
        }).then(response => {
          this.$root.$refs.toastr.s("Login successful");
          localStorage.token = 'Bearer ' + response.body.token;
          this.$root.$data.isAuthenticated = true;
          this.$router.push('dashboard')
        }, response => {
          if (response.body.error == 'invalid_credentials') {
            this.$root.$refs.toastr.e("Invalid credentials");
            return;
          }
          this.apiErrors = response.body
        });
  	}
  }
}
