import { Card } from 'antd'

const createLayoutProxy = ({
  children,
  type,
}: {
  children: React.ReactNode
  type: string
}) => {
  switch (type) {
    case 'wide':
      return <WideLayout>{children}</WideLayout>

    case 'default':
    default:
      return <DefaultLayout>{children}</DefaultLayout>
  }
}

export default createLayoutProxy

const DefaultLayout = (props: { children: React.ReactNode }) => {
  const { children } = props
  return (
    <Card id='layout-default'>
      <h2>Component</h2>
      <div
        style={{
          border: '5px solid #F9E79F',
          backgroundColor: '#F9E79F',
          padding: 20,
        }}
      >
        <div
          style={{
            margin: '30px auto',
            width: '30%',
            backgroundColor: 'white',
          }}
        >
          {children}
        </div>
      </div>
    </Card>
  )
}
const WideLayout = (props: { children: React.ReactNode }) => {
  const { children } = props
  return (
    <Card id='layout-wide'>
      <h2>Component</h2>
      <div style={{ border: '5px solid #F9E79F', padding: 20 }}>{children}</div>
    </Card>
  )
}
