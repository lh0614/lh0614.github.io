import { Button, Field, Sidebar, SidebarItem, Tab, Tabs } from 'vant'

const components = [Button, Field, Sidebar, SidebarItem, Tab, Tabs]

export function requireVant(obj: any) {
  components.forEach(item => {
    obj.use(item)
  })
}
