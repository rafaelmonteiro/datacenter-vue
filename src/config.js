import env from '../env'

Number.prototype.toReal = function(){
  return this.toFixed(2).replace('.',',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
};

String.prototype.toReal = function(){
  if (isNaN(this) || !this) { return this }
  return parseFloat(this).toReal();
};

export default {
  system: {
    name: 'Datacenter Management',
    acronym: 'Datacenter',
    description: 'Datacenter Management'
  },
  isAuthenticated: !!localStorage.token,
  apiUrl: env.apiUrl
}
