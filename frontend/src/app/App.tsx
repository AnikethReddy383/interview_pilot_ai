import { lazy, Suspense } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { ProtectedRoute } from '../features/auth/ProtectedRoute'
import { AuthRedirect } from '../features/auth/AuthRedirect'
import { Button } from '../components/ui/button'
import { PageLoader } from '../components/ui/PageLoader'
import { ErrorBoundary } from '../components/error/ErrorBoundary'
import { ROUTES } from '../config/routes'

// Lazy-loaded Auth pages
const LoginPage = lazy(() =>
  import('../features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage })),
)
const RegisterPage = lazy(() =>
  import('../features/auth/pages/RegisterPage').then((m) => ({ default: m.RegisterPage })),
)
const ForgotPasswordPage = lazy(() =>
  import('../features/auth/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })),
)
const ResetPasswordPage = lazy(() =>
  import('../features/auth/pages/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })),
)
const VerificationPendingPage = lazy(() =>
  import('../features/auth/pages/VerificationPendingPage').then((m) => ({
    default: m.VerificationPendingPage,
  })),
)
const VerificationSuccessPage = lazy(() =>
  import('../features/auth/pages/VerificationSuccessPage').then((m) => ({
    default: m.VerificationSuccessPage,
  })),
)
const WelcomePage = lazy(() =>
  import('../features/auth/pages/WelcomePage').then((m) => ({ default: m.WelcomePage })),
)
const CompleteProfilePage = lazy(() =>
  import('../features/auth/pages/CompleteProfilePage').then((m) => ({ default: m.CompleteProfilePage })),
)
const UnauthorizedPage = lazy(() =>
  import('../features/auth/pages/UnauthorizedPage').then((m) => ({ default: m.UnauthorizedPage })),
)

// Landing page components
import { AnnouncementBanner } from '../features/landing/AnnouncementBanner'
import { Navbar } from '../features/landing/Navbar'
import { Hero } from '../features/landing/Hero'
import { Stats } from '../features/landing/Stats'
import { ProductPreview } from '../features/landing/ProductPreview'
import { Logos } from '../features/landing/Logos'
import { Features } from '../features/landing/Features'
import { HowItWorks } from '../features/landing/HowItWorks'
import { WhyCareerForge } from '../features/landing/WhyCareerForge'
import { Comparison } from '../features/landing/Comparison'
import { Pricing } from '../features/landing/Pricing'
import { Testimonials } from '../features/landing/Testimonials'
import { FAQ } from '../features/landing/FAQ'
import { CTA } from '../features/landing/CTA'
import { Footer as LandingFooter } from '../features/landing/Footer'
import { ScrollReveal } from '../components/ui/ScrollReveal'

// Lazy-loaded Dashboard pages
const DashboardLayout = lazy(() =>
  import('../shared/layout/DashboardLayout').then((m) => ({ default: m.DashboardLayout })),
)
const DashboardPage = lazy(() =>
  import('../features/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)
const ResumePage = lazy(() =>
  import('../features/resume/pages/ResumePage').then((m) => ({ default: m.ResumePage })),
)
const ComingSoonPage = lazy(() =>
  import('../features/dashboard/pages/ComingSoonPage').then((m) => ({ default: m.ComingSoonPage })),
)

/* ------------------------------------------------------------------ */
/*  Landing page                                                       */
/* ------------------------------------------------------------------ */

function Landing() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-950 dark:text-slate-50">
      <AnnouncementBanner />
      <Navbar />
      <main className="pt-14">
        <Hero />
        <ScrollReveal><Stats /></ScrollReveal>
        <ScrollReveal><ProductPreview /></ScrollReveal>
        <ScrollReveal><Logos /></ScrollReveal>
        <ScrollReveal><Features /></ScrollReveal>
        <ScrollReveal><HowItWorks /></ScrollReveal>
        <ScrollReveal><WhyCareerForge /></ScrollReveal>
        <ScrollReveal><Comparison /></ScrollReveal>
        <ScrollReveal><Pricing /></ScrollReveal>
        <ScrollReveal><Testimonials /></ScrollReveal>
        <ScrollReveal><FAQ /></ScrollReveal>
        <ScrollReveal><CTA /></ScrollReveal>
      </main>
      <LandingFooter />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  404                                                                */
/* ------------------------------------------------------------------ */

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <section className="text-center">
        <AlertTriangle className="mx-auto size-8 text-brand-600" />
        <h1 className="mt-4 text-3xl font-semibold">Page not found</h1>
        <Link className="mt-5 inline-block" to={ROUTES.HOME}>
          <Button>Back to home</Button>
        </Link>
      </section>
    </main>
  )
}

/* ------------------------------------------------------------------ */
/*  Root router                                                        */
/* ------------------------------------------------------------------ */

export function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public */}
          <Route path={ROUTES.HOME} element={<Landing />} />

          {/* Auth (redirect if already logged in) */}
          <Route path={ROUTES.LOGIN} element={<AuthRedirect><LoginPage /></AuthRedirect>} />
          <Route path={ROUTES.REGISTER} element={<AuthRedirect><RegisterPage /></AuthRedirect>} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<AuthRedirect><ForgotPasswordPage /></AuthRedirect>} />

          {/* Auth flow (public) */}
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
          <Route path={ROUTES.VERIFICATION_PENDING} element={<VerificationPendingPage />} />
          <Route path={ROUTES.VERIFY_EMAIL} element={<VerificationSuccessPage />} />
          <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />

          {/* Onboarding (protected) */}
          <Route path={ROUTES.ONBOARDING} element={<ProtectedRoute><WelcomePage /></ProtectedRoute>} />
          <Route path={ROUTES.ONBOARDING_COMPLETE_PROFILE} element={<ProtectedRoute><CompleteProfilePage /></ProtectedRoute>} />

          {/* Protected workspace — DashboardLayout renders Outlet */}
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.RESUME} element={<ResumePage />} />
            <Route path={ROUTES.ANALYSIS} element={<ComingSoonPage />} />
            <Route path={ROUTES.JOB_MATCH} element={<ComingSoonPage />} />
            <Route path={ROUTES.INTERVIEW_PREP} element={<ComingSoonPage />} />
            <Route path={ROUTES.ACTIVITY} element={<ComingSoonPage />} />
            <Route path={ROUTES.PROFILE} element={<ComingSoonPage />} />
            <Route path={ROUTES.SETTINGS} element={<ComingSoonPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}
