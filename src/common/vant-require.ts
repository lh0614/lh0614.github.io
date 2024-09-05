import { Button, Field } from 'vant'

const components = [Button, Field]

export function requireVant(obj: any) {
  components.forEach(item => {
    obj.use(item)
  })
}
