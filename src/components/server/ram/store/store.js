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
    isUpdate() { return this.ram.id },
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
      this.$http.put('api/servers/' + this.$route.params.id + '/ram/' + this.ram.id, this.ram)
      .then(response => {
          this.clear()
          this.$root.$refs.toastr.s("RAM module successfully updated");
          // this.$emit('change', this.ram)
      }, response => {
        this.apiErrors = response.body
      });
    },
    insert() {
      this.$http.post('api/servers/' + this.$route.params.id + '/ram', this.ram)
       .then(response => {
        this.clear()
        // this.$emit('change', this.ram)

        this.$root.$refs.toastr.s("RAM module successfully inserted");
      }, response => {
        this.apiErrors = response.body
      });
    },
    clear() {
        Object.keys(this.ram).forEach(key => {
          if (typeof(this.ram[key]) == 'string') this.ram[key] = '';
          if (typeof(this.ram[key]) == 'number') this.ram[key] = 0;
        });
        this.ram.id = ''
        this.ram.server_id = this.$route.params.id
    }
  },
  created(){
    this.$http.get('api/rams')
    .then(response => {
      this.rams = response.body; 
    }, response => {
      this.apiErrors = response.body
    });
  },
  components: {}
}
