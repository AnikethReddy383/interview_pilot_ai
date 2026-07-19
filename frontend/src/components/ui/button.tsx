import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'
const buttonVariants = cva('inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50', { variants: { variant: { default: 'bg-brand-600 text-white hover:bg-brand-700', secondary: 'border bg-white text-slate-950 hover:bg-slate-50 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800', ghost: 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800' }, size: { default: 'px-4', sm: 'min-h-9 px-3 text-xs', lg: 'min-h-12 px-6 text-base' } }, defaultVariants: { variant: 'default', size: 'default' } })
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
function Button({ className, variant, size, ...props }: ButtonProps) { return <button className={cn(buttonVariants({ variant, size }), className)} {...props} /> }
export { Button, buttonVariants }

