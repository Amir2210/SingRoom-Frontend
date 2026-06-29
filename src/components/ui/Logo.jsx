import { Link } from 'react-router'

export function Logo({ to = '/', className = '', size = 'md', showText = true }) {
  const markSize = size === 'lg' ? 'h-14 w-14 text-3xl' : 'h-12 w-12 text-2xl'
  const textSize = size === 'lg' ? 'text-4xl' : 'text-3xl'

  const content = (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className={`brand-logo ${markSize}`}>S</span>
      {showText && (
        <span className={`font-display font-bold tracking-tight text-content ${textSize}`}>
          SingRoom
        </span>
      )}
    </span>
  )

  if (to) {
    return (
      <Link to={to} className="inline-flex w-fit items-center">
        {content}
      </Link>
    )
  }

  return content
}
