import heroVideo from '../../assets/videos/hero-boomerang-video.mp4'
import { ButtonLink } from '../shared/Button'
import { Marquee } from '../shared/Marquee'

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

      <div className="relative z-10 ml-auto w-full max-w-xl px-4 pt-40 pb-16 sm:px-8 sm:pb-24">
        <Marquee
          text="Unity Auto Group"
          className="w-56 sm:w-64"
          textClassName="font-mono text-xs tracking-[0.3em] text-green-500 uppercase"
        />
        <h1 className="mt-4 font-serif text-4xl text-white italic sm:text-5xl">
          Be moved —
          <br />
          Shop or Mobile Repair
        </h1>
        <p className="mt-6 font-mono text-xs leading-relaxed tracking-wide text-gray-300 uppercase sm:text-sm">
          Tell us about your vehicle and the repair you need, and get an estimated quote before you book —
          whether you bring it to our shop or we come to you.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <ButtonLink to="/shop-service">Shop Service</ButtonLink>
          <ButtonLink to="/mobile-service" variant="secondary">
            Mobile Service
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
