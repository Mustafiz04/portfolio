'use client'
import { useState } from 'react'
import { InlineWidget } from 'react-calendly'
import siteMetadata from '@/data/siteMetadata'
import ScrollReveal from '@/components/ScrollReveal'
import {
  Mail,
  MessageSquare,
  Calendar,
  ArrowUpRight,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Clock,
} from 'lucide-react'

export default function Contact() {
  const [calendlyPopup, setCalendlyPopup] = useState(false)

  function onScheduleMeeting(): void {
    setCalendlyPopup(true)
  }

  return (
    <div className="relative">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob-bg -right-32 top-0 h-[500px] w-[500px] bg-primary-100 dark:bg-primary-900/20" />
        <div className="blob-bg -left-48 top-96 h-96 w-96 bg-violet-100 dark:bg-violet-900/20" />
      </div>

      {/* Hero Section */}
      <section className="relative pb-12 pt-8 md:pb-16 md:pt-12">
        {/* Editorial Header */}
        <div className="animate-fade reveal-delay-1 mb-8 flex items-center gap-4">
          <MessageSquare className="h-5 w-5 text-primary-500" />
          <span className="font-display text-sm font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
            Get in Touch
          </span>
          <div className="h-px max-w-24 flex-1 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700" />
        </div>

        {/* Title */}
        <h1 className="animate-reveal font-display text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
          Let&apos;s <span className="gradient-text">connect</span>
        </h1>
        <p className="animate-reveal reveal-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          Do you have a project in mind? Want to hire me? Or simply wanna chat? I&apos;m always open
          to discussing new opportunities and creative ideas.
        </p>

        {/* Animated Line */}
        <div className="animate-line-expand reveal-delay-3 mt-8 h-1 w-24 bg-gradient-to-r from-primary-500 to-primary-300" />
      </section>

      {/* Main Content */}
      <section className="relative py-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column - Contact Options */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="space-y-6">
                {/* Schedule Meeting Card */}
                <button
                  onClick={onScheduleMeeting}
                  className="card-lift group w-full overflow-hidden rounded-2xl border border-gray-200/60 bg-gradient-to-br from-primary-500 to-primary-600 p-6 text-left transition-all dark:border-primary-800/60 md:p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                    Schedule a Meeting
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    Book a 30-minute call to discuss your project or just have a chat.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 font-display text-sm font-semibold text-white">
                    Book now
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </button>

                {/* Email Card */}
                <a
                  href={`mailto:${siteMetadata.email}`}
                  className="card-lift group flex items-center gap-5 overflow-hidden rounded-2xl border border-gray-200/60 bg-white/70 p-6 backdrop-blur-sm transition-all dark:border-gray-800/60 dark:bg-gray-900/70 md:p-8"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 shadow-sm ring-1 ring-gray-100 transition-all group-hover:ring-primary-200 dark:from-gray-800 dark:to-gray-900 dark:ring-gray-700 dark:group-hover:ring-primary-800">
                    <Mail className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
                      Send an Email
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {siteMetadata.email}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-gray-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-500 dark:text-gray-600" />
                </a>
              </div>
            </ScrollReveal>

            {/* Quick Info */}
            <ScrollReveal delay={100}>
              <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200/60 bg-white/70 p-6 backdrop-blur-sm dark:border-gray-800/60 dark:bg-gray-900/70">
                <h3 className="mb-4 font-display text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Quick Info
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-primary-500" />
                    <span className="text-gray-600 dark:text-gray-400">Bengaluru, India</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-primary-500" />
                    <span className="text-gray-600 dark:text-gray-400">
                      IST (UTC +5:30) • Usually responds within 24h
                    </span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 border-t border-gray-100 pt-6 dark:border-gray-800">
                  <h4 className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    Connect on Social
                  </h4>
                  <div className="flex gap-2">
                    <SocialButton href={siteMetadata.github} icon={Github} label="GitHub" />
                    <SocialButton href={siteMetadata.linkedin} icon={Linkedin} label="LinkedIn" />
                    <SocialButton href={siteMetadata.twitter} icon={Twitter} label="Twitter" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Calendly Widget */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={200}>
              {calendlyPopup ? (
                <div className="overflow-hidden rounded-3xl border border-gray-200/60 bg-white shadow-2xl dark:border-gray-800/60 dark:bg-gray-950">
                  <div className="p-4 md:p-6" style={{ minWidth: '320px', height: '700px' }}>
                    <InlineWidget url="https://calendly.com/mustafiz_kaifee/30min" />
                  </div>
                </div>
              ) : (
                <div className="flex h-full min-h-[400px] items-center justify-center overflow-hidden rounded-3xl border border-gray-200/60 bg-gradient-to-br from-gray-50 to-white dark:border-gray-800/60 dark:from-gray-900 dark:to-gray-950">
                  <div className="text-center">
                    {/* Decorative Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                          backgroundSize: '24px 24px',
                        }}
                      />
                    </div>

                    <div className="relative">
                      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
                        <Calendar className="h-10 w-10 text-primary-500" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-gray-900 dark:text-gray-100">
                        Ready to chat?
                      </h3>
                      <p className="mx-auto mt-2 max-w-xs text-sm text-gray-500 dark:text-gray-400">
                        Click &quot;Schedule a Meeting&quot; to book a time that works for you.
                      </p>
                      <button
                        onClick={onScheduleMeeting}
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 font-display text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30"
                      >
                        <Calendar className="h-4 w-4" />
                        Open Calendar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}

function SocialButton({
  href,
  icon: Icon,
  label,
}: {
  href: string | undefined
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-primary-700 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
      aria-label={label}
    >
      <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
    </a>
  )
}
