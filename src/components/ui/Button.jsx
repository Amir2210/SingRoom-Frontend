import { Link } from 'react-router'

const VARIANTS = {
  brand: 'btn-brand',
  ghost: 'btn-ghost',
  icon: 'btn-icon',
}

export function Button({
  variant = 'brand',
  to,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const classes = `${VARIANTS[variant] || VARIANTS.brand} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
