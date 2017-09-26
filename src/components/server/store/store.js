export default {
  name: "ServerStore",
  data: function() {
    return {
      server: {
        asset_id: null,
        name: '',
        price: '',
        brand_id: '',
        ram_id: ''
      },
      brands: [],
      rams: [],
      apiErrors: null
    }
  },
  computed: {
    isUpdate(){ return !!this.$route.params.id; }
  },
  methods: {
    submit(){
      this.$validator.validateAll().then(success => {
        if(success)
        return this.isUpdate ? this.edit() : this.insert()  
      }).catch((e) => {
        this.$root.$refs.toastr.e("Please fill out all mandatory fields");
      });
    },
    edit(){
      this.$http.put('api/servers/' + this.$route.params.id, this.server)
      .then(response => {
        this.$root.$refs.toastr.s("Server updated");
        this.$router.push('/servers');
      }, response => {
        this.apiErrors = response.body
      });
    },
    insert() {
      this.$http.post('api/servers', this.server)
      .then(response => {
        this.$root.$refs.toastr.s("Server created");
        this.$router.push('/servers');
      }, response => {
        this.apiErrors = response.body
      });
    },
    clear() {
      this.server = {
        asset_id: '',
        name: '',
        price: '',
        brand_id: ''
      }
    }
  },
  created() {
    this.$http.get('api/brands')
    .then(response => {
      this.brands = response.body; 
    }, response => {
      this.apiErrors = response.body
    });

    this.$http.get('api/rams')
    .then(response => {
      this.rams = response.body; 
    }, response => {
      this.apiErrors = response.body
    });

    if (!this.isUpdate) { return; }

    this.$http.get('api/servers/' + this.$route.params.id)
    .then(response => {
      this.server = response.body
      localStorage.server = JSON.stringify(response.body)
    }, response => {
      this.apiErrors = response.body
    });
  }
}
