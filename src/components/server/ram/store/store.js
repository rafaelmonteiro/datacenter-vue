export default {
  name: "UpdateRam",
  data: function() {
    return {
      rams: [],      
      apiErrors: null
    }
  },
  props: {
      ram: {
          type: Object,
          required: true,
          default: function() {
              return {id: ''}
          }
      }
  },
  computed: {
    isUpdate() { return this.$route.params.id },
  },
  methods: {
    submit(){
      this.$validator.validateAll().then(success => {
        if(success)
        return this.isUpdate ? this.update() : this.insert()
      }).catch((e) => {
        this.$root.$refs.toastr.e("Please fill out all mandatory fields");
      });
    },
    update(){
      this.$http.put('api/servers/' + this.$route.params.id + '/rams/' + this.ram.id, this.ram)
      .then(response => {
          this.$root.$refs.toastr.s("RAM modules successfully updated");
          this.$emit('change', this.ram)
      }, response => {
        this.apiErrors = response.body
      });
    }
  },
  created(){
    this.$http.get('api/rams')
    .then(response => {
      this.rams = response.body; 
    }, response => {
      this.apiErrors = response.body
    });
  }
}
