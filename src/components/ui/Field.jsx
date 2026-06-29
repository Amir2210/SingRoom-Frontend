export function Field({
  as = 'input',
  icon: Icon,
  label,
  id,
  error,
  className = '',
  children,
  ...rest
}) {
  const Control = as

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-content-muted">
          {label}
        </label>
      )}
      <div className={`field ${error ? 'border-red-500/70 focus-within:border-red-500' : ''}`}>
        {Icon && <Icon className="h-5 w-5 shrink-0 text-content-faint" aria-hidden />}
        <Control id={id} {...rest}>
          {children}
        </Control>
      </div>
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  )
}
