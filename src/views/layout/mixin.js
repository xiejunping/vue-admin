export default {
  methods: {
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        // window.open(name.split('_')[1])
        this.$router.push({
          name: 'frame',
          query: {
            href: name.split('_')[1]
          }
        })
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    getNameOrHref (item, children0) {
      return item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name)
    }
  }
}
