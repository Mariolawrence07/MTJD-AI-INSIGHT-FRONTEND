import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden ">
      {/* Background (teal slash motif) */}
      {/* <div className="pointer-events-none absolute inset-0 overflow-clip">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[1100px] -translate-x-1/2 rotate-[-6deg] bg-primary/15" />
        <div className="absolute top-10 left-1/2 h-[520px] w-[1200px] -translate-x-1/2 rotate-[-6deg] bg-primary/10 blur-xl" />
        <div className="absolute -top-40 right-[-160px] h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-180px] left-[-180px] h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
      </div> */}

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 pt-10 pb-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
              <Icon icon="ph:lightbulb-filament-fill" className="h-4 w-4" />
              <span>Turn documents into business clarity</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Understand what a business is about 
              <span className="text-primary"> instantly</span>.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              MTJD Insight Generator transforms messy inputs like pitch decks,
              proposals, reports, and website copy into structured insights:
              what the company does, who it’s for, how it makes money, and what
              makes it different.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="px-8 py-6 text-base" asChild>
                <Link to="/signup" className="flex items-center">
                  Get started
                  <Icon
                    icon="ph:arrow-right-bold"
                    className="ml-2 h-5 w-5 shrink-0"
                  />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-6 text-base"
                asChild
              >
                <Link to="/about">Learn more</Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-full border bg-background/70 px-3 py-1">
                <Icon icon="ph:shield-check-bold" className="h-4 w-4" /> Built
                for teams
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border bg-background/70 px-3 py-1">
                <Icon icon="ph:lock-key-bold" className="h-4 w-4" />{" "}
                Privacy-first
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border bg-background/70 px-3 py-1">
                <Icon icon="ph:layout-bold" className="h-4 w-4" /> Structured
                output
              </span>
            </div>
          </div>

          {/* Right-side “preview” card */}
          <Card className="relative border bg-background/80 p-6 backdrop-blur-md overflow-hidden">
            {/* teal slash inside card */}
            <div className="pointer-events-none absolute -left-24 top-14 h-10 w-[140%] rotate-[-6deg] bg-primary/25" />

            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Insight Preview</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    What you get from a single document.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  MTJD
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border bg-background p-4">
                  <p className="text-xs font-semibold text-muted-foreground">
                    BUSINESS SUMMARY
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">
                    A clear explanation of the offering, target customers, and
                    the core problem being solved.
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border bg-background p-4">
                    <p className="text-xs font-semibold text-muted-foreground">
                      WHO IT’S FOR
                    </p>
                    <p className="mt-2 text-sm">
                      Audience segments, roles, pains, and motivations.
                    </p>
                  </div>

                  <div className="rounded-2xl border bg-background p-4">
                    <p className="text-xs font-semibold text-muted-foreground">
                      DIFFERENTIATORS
                    </p>
                    <p className="mt-2 text-sm">
                      What makes it unique, plus proof points & signals.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border bg-primary/5 p-4">
                  <p className="text-xs font-semibold text-primary">
                    POSITIONING OUTPUT
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">
                    A positioning statement and messaging angles you can use on
                    your website, deck, and outreach.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">How it works</h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground">
              Designed to move from unstructured inputs to structured clarity
              in a format your team can actually use.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card className="p-6 border">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon icon="ph:file-arrow-up-bold" className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">1) Provide a document</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Share a pitch deck, proposal, business plan, report, or website
              copy as the source of truth.
            </p>
          </Card>

          <Card className="p-6 border">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon icon="ph:note-pencil-bold" className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">2) Add context</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Include a short comment about what you want extracted for
              strategy, sales, marketing, or investment review.
            </p>
          </Card>

          <Card className="p-6 border">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon icon="ph:magic-wand-bold" className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">3) Get structured insight</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Receive a clean breakdown of the business model, customers, value
              prop, differentiators, and recommended positioning.
            </p>
          </Card>
        </div>
      </section>

      {/* Outputs */}
      <section id="outputs" className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Outputs your team can use immediately
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              MTJD isn’t just a summary tool. It extracts the “business meaning”
              hidden inside documents and turns it into reusable insight blocks.
            </p>

            <div className="mt-6 grid gap-4">
              {[
                {
                  icon: "ph:briefcase-bold",
                  title: "Business overview",
                  desc: "What they do, for who, and why it matters in plain language.",
                },
                {
                  icon: "ph:users-three-bold",
                  title: "Audience & pains",
                  desc: "Likely customer segments, their problems, and triggers to buy.",
                },
                {
                  icon: "ph:currency-circle-dollar-bold",
                  title: "Business model signals",
                  desc: "Revenue hints: pricing, subscriptions, partnerships, delivery model.",
                },
                {
                  icon: "ph:diamond-bold",
                  title: "Differentiators & proof",
                  desc: "Unique claims, traction signals, and credibility indicators.",
                },
                {
                  icon: "ph:megaphone-bold",
                  title: "Positioning & messaging",
                  desc: "A positioning statement plus messaging angles/pillars for GTM.",
                },
              ].map((x) => (
                <div key={x.title} className="flex gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon icon={x.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{x.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {x.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="border bg-background/80 p-6 backdrop-blur-md">
            <h3 className="text-lg font-semibold">Example insight structure</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A clean format you can paste into docs, decks, or product briefs.
            </p>

            <div className="mt-5 space-y-3">
              {[
                {
                  k: "What it is",
                  v: "A platform/product/service and the core promise.",
                },
                {
                  k: "Target users",
                  v: "Primary roles + segments and key pain points.",
                },
                {
                  k: "Value proposition",
                  v: "Outcomes delivered and why it’s compelling.",
                },
                {
                  k: "Differentiators",
                  v: "Capabilities or proof that set it apart.",
                },
                {
                  k: "Next steps",
                  v: "Suggested positioning + questions to validate.",
                },
              ].map((row) => (
                <div
                  key={row.k}
                  className="rounded-xl border bg-background p-4"
                >
                  <p className="text-xs font-semibold text-muted-foreground">
                    {row.k}
                  </p>
                  <p className="mt-2 text-sm">{row.v}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Who it’s for */}
      <section id="who" className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Who it’s for</h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground">
              Built for teams that need clarity fast without losing depth.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card className="p-6 border">
            <h3 className="text-lg font-semibold">Founders & Strategy</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Turn your materials into crisp positioning and a clear narrative.
            </p>
          </Card>
          <Card className="p-6 border">
            <h3 className="text-lg font-semibold">Marketing & Growth</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Extract messaging angles, audience pains, and value props you can
              ship.
            </p>
          </Card>
          <Card className="p-6 border">
            <h3 className="text-lg font-semibold">Investors & Analysts</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Quickly understand business model signals and differentiators from
              docs.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-6">
        <Card className="border bg-background/80 p-8 backdrop-blur-md overflow-hidden">
          <div className="pointer-events-none absolute -left-24 top-10 h-10 w-[140%] rotate-[-6deg] bg-primary/20" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold">
                Ready to turn documents into clarity?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                MTJD helps you understand businesses faster and communicate
                them better.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-6 text-base"
                asChild
              >
                <Link to="/contact" className="flex items-center">
                  Contact
                </Link>
              </Button>
              <Button size="lg" className="px-8 py-6 text-base" asChild>
                <Link to="/signup" className="flex items-center">
                  Get started
                  <Icon
                    icon="ph:arrow-right-bold"
                    className="ml-2 h-5 w-5 shrink-0"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
