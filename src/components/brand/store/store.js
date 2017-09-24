export default {
  name: "BrandStore",
  data: function() {
    return {
      brand: {
        name: ''
      },
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
      this.$http.put('api/brands/' + this.$route.params.id, this.brand)
      .then(response => {
        this.$root.$refs.toastr.s("Brand updated");
        this.$router.push('/brands');
      }, response => {
        this.apiErrors = response.body
      });
    },
    insert() {
      this.$http.post('api/brands', this.brand)
      .then(response => {
        this.$root.$refs.toastr.s("Brand created");
        this.$router.push('/brands');
      }, response => {
        this.apiErrors = response.body
      });
    },
    clear() {
      this.brand = {
        name: ''
      }
    }
  },
  created() {
    if (!this.isUpdate) { return; }

    this.$http.get('api/brands/' + this.$route.params.id)
    .then(response => {
      this.brand = response.body
    }, response => {
      this.apiErrors = response.body
    });
  }
}
