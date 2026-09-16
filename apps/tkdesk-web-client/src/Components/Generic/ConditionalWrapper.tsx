export default ({
  condition,
  wrapper,
  children,
}: {
  condition: boolean
  wrapper: any
  children: any
}) => (condition ? wrapper(children) : children)
