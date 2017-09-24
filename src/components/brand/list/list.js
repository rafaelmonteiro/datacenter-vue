import datatable from '@/components/common/DataTable'

export default {
	name: "BrandList",
	data: function() {
        return {
            brand: {
                name: null
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
                    name: 'name',
                    title: 'Name',
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
        localStorage.brand = '';
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
            this.$router.push({ name: 'BrandEdit', params: { id: rowData.id }})
        },
        remove(rowData) {
            this.$root.$refs.modal.confirm('Do you want to remove the item ' + rowData.name + '?', {
              yes: () => {
                this.$http.delete('api/brands/' + rowData.id)
                .then(response => {
                    this.$root.$refs.toastr.s("Brand removed successfully");
                    this.search();
                }, response => {
                    this.$root.$refs.toastr.e(response.body.errors);
                });
              }
            });
        },
        clear(){
            Object.keys(this.brand).forEach(key=>{ 
                if(typeof(this.brand[key]) == 'string'){
                    this.brand[key] = '';
                    return;
                } 

                if(typeof(this.brand[key]) == 'number'){
                    this.brand[key] = null;
                } 
            });

            this.errors.clear();
            this.apiErrors = null;
            this.search();
        }
    },
    components: { datatable }
}