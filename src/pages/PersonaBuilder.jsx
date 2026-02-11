import React from "react";
import { Card } from "../components/ui/card";
import { Icon } from "@iconify/react/dist/iconify.js";
import DocumentUpload from "../components/document-upload";
import { Link } from "react-router-dom";

const PersonaBuilder = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-6 py-20">
        {/* -------- Hero Section -------- */}
        <header className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
            <Icon icon="ph:sparkle-fill" className="h-4 w-4" />
            <span>AI-Powered Insight Generation</span>
          </div>

          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight lg:text-6xl">
            Generate meaningful insights
            <br />
            <span className="text-primary">from your research documents</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Upload interviews, notes, transcripts, or study outputs. Our AI
            extracts key themes, emotional tone, and decision drivers to help you
            take action faster.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/upload"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Icon icon="ph:upload-simple-fill" className="mr-2 h-5 w-5" />
              Upload Documents
            </Link>

            <div className="text-sm text-muted-foreground">
              Supported: PDF, DOCX, TXT, CSV (depending on your upload component)
            </div>
          </div>
        </header>

     

        {/* -------- Output Features -------- */}
        <section className="mt-24">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">What you’ll get</h2>
            <p className="text-muted-foreground">
              Insight-rich outputs designed for clearer decisions
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Insights */}
            <Card className="p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon icon="ph:lightbulb-filament-fill" className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Actionable Insights</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Clear summaries of what matters most, patterns in behaviour, and
                key decision drivers based on your data.
              </p>
            </Card>

            {/* Themes */}
            <Card className="p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon icon="ph:circles-three-fill" className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Themes & Signals</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Emotional tone, motivators, objections, and confidence signals
                surfaced from interviews and notes.
              </p>
            </Card>

            {/* Accessibility */}
            <Card className="p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10 text-chart-2">
                <Icon icon="ph:shield-check-fill" className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                Inclusive Guidance
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Practical suggestions for accessibility and inclusive messaging
                based on the needs implied by your research.
              </p>
            </Card>
          </div>
        </section>
      </section>
    </main>
  );
};

export default PersonaBuilder;
