import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container-shell flex min-h-screen items-center justify-center py-16">
          <div className="surface max-w-xl p-8 text-center">
            <p className="chip mx-auto mb-4">Something went wrong</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Storefront unavailable</h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              An unexpected error interrupted the experience. Refresh the page to continue.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
