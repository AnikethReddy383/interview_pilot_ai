import { useMemo } from 'react'
import { cn } from '../../lib/utils'

interface AvatarProps {
  name?: string | null
  email?: string | null
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'size-7 text-[10px]',
  md: 'size-8 text-xs',
  lg: 'size-10 text-sm',
}

export function Avatar({ name, email, className, size = 'md' }: AvatarProps) {
  const initials = useMemo(() => {
    if (name && name.trim().length > 0) {
      const parts = name.trim().split(/\s+/)
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      }
      return parts[0].slice(0, 2).toUpperCase()
    }
    if (email && email.trim().length > 0) {
      return email[0].toUpperCase()
    }
    return 'U'
  }, [name, email])

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-bold text-white shadow-sm ring-1 ring-white/20',
        sizeClasses[size],
        className,
      )}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}
