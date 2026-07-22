import { Link } from 'react-router-dom'
import { ShieldX } from 'lucide-react'
import { Button } from '../../../components/ui/button'

export function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <section className="text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30">
          <ShieldX className="size-7 text-red-500 dark:text-red-400" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Access denied
        </h1>
        <p className="mx-auto mt-2 max-w-xs text-sm text-slate-500 dark:text-slate-400">
          You don&apos;t have permission to view this page. Please sign in with
          an authorized account.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/login">
            <Button>Sign in</Button>
          </Link>
          <Link to="/">
            <Button variant="secondary">Back to home</Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
