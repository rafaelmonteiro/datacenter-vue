function mapRoutes(routes){
	return routes.map(item=>{ 
		if (typeof(item.menu) == 'string') { item.menu = { label: item.menu } }

		let path = item.menu.label ? item.menu.label : item.path; 
		path += '||' + JSON.stringify({
			name : item.name, 
			icon: item.menu.icon
		});
		return {path};
	});
}

export default {
	group(menu, map = true){

		if (map) { menu = mapRoutes(menu); }

		menu = menu.map(item=>{
			item.path = item.path.split('/').filter(value=>!!value);
			return item
		});

		var map = [];
		menu.forEach((item, index, arr)=>{

			let all = JSON.parse(JSON.stringify(arr)), name = item.name;

			let value = all.filter(v=>v.path[0]==item.path[0]).map(v=>{
				v.path = v.path.slice(1).join('/')
				return v;
			});

			if (map.some(vl=>vl.id==item.path[0])) { return; }

			if (!item.path[0]) { return; }

			let result = { id: item.path[0], label: item.path[0], items: value }

			map.push(result);
		});

		map = map.map(valor=>{
			if (valor.items) { valor.items = this.group(valor.items, false)}
			return valor;
		});

		return map;
    },	
	format(items){
    	return items.map(value=>{
	        let label = typeof(value.menu) == 'string' ? value.menu : (value.menu.label ? value.menu.label : value.path); 

	        if (!label) { return false }

	        label = label[0] == '/' ? label.substr(1) : label; 
	        label = label.split('/').map(item => item[0].toUpperCase() + item.substr(1).toLowerCase()).join(' > ');

	        return { value: value.path, label };
    	});
    }
}