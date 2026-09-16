import { Tabs } from 'antd'

const renderTabBar = (props: any, DefaultTabBar: any) => (
  <DefaultTabBar {...props} style={{ zIndex: 1, marginBottom: '0' }} />
)

const StyledTabs = (props: any) => {
  return <Tabs renderTabBar={renderTabBar} {...props} />
}

export default StyledTabs
