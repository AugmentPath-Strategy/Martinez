"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import Ticker from "./Ticker";
import AreaMapSection from "./AreaMapSection";
import Hero from "./Hero";
import Reveal from "./Reveal";
import FolioPin from "./FolioPin";
import Cta from "./Cta";
import { useQuote } from "./QuoteContext";
import { FAQS, FILTERS, GALLERY, PALETTE, SHOWCASES } from "@/lib/siteContent";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const SERVICES = [
  {
    id: "interior",
    idx: "01 — Interior",
    title: "Interior Painting",
    copy: "Transform your home with our expert interior painting service, delivering precision and premium finishes. Enhance every room's ambiance while ensuring durability and a meticulous touch in every stroke.",
    src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80",
    alt: "Bedroom interior with a calm limestone repaint and precise trim work in Austin, TX",
  },
  {
    id: "exterior",
    idx: "02 — Exterior",
    title: "Exterior Painting",
    copy: "Transform your home's appearance with our professional exterior painting service, providing exceptional craftsmanship, high-quality paints, and a meticulous approach to ensure a stunning and long-lasting finish that enhances curb appeal.",
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80",
    alt: "Two-story residential exterior after a full repaint in Round Rock, TX",
    reverse: true,
  },
  {
    id: "commercial",
    idx: "03 — Commercial",
    title: "Commercial Painting",
    copy: "Enhance your workplace with our commercial painting service, offering expert craftsmanship, premium materials, and a flawless finish to transform spaces efficiently while minimizing disruption to your daily routine.",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
    alt: "Commercial office interior after an after-hours painting project in Austin, TX",
  },
];

export default function HomePage() {
  const { openQuote } = useQuote();
  const reduced = usePrefersReducedMotion();
  const [filter, setFilter] = useState("all");
  const [openFaq, setOpenFaq] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const photos = GALLERY.filter((item) => filter === "all" || item.category === filter);

  return (
    <>
      <Header onFilter={setFilter} />
      <main id="home">
        <Hero />
        <Ticker />

        <FolioPin index="01" label="Studio">
          <section className="bg-[color:var(--bg)] py-28" id="about">
            <div className="mx-auto grid w-[min(1320px,calc(100%-48px))] items-center gap-16 lg:grid-cols-2">
              <div className="relative">
                <img
                  className="aspect-[4/5] w-full object-cover"
                  src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80"
                  alt="Martinez Painting crew preparing an interior wall in Austin, TX"
                />
                <img
                  className="absolute -right-6 -bottom-10 hidden w-[46%] border-[10px] border-[color:var(--bg)] object-cover shadow-2xl md:block"
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
                  alt="Warm painted interior with wood millwork and plaster tones in Austin, TX"
                />
                <span className="mt-4 inline-block text-[12px] tracking-[0.16em] uppercase text-[color:var(--muted)]">Our properties · Insured</span>
              </div>
              <div>
                <p className="folio lg:hidden"><span>01 / Studio</span><span>About Us</span></p>
                <h2 className="mb-6 text-[clamp(48px,6vw,84px)]">About Us</h2>
                <p className="max-w-[46ch] text-[17px] text-[color:var(--muted)]">
                  We at Martinez Painting proudly serve Austin, TX, and nearby communities with skilled, reliable painter services. Our team brings care, precision, and vibrant results to every project, from interiors to exteriors. We focus on quality workmanship, clear communication, and customer satisfaction in every space we transform.
                </p>
                <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                  {PALETTE.map((chip) => (
                    <div key={chip.name} className="min-h-[88px] p-3 text-[11px] tracking-[0.12em] uppercase" style={{ background: chip.hex, color: chip.name === "Ink" ? "#f3ece3" : "#161310" }}>
                      <span className="opacity-60">{chip.id}</span>
                      <b className="mt-3 block font-sans font-semibold">{chip.name}</b>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </FolioPin>

        <FolioPin index="02" label="Practice">
          <section id="services">
            <Reveal className="mx-auto w-[min(1320px,calc(100%-48px))] pb-6 pt-28">
              <p className="folio lg:hidden"><span>02 / Practice</span><span>Our Services</span></p>
              <h2 className="text-[clamp(48px,6vw,84px)]">What we are best at</h2>
            </Reveal>
            {SERVICES.map((service) => (
              <article
                key={service.id}
                id={service.id}
                className={`grid min-h-[70vh] lg:grid-cols-2 ${service.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="min-h-[320px] overflow-hidden">
                  <motion.img
                    src={service.src}
                    alt={service.alt}
                    className="h-full w-full object-cover"
                    whileHover={reduced ? {} : { scale: 1.04 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <Reveal className="flex flex-col justify-center bg-[color:var(--bg-raised)] px-8 py-16 md:px-16">
                  <div className="text-[12px] tracking-[0.18em] uppercase text-clay">{service.idx}</div>
                  <h3 className="mt-4 text-[clamp(40px,5vw,68px)]">{service.title}</h3>
                  <p className="mt-5 max-w-[42ch] text-[color:var(--muted)]">{service.copy}</p>
                </Reveal>
              </article>
            ))}
          </section>
        </FolioPin>

        <section className="bg-live-oak py-24 text-limestone">
          <Reveal className="mx-auto w-[min(1320px,calc(100%-48px))]">
            <p className="kicker">Ready to get started?</p>
            <h2 className="mt-4 text-[clamp(48px,6vw,88px)]">Book an appointment today.</h2>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Cta variant="primary" onClick={openQuote}>Get a Free Quote</Cta>
              <Cta variant="tertiary" className="text-caliche" onClick={openQuote}>Call Us</Cta>
            </div>
          </Reveal>
        </section>

        <FolioPin index="03" label="Quote">
          <section className="bg-[color:var(--bg)] py-28" id="quote">
            <Reveal className="mx-auto w-[min(1320px,calc(100%-48px))]">
              <p className="folio lg:hidden"><span>03 / Quote</span><span>Get a quote</span></p>
              <h2 className="max-w-[16ch] text-[clamp(42px,5vw,76px)]">Receiving a quote is easy and only takes three simple steps</h2>
              <div className="mt-16 grid gap-10 md:grid-cols-3">
                {[
                  ["01", "Send us a text", "Tell us what you need painted. We usually respond via text within a few minutes."],
                  ["02", "Chat on the phone", "Walk through colors, timing, and the rooms or buildings that need attention."],
                  ["03", "Receive a quote", "Get a clear, no-obligation estimate for residential or commercial work."],
                ].map(([idx, title, copy]) => (
                  <article key={idx} className="border-t border-[color:var(--rule)] pt-6">
                    <div className="text-clay">{idx}</div>
                    <h3 className="mt-3 text-[36px]">{title}</h3>
                    <p className="mt-3 text-[color:var(--muted)]">{copy}</p>
                    {idx === "01" && (
                      <div className="mt-6">
                        <Cta variant="secondary" onClick={openQuote}>Send us a Text</Cta>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </Reveal>
          </section>
        </FolioPin>

        <FolioPin index="04" label="Archive">
          <section className="bg-[color:var(--bg)] pb-28" id="galleries">
            <div className="mx-auto w-[min(1320px,calc(100%-48px))]">
              <Reveal className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
                <div>
                  <p className="folio lg:hidden"><span>04 / Archive</span><span>Our Best Work</span></p>
                  <h2 className="text-[clamp(42px,5vw,76px)]">See why our customers love us</h2>
                  <button className="mt-4 text-[12px] tracking-[0.16em] uppercase text-clay" type="button" onClick={() => setFilter("all")}>See all photos</button>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] tracking-[0.14em] uppercase">
                  {FILTERS.map(([value, label]) => (
                    <button
                      key={value}
                      className={filter === value ? "text-clay" : "text-[color:var(--muted)]"}
                      type="button"
                      onClick={() => setFilter(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </Reveal>
              <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
                {photos.map((photo) => (
                  <motion.figure
                    key={photo.src}
                    className="mb-4 cursor-pointer break-inside-avoid"
                    whileHover={reduced ? {} : { y: -4 }}
                    onClick={() => setLightbox(photo)}
                  >
                    <img src={photo.src} alt={photo.alt} className="w-full cursor-pointer object-cover" />
                    <figcaption className="mt-2 text-[12px] tracking-[0.12em] uppercase text-[color:var(--muted)]">{photo.caption}</figcaption>
                  </motion.figure>
                ))}
              </div>
            </div>
          </section>
        </FolioPin>

        <FolioPin index="05" label="Voice">
          <section className="bg-[color:var(--bg-deep)] py-28" id="reviews">
            <Reveal className="mx-auto w-[min(1320px,calc(100%-48px))]">
              <p className="folio lg:hidden"><span>05 / Voice</span><span>Reviews</span></p>
              <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
                <h2 className="text-[clamp(48px,6vw,88px)]">Leave Us a Review</h2>
                <div className="flex flex-wrap items-center gap-4">
                  <Cta as="a" variant="secondary" href="https://www.google.com/search?q=Martinez+Painting+Austin+TX+reviews" target="_blank" rel="noreferrer">Leave us a review on Google</Cta>
                  <Cta as="a" variant="tertiary" href="#reviews">See all reviews</Cta>
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                <article className="bg-[color:var(--bg-raised)] p-8 lg:col-span-2">
                  <div className="text-clay">★★★★★ out of 5 stars</div>
                  <p className="mt-6 font-display text-[clamp(28px,3vw,42px)] leading-tight">“Stop thinking about it, and just call them! They&apos;re worth every penny.”</p>
                  <footer className="mt-8 text-[12px] tracking-[0.12em] uppercase text-[color:var(--muted)]">Linda Perkins · Interior Painting</footer>
                </article>
                <article className="bg-[color:var(--bg-raised)] p-8">
                  <div className="text-clay">★★★★★ out of 5 stars</div>
                  <p className="mt-6 font-display text-[28px] leading-tight">“Reach out today! They came in clutch when I was in need. Thank you!”</p>
                  <footer className="mt-8 text-[12px] tracking-[0.12em] uppercase text-[color:var(--muted)]">Aubree Bowers · Interior Painting</footer>
                </article>
                <article className="bg-[color:var(--bg-raised)] p-8 lg:col-span-3">
                  <div className="text-clay">★★★★★ out of 5 stars</div>
                  <p className="mt-6 font-display text-[28px] leading-tight">“I tell everyone I know to give them a call - they&apos;re the best there is!”</p>
                  <footer className="mt-8 text-[12px] tracking-[0.12em] uppercase text-[color:var(--muted)]">Rihanna Rivas · Interior Painting</footer>
                </article>
              </div>
            </Reveal>
          </section>
        </FolioPin>

        <FolioPin index="06" label="Notes">
          <section className="bg-[color:var(--bg)] py-28" id="faq">
            <Reveal className="mx-auto w-[min(860px,calc(100%-48px))]">
              <p className="folio lg:hidden"><span>06 / Notes</span><span>FAQ</span></p>
              <h2 className="mb-12 text-[clamp(42px,5vw,76px)]">Frequently asked questions</h2>
              <div>
                {FAQS.map((item, index) => {
                  const open = openFaq === index;
                  return (
                    <article key={item.q} className="border-t border-[color:var(--rule)]">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-[clamp(22px,3vw,32px)]"
                        onClick={() => setOpenFaq(open ? null : index)}
                        aria-expanded={open}
                      >
                        <span>{item.q}</span>
                        <span className="text-clay">{open ? "−" : "+"}</span>
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={reduced ? { opacity: 1 } : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reduced ? { opacity: 1 } : { height: 0, opacity: 0 }}
                            transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pb-6 text-[color:var(--muted)]">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </article>
                  );
                })}
              </div>
            </Reveal>
          </section>
        </FolioPin>

        <AreaMapSection />

        <FolioPin index="08" label="Journal">
          <section className="bg-[color:var(--bg)] py-28" id="showcases">
            <Reveal className="mx-auto w-[min(1320px,calc(100%-48px))]">
              <p className="folio lg:hidden"><span>08 / Journal</span><span>Explore local project showcases</span></p>
              <h2 className="mb-2 text-[clamp(42px,5vw,72px)]">Austin, TX · Jun 2024</h2>
              <div className="mt-12 space-y-16">
                {SHOWCASES.map((entry) => (
                  <article key={entry.title} className="grid gap-6 border-t border-[color:var(--rule)] pt-10 lg:grid-cols-[160px_1fr_120px]">
                    <div className="text-[13px] text-[color:var(--muted)]">{entry.author}<br />5 · {entry.date}</div>
                    <div>
                      <h3 className="text-[clamp(28px,3vw,40px)] leading-tight">“{entry.title}”</h3>
                      <p className="mt-5 max-w-[68ch] text-[color:var(--muted)]">{entry.body}</p>
                      <p className="mt-4 text-caliche">{entry.quote}</p>
                    </div>
                    <div className="text-[13px] text-[color:var(--muted)]">{entry.place}</div>
                  </article>
                ))}
              </div>
              <a className="mt-10 inline-block text-[12px] tracking-[0.16em] uppercase text-clay" href="#showcases">See more project showcases</a>
            </Reveal>
          </section>
        </FolioPin>

        <section className="relative min-h-[70vh] overflow-hidden">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            alt="Austin home exterior at dusk after a Martinez Painting project"
          />
          <div className="absolute inset-0 bg-ink/55" />
          <Reveal className="relative z-10 mx-auto flex min-h-[70vh] w-[min(1320px,calc(100%-48px))] flex-col justify-end py-20 text-limestone">
            <p className="kicker">Ready to get started?</p>
            <h2 className="mt-4 max-w-[10ch] text-[clamp(52px,8vw,100px)]">Book an appointment today.</h2>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="text-[11px] tracking-[0.16em] uppercase text-caliche">Insured</span>
              <Cta variant="primary" onClick={openQuote}>Get a Free Quote</Cta>
              <Cta variant="tertiary" className="text-caliche" onClick={openQuote}>Call Us</Cta>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
      {lightbox && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-ink/88 p-6" onClick={() => setLightbox(null)}>
          <img src={lightbox.src} alt={lightbox.alt} className="max-h-[88vh] max-w-full object-contain" />
        </div>
      )}
    </>
  );
}
