import { describe, it, expect } from 'vitest'
import { ROUTE_METADATA, SIDEBAR_ROUTES } from './routeConfig'
import { ROUTES } from './routes'

describe('Route Metadata Single Source of Truth', () => {
  it('contains entries for all central routes', () => {
    expect(ROUTE_METADATA[ROUTES.HOME]).toBeDefined()
    expect(ROUTE_METADATA[ROUTES.DASHBOARD]).toBeDefined()
    expect(ROUTE_METADATA[ROUTES.LOGIN]).toBeDefined()
    expect(ROUTE_METADATA[ROUTES.SETTINGS]).toBeDefined()
  })

  it('marks protected routes correctly with requiresAuth=true', () => {
    expect(ROUTE_METADATA[ROUTES.DASHBOARD].requiresAuth).toBe(true)
    expect(ROUTE_METADATA[ROUTES.RESUME].requiresAuth).toBe(true)
    expect(ROUTE_METADATA[ROUTES.HOME].requiresAuth).toBe(false)
    expect(ROUTE_METADATA[ROUTES.LOGIN].requiresAuth).toBe(false)
  })

  it('filters sidebar routes accurately', () => {
    expect(SIDEBAR_ROUTES.every((r) => r.showInSidebar)).toBe(true)
    const dashboardRoute = SIDEBAR_ROUTES.find((r) => r.path === ROUTES.DASHBOARD)
    expect(dashboardRoute).toBeDefined()
    expect(dashboardRoute?.title).toBe('Dashboard')
  })
})
