import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) { return <input className={cn('min-h-11 w-full rounded-md border bg-white px-3 text-sm text-slate-950 placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 dark:text-white', className)} {...props} /> }
