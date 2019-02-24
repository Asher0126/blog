export const getNavList = async () => {
  const res = await this.$axios.$get('/abc')
  console.log(res)
}
