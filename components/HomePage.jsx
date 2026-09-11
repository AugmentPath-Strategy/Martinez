"use client";

import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Ticker from "./Ticker";
import AreaMapSection from "./AreaMapSection";
import { useQuote } from "./QuoteContext";

const GALLERY = [
  { category: "interior", src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80", caption: "Interior Transformations" },
  { category: "residential", src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80", caption: "Residential Projects" },
  { category: "specialty", src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=900&q=80", caption: "Specialty Finishes" },
  { category: "commercial", src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80", caption: "Commercial Spaces" },
  { category: "exterior", src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80", caption: "Exterior Makeovers" },
  { category: "interior", src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80", caption: "Interior Transformations" },
  { category: "residential", src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdac?auto=format&fit=crop&w=900&q=80", caption: "Residential Projects" },
  { category: "specialty", src: "https://images.unsplash.com/photo-1615874959474-d391ffcdc310?auto=format&fit=crop&w=900&q=80", caption: "Specialty Finishes" },
];

const FAQS = [
  {
    q: "Does Martinez Painting offer free estimates for their painting services?",
    a: "Yes, Martinez Painting provides free estimates for all their painting services. Whether you're planning a residential or commercial project, their team will assess your needs and offer an accurate quote at no cost, helping you budget effectively without any obligation.",
  },
  {
    q: "What makes Martinez Painting different from other painting services?",
    a: "Martinez Painting stands out for our commitment to personalized service, attention to detail, and the highest quality workmanship. We use premium paints and materials to ensure a beautiful, lasting finish, and our experienced team is dedicated to working closely with clients to understand their vision and exceed their expectations. Moreover, we offer flexible scheduling and competitive pricing to accommodate the unique needs of each project, ensuring a smooth and satisfying experience from start to finish.",
  },
  {
    q: "What services does Martinez Painting provide?",
    a: "Martinez Painting offers a wide range of services to meet all your painting needs, including residential and commercial interior and exterior painting, surface preparation, drywall repair, wallpaper removal, color consultations, and specialty finishes. Our skilled team is dedicated to delivering high-quality craftsmanship and exceptional customer service, ensuring your spaces are transformed beautifully and efficiently.",
  },
  {
    q: "How do I get a quote from Martinez Painting?",
    a: "Receiving a quote is easy and only takes three simple steps. Send us a text, chat on the phone, then receive a quote. We usually respond via text within a few minutes. Use Send us a Text or Get a Free Quote to get started.",
  },
  {
    q: "Which areas does Martinez Painting serve?",
    a: "Martinez Painting proudly serves Austin, TX and surrounding areas, including Round Rock, Cedar Park, Georgetown, San Marcos, Leander, Pflugerville, University of Texas, Kyle, and Hutto.",
  },
  {
    q: "What are Martinez Painting’s hours, and is the team insured?",
    a: "Sunday 08:00am–06:00pm, Monday through Friday 9:00am–5:00pm, and Saturday 08:00am–06:00pm. Martinez Painting is insured, and our properties work is completed with care, precision, and clear communication.",
  },
];

const FILTERS = [
  ["commercial", "Commercial Spaces"],
  ["exterior", "Exterior Makeovers"],
  ["interior", "Interior Transformations"],
  ["residential", "Residential Projects"],
  ["specialty", "Specialty Finishes"],
  ["all", "All Photos"],
];

export default function HomePage() {
  const { openQuote } = useQuote();
  const [filter, setFilter] = useState("all");
  const [openFaq, setOpenFaq] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  const photos = GALLERY.filter((item) => filter === "all" || item.category === filter);

  return (
    <>
      <Header onFilter={setFilter} />
      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <div>
              <p className="kicker">The painter service in Austin, TX</p>
              <h1>Martinez <em>Painting</em></h1>
              <p className="hero-lead">Martinez Painting provides reliable painter services in Austin, TX and surrounding areas, delivering quality results for homes and businesses through the painter.</p>
              <div className="hero-actions">
                <button className="btn btn-cream" onClick={openQuote}>Get a Free Quote</button>
                <button className="btn btn-line" onClick={openQuote}>Call Us</button>
              </div>
            </div>
            <div className="hero-meta">
              <span>Interior · Exterior · Commercial</span>
              <span>Austin & nearby communities</span>
            </div>
          </div>
          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1800&q=80" alt="Thoughtfully finished kitchen interior" />
            <div className="swatches" aria-hidden="true">
              <i className="swatch" /><i className="swatch" /><i className="swatch" /><i className="swatch" />
            </div>
            <div className="stamp">Our properties<br />Insured</div>
          </div>
        </section>

        <Ticker />

        <section className="block" id="about">
          <div className="wrap about">
            <div className="about-art">
              <img className="main" src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80" alt="Martinez Painting team in Austin, TX - people or person" />
              <img className="float" src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80" alt="Warm painted interior with wood and plaster tones" />
              <span className="caption">Our properties · Insured</span>
            </div>
            <div>
              <p className="folio"><span>01 / Studio</span><span>About Us</span></p>
              <h2>About Us</h2>
              <p>We at Martinez Painting proudly serve Austin, TX, and nearby communities with skilled, reliable painter services. Our team brings care, precision, and vibrant results to every project, from interiors to exteriors. We focus on quality workmanship, clear communication, and customer satisfaction in every space we transform.</p>
              <p className="social-line">Connect with our socials · <a href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a></p>
              <div className="palette">
                <div className="chip c1"><span>01</span><b>Clay</b></div>
                <div className="chip c2"><span>02</span><b>Caliche</b></div>
                <div className="chip c3"><span>03</span><b>Live Oak</b></div>
                <div className="chip c4"><span>04</span><b>Limestone</b></div>
                <div className="chip c5"><span>05</span><b>Ink</b></div>
              </div>
            </div>
          </div>
        </section>

        <section id="services">
          <div className="wrap block" style={{ paddingBottom: 24 }}>
            <p className="folio"><span>02 / Practice</span><span>Our Services</span></p>
            <div className="services-head"><h2>What we are best at</h2></div>
          </div>
          <article className="service-row" id="interior">
            <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80" alt="Interior painting for Martinez Painting in Austin, TX" />
            <div className="copy">
              <div className="idx">01 — Interior</div>
              <h3>Interior Painting</h3>
              <p>Transform your home with our expert interior painting service, delivering precision and premium finishes. Enhance every room&apos;s ambiance while ensuring durability and a meticulous touch in every stroke.</p>
            </div>
          </article>
          <article className="service-row reverse" id="exterior">
            <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80" alt="Exterior painting for Martinez Painting in Austin, TX" />
            <div className="copy">
              <div className="idx">02 — Exterior</div>
              <h3>Exterior Painting</h3>
              <p>Transform your home&apos;s appearance with our professional exterior painting service, providing exceptional craftsmanship, high-quality paints, and a meticulous approach to ensure a stunning and long-lasting finish that enhances curb appeal.</p>
            </div>
          </article>
          <article className="service-row" id="commercial">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80" alt="Commercial painting for Martinez Painting in Austin, TX" />
            <div className="copy">
              <div className="idx">03 — Commercial</div>
              <h3>Commercial Painting</h3>
              <p>Enhance your home&apos;s aesthetic with our Commercial Painting service, offering expert craftsmanship, premium materials, and a flawless finish to transform spaces efficiently while minimizing disruption to your daily routine.</p>
            </div>
          </article>
        </section>

        <section className="mid-cta">
          <div className="wrap">
            <p className="kicker">Ready to get started?</p>
            <h2>Book an appointment today.</h2>
            <div className="hero-actions">
              <button className="btn btn-cream" onClick={openQuote}>Get a Free Quote</button>
              <button className="btn btn-line" onClick={openQuote}>Call Us</button>
            </div>
          </div>
        </section>

        <section className="block" id="quote">
          <div className="wrap process">
            <div>
              <p className="folio"><span>03 / Quote</span><span>Get a quote</span></p>
              <h2>Receiving a quote is easy and only takes three simple steps</h2>
            </div>
            <div className="timeline">
              <article className="tl">
                <div className="idx">01</div>
                <h3>Send us a text</h3>
                <p>Tell us what you need painted. We usually respond via text within a few minutes.</p>
                <button className="btn btn-fill" style={{ marginTop: 18 }} onClick={openQuote}>Text Us</button>
              </article>
              <article className="tl">
                <div className="idx">02</div>
                <h3>Chat on the phone</h3>
                <p>Walk through colors, timing, and the rooms or buildings that need attention.</p>
              </article>
              <article className="tl">
                <div className="idx">03</div>
                <h3>Receive a quote</h3>
                <p>Get a clear, no-obligation estimate for residential or commercial work.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="block" id="galleries" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="gallery-tools">
              <div>
                <p className="folio"><span>04 / Archive</span><span>Our Best Work</span></p>
                <h2>See why our customers love us</h2>
                <a className="see-all" href="#galleries" onClick={() => setFilter("all")}>See all photos</a>
              </div>
              <div className="filters">
                {FILTERS.map(([value, label]) => (
                  <button key={value} className={`filter${filter === value ? " active" : ""}`} type="button" onClick={() => setFilter(value)}>{label}</button>
                ))}
              </div>
            </div>
            <div className="masonry gallery-grid">
              {photos.map((photo) => (
                <figure key={photo.src} onClick={() => setLightbox(photo)}>
                  <img src={photo.src} alt="for Martinez Painting in Austin, TX" />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="block block-dark" id="reviews">
          <div className="wrap">
            <p className="folio"><span>05 / Voice</span><span>Reviews</span></p>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 36, alignItems: "end" }}>
              <h2 style={{ fontSize: "clamp(48px,6vw,88px)" }}>Leave Us a Review</h2>
              <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                <a className="btn btn-line" href="https://www.google.com/search?q=Martinez+Painting+Austin+TX+reviews" target="_blank" rel="noreferrer">Leave us a review on Google</a>
                <a className="btn btn-line" href="https://www.facebook.com" target="_blank" rel="noreferrer">Leave us a review on Facebook</a>
                <a className="btn btn-cream" href="#reviews">See all reviews</a>
              </div>
            </div>
            <div className="reviews-wrap">
              <article className="review featured">
                <div>
                  <div className="stars">★★★★★ out of 5 stars</div>
                  <p>“Stop thinking about it, and just call them! They&apos;re worth every penny.”</p>
                </div>
                <footer>Linda Perkins · Interior Painting · Facebook</footer>
              </article>
              <article className="review">
                <div>
                  <div className="stars">★★★★★ out of 5 stars</div>
                  <p>“Reach out today! They came in clutch when I was in need. Thank you!”</p>
                </div>
                <footer>Aubree Bowers · Interior Painting · Facebook</footer>
              </article>
              <article className="review">
                <div>
                  <div className="stars">★★★★★ out of 5 stars</div>
                  <p>“I tell everyone I know to give them a call - they&apos;re the best there is!”</p>
                </div>
                <footer>Rihanna Rivas · Interior Painting · Facebook</footer>
              </article>
            </div>
          </div>
        </section>

        <section className="block faq-band" id="faq">
          <div className="wrap">
            <p className="folio"><span>06 / Notes</span><span>FAQ image</span></p>
            <h2 className="faq-title">Frequently asked questions</h2>
            <div className="faq-full">
              {FAQS.map((item, index) => (
                <article className={`faq-item${openFaq === index ? " open" : ""}`} key={item.q}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                    <span className="q">{item.q}</span>
                    <span className="mark">{openFaq === index ? "−" : "+"}</span>
                  </button>
                  <p>{item.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <AreaMapSection />

        <section className="block" id="showcases">
          <div className="wrap">
            <p className="folio"><span>08 / Journal</span><span>Explore local project showcases</span></p>
            <h2 style={{ fontSize: "clamp(42px,5vw,72px)", marginBottom: 8 }}>Austin, TX · Jun 2024</h2>
            <div className="journal">
              <article className="entry">
                <div className="meta">Linda Perkins<br />5 · Jun 2024</div>
                <div>
                  <h3>“Reviving Reliability: A Comprehensive Case Study of Advanced Roofing Repairs and Restoration”</h3>
                  <p>One of the most compelling aspects of the &quot;Reviving Reliability: A Comprehensive Case Study of Advanced Roofing Repairs and Restoration&quot; project was our approach to diagnosing and addressing roof deterioration. Our team implemented a multi-step evaluation process that began with an in-depth inspection utilizing drone technology and thermal imaging. This allowed us to identify hidden leaks and underlying damage that might not have been visible through traditional inspection methods. Once the comprehensive assessment was complete, we collaborated closely with structural engineers to craft a tailored repair plan, ensuring that each weak spot was meticulously fortified. Key areas such as flashing, shingles, and underlayment were replaced using top-grade materials known for their durability and weather resistance. By incorporating cutting-edge techniques including synthetic underlayment and seamless gutters, we not only restored the roof&apos;s integrity but significantly enhanced its longevity. This methodical and innovative repair process not only revives the roof’s reliability but also provides the homeowner with a renewed sense of security, knowing their investment is protected against future unforeseeable weather conditions.</p>
                  <p style={{ marginTop: 14, color: "#f3ece3" }}>Stop thinking about it, and just call them! They&apos;re worth every penny.</p>
                </div>
                <div className="meta">Austin, TX</div>
              </article>
              <article className="entry">
                <div className="meta">Linda Perkins<br />5 · Jun 2024</div>
                <div>
                  <h3>“Rebuilding Roofs, Restoring Trust: A Case Study on Successful Roofing Replacement Projects”</h3>
                  <p>One exemplary project that highlights the success of our roofing replacement initiatives took place in the suburban community of Brookside. The Brookside Middle School, an iconic building dating back to the 1960s, was facing severe issues due to an aging roof that had developed leaks and was compromising the integrity of the structure. Our team commenced the project with a comprehensive assessment, identifying not only the evident problems but also latent issues that could pose future risks. A key aspect of our approach was the use of durable, eco-friendly materials that promised longevity and sustainability. Our communication with the school administration was transparent and continuous; they were kept informed at every phase, ensuring there were no surprises and that the project timeline was adhered to meticulously. During construction, we implemented stringent safety protocols to safeguard both workers and students, coordinating closely to minimize disruptions to the school’s daily activities. The project was completed ahead of schedule, and the new roof not only revitalized the building’s appearance but also significantly enhanced its functionality. Feedback from the school community was overwhelmingly positive, with many praising the professionalism and reliability of our team. This project did more than just replace a roof; it restored trust in the possibility of seamless, high-quality construction work, reinforcing our reputation as a dependable partner in community infrastructure projects.</p>
                  <p style={{ marginTop: 14, color: "#f3ece3" }}>Stop thinking about it, and just call them! They&apos;re worth every penny.</p>
                </div>
                <div className="meta">Austin, TX</div>
              </article>
              <article className="entry">
                <div className="meta">Aubree Bowers<br />5 · Jun 2024</div>
                <div>
                  <h3>“Seamless Durability: A Comprehensive Case Study of a Modern Roofing Installation Project”</h3>
                  <p>Seamless Durability: A Comprehensive Case Study of a Modern Roofing Installation Project One of the defining elements of this modern roofing installation project was the meticulous selection of materials, which set the foundation for its long-term durability and aesthetic appeal. To achieve an optimal balance between resilience and visual harmony, our team opted for high-performance composite shingles known for their impressive endurance against harsh weather conditions. These shingles not only offered superior protection against winds, rain, and hail but also significantly reduced maintenance needs for the client. Additionally, the chosen materials boasted energy-efficient properties, reflecting solar heat away from the building and thereby contributing to lower utility costs. The installation process itself demonstrated seamless precision; our team utilized advanced roofing techniques, including reinforced underlayment and state-of-the-art ventilation systems, to prevent moisture buildup and potential structural damage. Each phase of the project, from initial assessment to final inspection, was executed with rigorous attention to detail, ensuring that the new roof would provide robust protection and retaining its pristine appearance for years to come. The client&apos;s satisfaction was further affirmed through a series of post-installation evaluations, which confirmed that our approach not only met but exceeded industry standards for modern roofing installations.</p>
                  <p style={{ marginTop: 14, color: "#f3ece3" }}>Reach out today! They came in clutch when I was in need. Thank you!</p>
                </div>
                <div className="meta">Austin, TX</div>
              </article>
            </div>
            <a className="see-all" href="#showcases">See more project showcases</a>
          </div>
        </section>

        <section className="cta">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80" alt="Ready to get started cover-photo" />
          <div className="inner">
            <p className="kicker" style={{ color: "#e7b089" }}>Ready to get started?</p>
            <h2>Book an appointment today.</h2>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <span className="btn btn-cream" style={{ cursor: "default" }}>Insured</span>
              <button className="btn btn-cream" onClick={openQuote}>Get a Free Quote</button>
              <button className="btn btn-line" onClick={openQuote}>Call Us</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {lightbox && (
        <div className="lightbox open" onClick={() => setLightbox(null)}>
          <img src={lightbox.src} alt="Gallery photo" />
        </div>
      )}
    </>
  );
}
