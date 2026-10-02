import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import femaleVoiceover from '../../assets/audio/Unity_Auto_Group_Voiceover_Female.mp3'
import maleVoiceover from '../../assets/audio/Unity_Auto_Group_Voiceover_Male.mp3'

type Voice = 'female' | 'male'

// Which recording the hero plays. Both are timed below, so switching is just this line.
const VOICE: Voice = 'male'

const lines = [
  'Welcome to Unity Auto Group —',
  'where quality auto repair meets convenience.',
  'Whether you need us to come to you,',
  'or you prefer to bring your vehicle to our shop,',
  "we're here to make auto repair simple and dependable.",
  'From routine maintenance to professional repairs,',
  'our experienced technicians are ready to get you back on the road.',
  'Unity Auto Group —',
  'We Come to You, or You Come to Us.',
  'Get started today.',
]

// Second at which each line starts, measured from the pauses in each recording.
const recordings: Record<Voice, { src: string; starts: number[] }> = {
  female: { src: femaleVoiceover, starts: [0.3, 2.2, 5.0, 6.7, 9.0, 12.45, 15.2, 19.3, 20.8, 23.3] },
  male: { src: maleVoiceover, starts: [0.3, 2.15, 5.05, 6.85, 9.55, 12.9, 15.6, 19.7, 21.25, 23.75] },
}

const recording = recordings[VOICE]

function lineAt(time: number) {
  let index = -1
  recording.starts.forEach((start, i) => {
    if (time >= start) index = i
  })
  return index === -1 ? '' : lines[index]
}

// Narration for the hero. Browsers block autoplay with sound, so it only starts from the visitor's tap;
// the audio downloads at that point too, so it costs nothing on page load. It stops once the hero is
// scrolled out of view.
export function useHeroNarration(sectionRef: RefObject<HTMLElement | null>, onStart: () => void) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [caption, setCaption] = useState('')

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'none'
    audioRef.current = audio

    const onTimeUpdate = () => setCaption(lineAt(audio.currentTime))
    const onStop = () => {
      setPlaying(false)
      setCaption('')
    }
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended', onStop)
    audio.addEventListener('pause', onStop)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onStop)
      audio.removeEventListener('pause', onStop)
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) audioRef.current?.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [sectionRef])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      return
    }
    if (!audio.src) audio.src = recording.src
    audio.currentTime = 0
    onStart()
    setPlaying(true)
    audio.play().catch(() => setPlaying(false))
  }

  return { playing, caption, toggle }
}
