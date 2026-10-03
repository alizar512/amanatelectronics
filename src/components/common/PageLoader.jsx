export const PageLoader = () => (
  <div className="container-shell flex min-h-[50vh] items-center justify-center py-16">
    <div className="flex items-center gap-3 px-6 py-4">
      <div
        className="h-8 w-8 animate-spin rounded-full border-3"
        style={{
          borderColor: 'var(--color-border-light)',
          borderTopColor: 'var(--color-brand)',
        }}
      />
      <span
        className="text-sm font-semibold uppercase tracking-wider"
        style={{ color: 'var(--color-alt-text)' }}
      >
        Loading...
      </span>
    </div>
  </div>
)
