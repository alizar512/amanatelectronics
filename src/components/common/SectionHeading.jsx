export const SectionHeading = ({ eyebrow, title, description, action }) => (
  <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div className="max-w-2xl">
      {eyebrow ? (
        <p
          className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: 'var(--color-brand-dark)' }}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className="text-2xl font-bold uppercase tracking-wider sm:text-3xl"
        style={{ color: 'var(--color-headings)' }}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-sm leading-7" style={{ color: 'var(--color-alt-text)' }}>
          {description}
        </p>
      ) : null}
    </div>
    {action}
  </div>
)
