interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-green-500">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-gray-400">{description}</p>}
    </div>
  )
}
