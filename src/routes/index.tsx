import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import heroAsset from "@/assets/background.png.asset.json";
const heroImg = heroAsset.url;
import catImg from "@/assets/elixa-cat.jpg";
import { LeafIllustration } from "@/components/elixa/LeafIllustration";
import { needs, plants, type NeedId, type Plant } from "@/components/elixa/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ELIXA — لعبة النبات والكيمياء في مستحضرات التجميل" },
      {
        name: "description",
        content:
          "ELIXA: an interactive bilingual formulation lab linking botany and chemistry. Pick a plant, reveal its active compound, and craft cosmetic products.",
      },
      { property: "og:title", content: "ELIXA — Botany meets cosmetic chemistry" },
      {
        property: "og:description",
        content:
          "Pick a glowing leaf, reveal its active compound, and match it to a skin need in this bilingual formulation lab.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Elixa,
});

const STORAGE_KEY = "elixa-collection-v1";

function Bi({
  ar,
  en,
  arClass = "",
  enClass = "",
}: {
  ar: string;
  en: string;
  arClass?: string;
  enClass?: string;
}) {
  return (
    <span className="block">
      <span className={`block ${arClass}`}>{ar}</span>
      <span className={`en-line mt-0.5 block ${enClass}`}>{en}</span>
    </span>
  );
}

function Elixa() {
  const [selected, setSelected] = useState<Plant | null>(null);
  const [made, setMade] = useState<string[]>([]);
  const [hint, setHint] = useState<string | null>(null);
  const [cloudy, setCloudy] = useState(false);
  const [justMade, setJustMade] = useState<Plant | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMade(JSON.parse(raw) as string[]);
    } catch {
      /* storage unavailable — play without saving */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(made));
    } catch {
      /* ignore */
    }
  }, [made]);

  const complete = made.length === plants.length;
  const progress = useMemo(() => (made.length / plants.length) * 100, [made]);

  function pickPlant(p: Plant) {
    setSelected(p);
    setCloudy(false);
    setHint(null);
    setJustMade(null);
  }

  function pickNeed(need: NeedId) {
    if (!selected) return;
    if (need === selected.need) {
      setCloudy(false);
      setHint(null);
      setJustMade(selected);
      setMade((prev) => (prev.includes(selected.id) ? prev : [...prev, selected.id]));
    } else {
      setCloudy(true);
      setJustMade(null);
      setHint(selected.id);
    }
  }

  function resetLab() {
    setMade([]);
    setSelected(null);
    setJustMade(null);
    setCloudy(false);
    setHint(null);
  }

  return (
    <div dir="rtl" className="relative min-h-screen">
      <div className="elixa-shimmer" aria-hidden="true" />
      <div className="elixa-sparkle" aria-hidden="true" />

      {/* ---------------- HERO ---------------- */}
      <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-20 text-center">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={940}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--background) 45%, transparent) 0%, color-mix(in oklab, var(--background) 55%, transparent) 45%, color-mix(in oklab, var(--background) 92%, transparent) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-7">
          <h1 className="elixa-title text-5xl leading-none sm:text-7xl md:text-8xl">ELIXA</h1>

          <p className="ar-heading text-xl text-balance sm:text-2xl">
            لما النبات يقابل الكيمياء… يطلع مستحضر تجميل
            <span className="en-line mt-1 block text-sm">
              Where botany meets chemistry, a cosmetic is born
            </span>
          </p>

          <p className="max-w-xl text-sm leading-relaxed text-foreground/85 sm:text-base">
            في ELIXA هتلعب دور مطوّر تركيبات: تختار نبات، تكتشف المركب الفعّال اللي جواه، وتوصّله
            بالاحتياج الصح للبشرة.
            <span className="en-line mt-1.5 block">
              In ELIXA you play a formulator: choose a plant, uncover its active compound, and match
              it to the right skin need.
            </span>
          </p>

          <ol className="grid w-full gap-3 sm:grid-cols-3">
            {[
              { n: "١", ar: "النبات", en: "Plant" },
              { n: "٢", ar: "المركب الفعّال", en: "Active compound" },
              { n: "٣", ar: "المنتج", en: "Product" },
            ].map((s) => (
              <li key={s.en} className="elixa-panel px-4 py-4">
                <span className="elixa-title block text-lg text-[color:var(--gold)]">{s.n}</span>
                <Bi ar={s.ar} en={s.en} arClass="ar-heading text-lg" />
              </li>
            ))}
          </ol>

          <a
            href="#lab"
            className="group mt-2 inline-flex flex-col items-center rounded-full border border-[color:var(--teal)]/60 bg-[color:var(--teal)]/12 px-9 py-3 transition hover:bg-[color:var(--teal)]/22"
            style={{ boxShadow: "var(--glow-teal)" }}
          >
            <span className="ar-heading text-xl">ابدأ التجربة</span>
            <span className="en-line">Start</span>
          </a>
        </div>
      </header>

      {/* ---------------- LAB ---------------- */}
      <main id="lab" className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <section className="text-center">
          <h2 className="ar-heading text-3xl sm:text-4xl">
            معمل التركيبات
            <span className="en-line mt-1 block text-sm">The formulation lab</span>
          </h2>
        </section>

        {/* Step 1 — shelf of plants */}
        <section className="mt-12">
          <h3 className="ar-heading text-2xl">
            ١ — اختار نبات من الرف
            <span className="en-line mt-1 block">Pick a plant from the shelf</span>
          </h3>

          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {plants.map((p) => {
              const active = selected?.id === p.id;
              const done = made.includes(p.id);
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => pickPlant(p)}
                    aria-pressed={active}
                    className={`elixa-panel flex w-full flex-col items-center gap-2 px-3 py-5 transition duration-300 hover:-translate-y-1 ${
                      active ? "border-[color:var(--teal)]" : ""
                    }`}
                    style={active ? { boxShadow: `0 0 26px ${p.leaf.glow}66` } : undefined}
                  >
                    <LeafIllustration id={p.id} {...p.leaf} />
                    <Bi ar={p.ar} en={p.en} arClass="ar-heading text-lg" />
                    {done && (
                      <span className="en-line text-[color:var(--gold)]">collected ✦</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Step 2 + 3 — beaker & needs */}
        <section className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          {/* Beaker */}
          <div className="elixa-panel flex flex-col items-center gap-5 p-6">
            <h3 className="ar-heading self-start text-2xl">
              ٢ — البيكر والمركب الفعّال
              <span className="en-line mt-1 block">The beaker and its active compound</span>
            </h3>

            <div className="relative h-56 w-40">
              <div
                className="absolute inset-x-2 top-3 bottom-0 overflow-hidden rounded-b-[2.2rem] rounded-t-md border-2 border-white/35"
                style={{ background: "color-mix(in oklab, white 6%, transparent)" }}
              >
                {selected && (
                  <div
                    key={selected.id + String(cloudy)}
                    className="elixa-liquid absolute inset-x-0 bottom-0"
                    style={{
                      background: cloudy
                        ? "linear-gradient(to top, #8c93a8, #b9bfd0)"
                        : `linear-gradient(to top, ${selected.leaf.to}, ${selected.leaf.from})`,
                      boxShadow: cloudy ? "none" : `0 0 40px ${selected.leaf.glow}`,
                      opacity: cloudy ? 0.75 : 0.95,
                    }}
                  >
                    {!cloudy &&
                      [0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="absolute bottom-2 h-2 w-2 rounded-full bg-white/70"
                          style={{
                            left: `${20 + i * 28}%`,
                            animation: `elixa-bubble ${2.4 + i * 0.6}s ${i * 0.5}s ease-in infinite`,
                          }}
                        />
                      ))}
                  </div>
                )}
              </div>
              <div className="absolute inset-x-0 top-0 mx-auto h-3 w-28 rounded-full border-2 border-white/40 bg-white/10" />
            </div>

            <div className="min-h-20 text-center">
              {selected ? (
                <div className="elixa-rise" key={selected.id}>
                  <Bi
                    ar={`المركب الفعّال: ${selected.compoundAr}`}
                    en={`Active compound: ${selected.compound}`}
                    arClass="ar-heading text-xl"
                  />
                </div>
              ) : (
                <Bi
                  ar="اختار نبات الأول عشان البيكر يتملى"
                  en="Pick a plant first to fill the beaker"
                  arClass="text-sm text-muted-foreground"
                />
              )}
            </div>
          </div>

          {/* Needs */}
          <div className="elixa-panel flex flex-col gap-4 p-6">
            <h3 className="ar-heading text-2xl">
              ٣ — وصّل المركب باحتياج البشرة
              <span className="en-line mt-1 block">Match the compound to a skin need</span>
            </h3>

            <ul className="grid gap-3 sm:grid-cols-3">
              {needs.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    disabled={!selected}
                    onClick={() => pickNeed(n.id)}
                    className="h-full w-full rounded-[var(--radius-md)] border border-border bg-white/5 px-3 py-4 text-start transition hover:border-[color:var(--magenta)] hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <Bi ar={n.ar} en={n.en} arClass="ar-heading text-lg" />
                    <span className="mt-2 block text-xs text-muted-foreground">
                      {n.descAr}
                      <span className="en-line block">{n.desc}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Result */}
            <div className="min-h-32">
              {hint && selected && (
                <div className="elixa-rise rounded-[var(--radius-md)] border border-[color:var(--gold)]/45 bg-[color:var(--gold)]/10 p-4">
                  <Bi
                    ar={`محاولة حلوة! بس ${selected.ar} أقوى في حتة تانية — اقرا التلميح وجرّب تاني.`}
                    en="Nice try! This plant shines somewhere else — read the hint and try again."
                    arClass="ar-heading text-lg"
                  />
                  <p className="mt-2 text-sm leading-relaxed">
                    {selected.noteAr}
                    <span className="en-line mt-1 block">{selected.note}</span>
                  </p>
                </div>
              )}

              {justMade && (
                <div className="elixa-pop flex items-center gap-4 rounded-[var(--radius-md)] border border-[color:var(--teal)]/50 bg-white/5 p-4">
                  <ProductBottle plant={justMade} />
                  <div>
                    <Bi
                      ar={`تم تصنيع: ${justMade.productAr}`}
                      en={`Product created: ${justMade.product}`}
                      arClass="ar-heading text-lg"
                    />
                    <p className="mt-2 text-sm leading-relaxed">
                      {justMade.noteAr}
                      <span className="en-line mt-1 block">{justMade.note}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Collection shelf */}
        <section className="mt-12">
          <h3 className="ar-heading text-2xl">
            ٤ — رف المجموعة
            <span className="en-line mt-1 block">Your collection shelf</span>
          </h3>

          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full transition-[width] duration-700"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(to left, var(--teal), var(--magenta))",
              }}
            />
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-3 border-b-4 border-[color:var(--gold)]/35 pb-6 sm:grid-cols-3 lg:grid-cols-5">
            {plants.map((p) => {
              const done = made.includes(p.id);
              return (
                <li
                  key={p.id}
                  className="elixa-panel flex flex-col items-center gap-2 px-3 py-4 text-center"
                  style={done ? { boxShadow: `0 0 22px ${p.accent}44` } : { opacity: 0.45 }}
                >
                  {done ? (
                    <>
                      <ProductBottle plant={p} />
                      <Bi ar={p.productAr} en={p.product} arClass="ar-heading text-base" />
                    </>
                  ) : (
                    <>
                      <div className="h-24 w-12 rounded-md border border-dashed border-white/25" />
                      <Bi ar="خانة فاضية" en="Empty slot" arClass="text-sm" />
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {/* Celebration */}
        {complete && (
          <section
            dir="ltr"
            className="elixa-pop mt-12 overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--gold)]/45"
            style={{ boxShadow: "var(--glow-magenta)" }}
          >
            <div className="grid items-center gap-6 bg-white/5 p-6 backdrop-blur-md sm:grid-cols-[minmax(0,280px)_minmax(0,1fr)] sm:p-10">
              <img
                src={catImg}
                alt="A cat in a lab coat holding a glowing beaker"
                loading="lazy"
                width={1024}
                height={1024}
                className="mx-auto w-full max-w-[280px] rounded-[var(--radius-lg)]"
              />
              <div className="text-center sm:text-left">
                <h2 className="elixa-title text-2xl sm:text-4xl">Congrats, champ!</h2>
                <p className="mt-3 text-lg text-foreground/90">
                  You&apos;re now a cosmetics maker.
                </p>
                <button
                  type="button"
                  onClick={resetLab}
                  className="mt-6 rounded-full border border-[color:var(--teal)]/60 bg-[color:var(--teal)]/12 px-6 py-2 text-sm transition hover:bg-[color:var(--teal)]/22"
                >
                  Play again
                </button>
              </div>
            </div>
          </section>
        )}

        <footer className="mt-14 text-center">
          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-muted-foreground">
            اللعبة دي تعليمية وللتبسيط بس، ومش نصيحة طبية ولا وعد بنتيجة. تأثير أي مكوّن بيعتمد على
            تركيزه وثبات التركيبة كاملة.
            <span className="en-line mt-1.5 block">
              This game is educational and simplified. It is not medical advice or a promise of
              results; any ingredient&apos;s effect depends on its concentration and the stability
              of the full formulation.
            </span>
          </p>
        </footer>
      </main>
    </div>
  );
}

function ProductBottle({ plant }: { plant: Plant }) {
  return (
    <div className="relative h-24 w-12 shrink-0">
      <div className="absolute inset-x-3 top-0 h-3 rounded-t-sm bg-white/45" />
      <div
        className="absolute inset-x-0 top-3 bottom-0 overflow-hidden rounded-md border border-white/35"
        style={{
          background: `linear-gradient(to top, ${plant.leaf.to}, ${plant.leaf.from})`,
          boxShadow: `0 0 18px ${plant.accent}66`,
        }}
      >
        <span className="absolute inset-x-1 top-1/3 block rounded-[3px] bg-background/75 px-0.5 py-1 text-center text-[7px] leading-tight text-foreground">
          {plant.en}
        </span>
      </div>
    </div>
  );
}
