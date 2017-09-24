import breadcrumb from './breadcrumb'
import itemMenu from './itemmenu'
import utils from './utils'
import vSelect from "vue-select"

export default {
  name: 'top',  
  data () {
    let items = this.$router.options.routes.filter(item=>item.menu&&!item.menu.brand&&item.menu.visible!==false);

    return {
      routes: this.$router.options.routes.filter(item=>item.menu),
      left: utils.group(items.filter(item=>!item.menu.right)),
      right: utils.group(items.filter(item=>item.menu.right)),
      options: utils.format(items),
      breadcrumb: []
    }
  },
  methods:{
    search(link){
      if (!link) { return; }
      this.$router.push(link.value);
    },
    menu(items){
      this.breadcrumb = items.split('/').filter(e=>!!e).map(e=>{ 
        return {
          label: e,
          active: true
        }
      }); 
    },
    routerChange(to){
      var selected = this.routes.find(item=>item.name==to.name);

      if (selected && selected.menu && selected.menu.label) { 
        return this.menu(selected.menu.label); 
      }

      if (selected) {
        return this.menu(selected.path);
      }

      this.menu(to.path)
    }
  },
  computed: { 
    brand() {
      let item = this.routes.filter(item=>item.menu.brand);
      return item.length ? item[0] : false; 
    }
  },
  created(){
    this.routerChange(this.$router.currentRoute);

    this.$router.beforeEach((to, from, next)=>{
      next(); 
      this.routerChange(to); 
    });
  },
  components: {itemMenu, vSelect, breadcrumb}
}