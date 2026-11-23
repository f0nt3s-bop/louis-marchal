import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const MENU = ['Parfums', 'Soins du corps', 'Soins du visage', 'Manucure', 'Produits spa', 'Boutiques']

function Couronne({ className = '', anime = false }) {
  const trace = anime
    ? { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { duration: 2, ease: 'easeInOut' } }
    : {}
  return (
    <svg viewBox="0 0 120 84" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <motion.path d="M10 70 L16 22 L38 48 L60 10 L82 48 L104 22 L110 70 Z" {...trace} />
      <motion.path d="M10 70 H110 M14 78 H106" {...trace} />
      <motion.circle cx="16" cy="16" r="4" {...trace} />
      <motion.circle cx="60" cy="5" r="4" {...trace} />
      <motion.circle cx="104" cy="16" r="4" {...trace} />
    </svg>
  )
}

function Ornement() {
  return (
    <div className="flex items-center justify-center gap-4 text-or" aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-or" />
      <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 0 L9 5 L14 7 L9 9 L7 14 L5 9 L0 7 L5 5 Z" fill="currentColor" /></svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-or" />
    </div>
  )
}

function Apparition({ children, delai = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: delai, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function TitreMots({ texte }) {
  const mots = texte.split(' ')
  return (
    <h1 className="font-serif text-[2.6rem] leading-[1.05] text-ivoire sm:text-6xl lg:text-7xl">
      {mots.map((m, i) => (
        <motion.span
          key={i}
          className="mr-[0.25em] inline-block"
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.6 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
          {m}
        </motion.span>
      ))}
    </h1>
  )
}

function BoutonOr({ href, children }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center justify-center overflow-hidden border border-or bg-or px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-encre transition-colors hover:bg-ordoux"
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" aria-hidden="true" />
      <span className="relative">{children}</span>
    </a>
  )
}

function BoutonFin({ href, children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center border border-ivoire/30 px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-ivoire transition-colors hover:border-or hover:text-ordoux"
    >
      {children}
    </a>
  )
}

function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ivoire/10 bg-encre/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <a href="#haut" className="flex shrink-0 items-center gap-3 text-ivoire">
          <Couronne className="h-6 w-8 text-or" />
          <span className="whitespace-nowrap font-serif text-xl tracking-wide sm:text-2xl">Louis Marchal</span>
        </a>
        <nav aria-label="Menu principal" className="hidden items-center gap-7 lg:flex">
          {MENU.map((m) => (
            <a key={m} href="#" className="text-[13px] uppercase tracking-[0.18em] text-brume transition-colors hover:text-ivoire">
              {m}
            </a>
          ))}
          <a href="#haut" aria-current="page" className="border-b border-or pb-1 text-[13px] uppercase tracking-[0.18em] text-or">
            Nous rejoindre
          </a>
        </nav>
        <a href="#labday" className="whitespace-nowrap border border-or/60 px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-or transition-colors hover:bg-or hover:text-encre lg:hidden">
          Nous rejoindre
        </a>
      </div>
    </header>
  )
}

function Hero() {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 50, y: 40 })
  const reduit = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduit ? 0 : 140])
  const opacite = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="haut"
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
      }}
      className="grain relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-24 pt-32"
      style={{ background: `radial-gradient(700px circle at ${pos.x}% ${pos.y}%, rgba(201,169,110,0.13), transparent 60%), #0E0E11` }}
    >
      <div className="pointer-events-none absolute inset-6 border border-or/20 sm:inset-10" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-8 border border-or/10 sm:inset-12" aria-hidden="true" />
      <motion.div style={{ y, opacity: opacite }} className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <Couronne anime className="mb-8 h-16 w-24 text-or" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mb-6 text-xs uppercase tracking-[0.4em] text-or"
        >
          Maison de spécialistes · Depuis les années 50
        </motion.p>
        <TitreMots texte="Devenez manager de proximité dans une maison de spécialistes" />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.9 }}
          className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-brume"
        >
          Vous avez la double compétence scientifique et managériale. Nous vous apprenons nos savoir-faire, et nous vous faisons grandir.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.9 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <BoutonOr href="#parcours">Découvrir le parcours</BoutonOr>
          <BoutonFin href="#labday">S’inscrire au Lab Day</BoutonFin>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute bottom-12 left-1/2 hidden -translate-x-1/2 sm:flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-brume"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        aria-hidden="true"
      >
        Défiler
        <span className="h-10 w-px bg-gradient-to-b from-or to-transparent" />
      </motion.div>
    </section>
  )
}

function Bandeau() {
  const mots = ['Promotion interne', 'Formation', 'Suivi individualisé', 'Double compétence', 'Groupe international', 'Savoir-faire du luxe']
  const ligne = [...mots, ...mots]
  return (
    <div className="overflow-hidden border-y border-or/20 bg-nuit py-6" aria-label="Nos valeurs : promotion interne, formation, suivi individualisé, double compétence, groupe international, savoir-faire du luxe">
      <div className="flex w-max animate-defile" aria-hidden="true">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {ligne.map((m, i) => (
              <span key={i} className="flex items-center gap-10 pr-10 font-serif text-2xl italic text-ivoire/80">
                {m}
                <span className="text-or not-italic">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const ENGAGEMENTS = [
  { n: 'I', titre: 'Évoluer', texte: 'Un parcours de carrière écrit, remis dès l’embauche, avec des étapes claires. La promotion interne fait partie de notre histoire.' },
  { n: 'II', titre: 'Se former', texte: 'Une formation ciblée sur nos savoir-faire techniques, qui commence dès votre stage de quatre mois.' },
  { n: 'III', titre: 'Être accompagné', texte: 'Un tuteur senior à vos côtés : vous apprenez avec quelqu’un qui connaît la maison depuis des années.' },
]

function Engagements() {
  return (
    <section className="bg-encre px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Apparition className="mb-16 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-or">Notre promesse</p>
          <h2 className="font-serif text-4xl text-ivoire sm:text-5xl">Trois engagements</h2>
          <div className="mt-6"><Ornement /></div>
        </Apparition>
        <div className="grid gap-6 md:grid-cols-3">
          {ENGAGEMENTS.map((e, i) => (
            <Apparition key={e.n} delai={i * 0.15}>
              <article className="group relative h-full border border-ivoire/10 bg-nuit p-10 transition-all duration-500 hover:-translate-y-1 hover:border-or/60 hover:shadow-[0_0_60px_-20px_rgba(201,169,110,0.5)]">
                <p className="texte-or font-serif text-6xl transition-all group-hover:animate-brille">{e.n}</p>
                <h3 className="mt-6 font-serif text-3xl text-ivoire">{e.titre}</h3>
                <p className="mt-4 font-light leading-relaxed text-brume">{e.texte}</p>
              </article>
            </Apparition>
          ))}
        </div>
      </div>
    </section>
  )
}

const ETAPES = [
  { t: 'Stage de 4 mois', d: 'Première étape du parcours, au cœur de nos ateliers et laboratoires.' },
  { t: 'Embauche', d: 'Votre parcours de carrière écrit, et votre tuteur senior.' },
  { t: 'Formation technique', d: 'Production, chimie : les savoir-faire propres à la maison.' },
  { t: 'Manager de proximité', d: 'Vous encadrez une équipe et conduisez ses entretiens annuels.' },
]

function Parcours() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const hauteur = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  return (
    <section id="parcours" className="grain relative bg-nuit px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <Apparition className="mb-20 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-or">Votre parcours</p>
          <h2 className="font-serif text-4xl text-ivoire sm:text-5xl">Du stage au management de proximité</h2>
        </Apparition>
        <ol ref={ref} className="relative">
          <span className="absolute left-5 top-0 h-full w-px bg-ivoire/10 sm:left-1/2" aria-hidden="true" />
          <motion.span style={{ height: hauteur }} className="absolute left-5 top-0 w-px bg-or sm:left-1/2" aria-hidden="true" />
          {ETAPES.map((e, i) => (
            <li key={e.t} className={`relative mb-16 flex last:mb-0 sm:w-1/2 ${i % 2 ? 'sm:ml-auto sm:pl-16' : 'sm:pr-16 sm:text-right'} pl-16`}>
              <span
                className={`absolute top-1 flex h-10 w-10 items-center justify-center rounded-full border border-or bg-encre font-serif text-or left-0 ${i % 2 ? 'sm:-left-5' : 'sm:left-auto sm:-right-5'}`}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <Apparition delai={0.1}>
                <p className="text-xs uppercase tracking-[0.3em] text-or">Étape {String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 font-serif text-3xl text-ivoire">{e.t}</h3>
                <p className="mt-3 font-light leading-relaxed text-brume">{e.d}</p>
              </Apparition>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const VIDEOS = [
  { nom: '[Prénom]', role: 'Manager de production' },
  { nom: '[Prénom]', role: 'Manager en laboratoire' },
  { nom: '[Prénom]', role: 'Tuteur senior' },
]

function Journees() {
  return (
    <section className="bg-encre px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Apparition className="mb-16 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-or">En coulisses</p>
          <h2 className="font-serif text-4xl italic text-ivoire sm:text-5xl">Une journée avec…</h2>
          <p className="mx-auto mt-6 max-w-xl font-light text-brume">Nos managers vous ouvrent les portes de leurs ateliers et de leurs laboratoires.</p>
        </Apparition>
        <div className="grid gap-8 md:grid-cols-3">
          {VIDEOS.map((v, i) => (
            <Apparition key={v.role} delai={i * 0.15}>
              <button type="button" className="group block w-full text-left" aria-label={`Lire la vidéo : une journée avec ${v.role.toLowerCase()} (emplacement)`}>
                <div className="relative aspect-[4/5] overflow-hidden border border-ivoire/10 bg-gradient-to-b from-nuit to-[#1d1c22]">
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                    <Couronne className="h-24 w-36 text-ivoire/5" />
                  </div>
                  <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-or/70 text-or transition-all duration-500 group-hover:scale-110 group-hover:bg-or group-hover:text-encre" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18"><path d="M5 2 L16 9 L5 16 Z" fill="currentColor" /></svg>
                  </span>
                  <span className="absolute bottom-5 left-5 text-[11px] uppercase tracking-[0.3em] text-brume">Vidéo · 2 min</span>
                </div>
                <p className="mt-5 font-serif text-2xl text-ivoire">{v.nom}</p>
                <p className="text-sm uppercase tracking-[0.2em] text-or">{v.role}</p>
              </button>
            </Apparition>
          ))}
        </div>
      </div>
    </section>
  )
}

function LabDay() {
  return (
    <section id="labday" className="bg-encre px-6 pb-28">
      <Apparition className="mx-auto max-w-5xl">
        <div className="relative border border-or/50 p-2">
          <div className="grain relative grid items-center gap-10 border border-or/25 bg-nuit px-8 py-14 sm:px-14 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-or">Recrutement</p>
              <h2 className="texte-or animate-brille font-serif text-5xl sm:text-6xl">Lab Day</h2>
              <p className="mt-6 font-light leading-relaxed text-brume">
                Une journée sur notre site pour résoudre, en équipe, un vrai problème de production. Pas de tri de CV : nous découvrons vos compétences en situation, et vous découvrez la maison.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-ivoire/10 pb-3"><dt className="uppercase tracking-[0.2em] text-brume">Date</dt><dd className="text-ivoire">[DATE]</dd></div>
                <div className="flex justify-between border-b border-ivoire/10 pb-3"><dt className="uppercase tracking-[0.2em] text-brume">Lieu</dt><dd className="text-ivoire">Fleury-les-Aubrais (45)</dd></div>
                <div className="flex justify-between border-b border-ivoire/10 pb-3"><dt className="uppercase tracking-[0.2em] text-brume">Pour qui</dt><dd className="text-ivoire">Masters double compétence</dd></div>
              </dl>
              <BoutonOr href="#">S’inscrire</BoutonOr>
            </div>
          </div>
        </div>
      </Apparition>
    </section>
  )
}

function Pied() {
  return (
    <footer className="border-t border-or/20 bg-nuit px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Couronne className="h-6 w-8 text-or" />
            <p className="font-serif text-3xl text-ivoire">Louis Marchal</p>
          </div>
          <p className="mt-3 text-sm font-light text-brume">Cosmétiques de luxe depuis les années 50. Une maison du groupe Skin Care.</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-or">Contact recrutement</p>
          <p className="mt-3 text-sm font-light leading-relaxed text-brume">M. Julien, Directeur des Ressources Humaines<br />56, allée des Cyprès<br />45400 Fleury-les-Aubrais</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-or">À propos de ce site</p>
          <p className="mt-3 text-sm font-light leading-relaxed text-brume">Projet étudiant (L3 CCA, IAE). Louis Marchal est une entreprise fictive, issue d’un cas pédagogique de marketing RH.</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="bg-encre font-sans text-ivoire selection:bg-or selection:text-encre">
      <Navigation />
      <main>
        <Hero />
        <Bandeau />
        <Engagements />
        <Parcours />
        <Journees />
        <LabDay />
      </main>
      <Pied />
    </div>
  )
}
