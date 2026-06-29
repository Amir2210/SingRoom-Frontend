export function Card({ as = 'div', className = '', children, ...rest }) {
  const Comp = as
  return (
    <Comp className={`surface-card ${className}`} {...rest}>
      {children}
    </Comp>
  )
}
