export default {
  name: "RamStore",
  data: function() {
    return {
      ram: {
        type: '',
        size: ''
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
      this.$http.put('api/rams/' + this.$route.params.id, this.ram)
      .then(response => {
        this.$root.$refs.toastr.s("RAM module updated");
        this.$router.push('/rams');
      }, response => {
        this.apiErrors = response.body
      });
    },
    insert() {
      this.$http.post('api/rams', this.ram)
      .then(response => {
        this.$root.$refs.toastr.s("RAM module created");
        this.$router.push('/rams');
      }, response => {
        this.apiErrors = response.body
      });
    },
    clear() {
      this.ram = {
        type: '',
        size: ''
      }
    }
  },
  created() {
    if (!this.isUpdate) { return; }

    this.$http.get('api/rams/' + this.$route.params.id)
    .then(response => {
      this.ram = response.body
    }, response => {
      this.apiErrors = response.body
    });
  }
}
