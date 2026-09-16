interface PagePlaceholderProps {
  title: string
  description: string
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold text-white">{title}</h1>
      <p className="mt-4 text-gray-400">{description}</p>
    </section>
  )
}
