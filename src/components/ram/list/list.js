import datatable from '@/components/common/DataTable'

export default {
	name: "RamList",
	data: function() {
        return {
            ram: {
                type: null,
                size: null
            },
            apiErrors: null,
            fields: [
                  {
                    name: 'id',
                    title: 'ID',
                    titleClass: 'col-md-3',
                    filterable: true,
                  },
                  {
                    name: 'type',
                    title: 'Type',
                    titleClass: 'col-md-3',
                    filterable: true
                  },
                  {
                    name: 'size',
                    title: 'Size',
                    titleClass: 'col-md-3',
                    filterable: true
                  },                  
                  {
                    name: '__slot:actions',
                    title: 'Actions',
                    titleClass: 'text-center col-md-3',
                    dataClass: 'text-center'
                  }
            ]
        }
    },
    created() {
        localStorage.ram = '';
    },
    methods: {
        loader(url, property, params){
            this.$http.get(url, params)
            .then(response => {
              this[property] = response.body; 
            }, response => {
              this.apiErrors = response.body
            });
        },
        search() {
            this.$refs.vuetable.refresh()
        },
        edit(rowData) {
            this.$router.push({ name: 'RamEdit', params: { id: rowData.id }})
        },
        remove(rowData) {
            this.$root.$refs.modal.confirm('Do you want to remove the item ' + rowData.type + '?', {
              yes: () => {
                this.$http.delete('api/rams/' + rowData.id)
                .then(response => {
                    this.$root.$refs.toastr.s("RAM removed successfully");
                    this.search();
                }, response => {
                    this.$root.$refs.toastr.e(response.body.errors);
                });
              }
            });
        },
        clear(){
            Object.keys(this.ram).forEach(key=>{ 
                if(typeof(this.ram[key]) == 'string'){
                    this.ram[key] = '';
                    return;
                } 

                if(typeof(this.ram[key]) == 'number'){
                    this.ram[key] = null;
                } 
            });

            this.errors.clear();
            this.apiErrors = null;
            this.search();
        }
    },
    components: { datatable }
}