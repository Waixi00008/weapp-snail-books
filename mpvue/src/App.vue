<script>
import { get } from './utils/index'
export default {
  async created () {
    const res = await get('/weapp/demo')
    console.log(res)
  }
}
</script>

<style scoped>
</style>
