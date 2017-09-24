<template>
	<ul :class="css">
		<li v-for="item in items" :class="{ dropdown: item.items.length && level == 1, 'dropdown-submenu': item.items.length && level > 1  }">
			<a v-if="item.items.length" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            	{{formatLabel(item.label)}}  <span v-if="level==1" class="caret"></span>
            </a>
			<item-menu v-if="item.items.length" :items="item.items" :level="level+1" css="dropdown-menu" />	
			<router-link v-if="!item.items.length" :to="{name: link(item.label) }">{{label(item.label)}}</router-link>
		</li>
	</ul>
</template>

<script>
import itemMenu from './itemmenu'

export default {
  name: 'itemMenu',
  props: {
  	items: { type: Array },
  	css: { type: String },
  	level: { 
  		type: Number, 
  		default: 1 
  	}
  },
  methods: {
    formatLabel(label){
      if (!label) { return '' }
      return label.split(' ').map(item => item[0].toUpperCase() + item.substr(1).toLowerCase()).join(' ');
    },
  	label(item){
  		return this.formatLabel(item.split('||')[0]);
  	},
  	link(item){
      item = JSON.parse(item.split('||')[1]);
      if (item.action) { this.$emit(item.action) }
  		return item.name
  	}
  },
  components: {itemMenu}
}  
</script>
<style scoped>

.dropdown-submenu {
    position: relative;
}

.dropdown-submenu>.dropdown-menu {
    top: 0;
    left: 100%;
    margin-top: -6px;
    margin-left: -1px;
    -webkit-border-radius: 0 6px 6px 6px;
    -moz-border-radius: 0 6px 6px;
    border-radius: 0 6px 6px 6px;
}

.dropdown-submenu:hover>.dropdown-menu {
    display: block;
}

.dropdown-submenu>a:after {
    display: block;
    content: " ";
    float: right;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-width: 5px 0 5px 5px;
    border-left-color: #ccc;
    margin-top: 5px;
    margin-right: -10px;
}

.dropdown-submenu:hover>a:after {
    border-left-color: #fff;
}

.dropdown-submenu.pull-left {
    float: none;
}

.dropdown-submenu.pull-left>.dropdown-menu {
    left: -100%;
    margin-left: 10px;
    -webkit-border-radius: 6px 0 6px 6px;
    -moz-border-radius: 6px 0 6px 6px;
    border-radius: 6px 0 6px 6px;
}

</style>