interface MarqueeProps {
  text: string
  className?: string
  textClassName?: string
}

export function Marquee({ text, className = '', textClassName = '' }: MarqueeProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="animate-marquee inline-flex">
        <span className={`pr-10 ${textClassName}`}>{text}</span>
        <span className={`pr-10 ${textClassName}`} aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  )
}
