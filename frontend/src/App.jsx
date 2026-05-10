import "./App.css";
import { useState } from "react";
import HomePage from "./pages/Home";
import AuthPage from './pages/AuthPage'
import OnboardingPage from './pages/OnboardingPage'
import OnboardingReviewPage from './pages/OnboardingReviewPage'
import DashboardCreationPage from './pages/DashboardCreationPage'
import DashboardApp from './dashboard/App'

import { getAuthUser } from './services/api'

const DASHBOARD_PATHS = ['/tasks', '/agenda', '/chat', '/loan', '/trash', '/settings', '/logout']

function initialPage() {
  const isDashboardPath = DASHBOARD_PATHS.some((path) => window.location.pathname.startsWith(path))
  if (isDashboardPath) {
    if (getAuthUser()) {
      return 'dashboard'
    } else {
      window.history.replaceState({}, '', '/')
      return 'home'
    }
  }
  return 'home'
}

const PAGES = {
  home: HomePage,
  auth: AuthPage,
  onboarding: OnboardingPage,
  onboardingReview: OnboardingReviewPage,
  dashboardCreation: DashboardCreationPage,
  dashboard: DashboardApp,
}

export default function App() {
  const [page, setPage] = useState(initialPage)
  const Page = PAGES[page] || HomePage

  const navigate = (nextPage) => {
    if (nextPage === 'dashboard') {
      window.history.pushState({}, '', '/')
    }
    if (nextPage === 'home') {
      window.history.pushState({}, '', '/')
      window.scrollTo(0, 0)
    }
    setPage(nextPage)
  }

  return <Page navigate={navigate} />
}