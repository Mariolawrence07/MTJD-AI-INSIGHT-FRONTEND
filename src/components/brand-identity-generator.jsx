
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Icon } from "@iconify/react"


export default function BrandIdentityGenerator({ personaData, onBack }) {
    
  return (
    <div className="min-h-screen bg-background">
       
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Icon icon="ph:sparkle-fill" className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">PersonaAI</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack}>
            <Icon icon="ph:arrow-left" className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
            <Icon icon="ph:palette-fill" className="h-4 w-4" />
            <span>Brand Identity Generated</span>
          </div>
          <h2 className="mb-2 text-3xl font-bold">Your Brand Identity</h2>
          <p className="text-muted-foreground">Tailored recommendations based on your persona</p>
        </div>

        <div className="space-y-6">
          {/* Color Palette */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Icon icon="ph:palette" className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">Color Palette</h3>
            </div>
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <div className="mb-2 h-24 rounded-lg bg-[#2563eb]" />
                <p className="text-sm font-medium">#2563EB</p>
                <p className="text-xs text-muted-foreground">Primary</p>
              </div>
              <div className="flex-1">
                <div className="mb-2 h-24 rounded-lg bg-[#7c3aed]" />
                <p className="text-sm font-medium">#7C3AED</p>
                <p className="text-xs text-muted-foreground">Accent</p>
              </div>
              <div className="flex-1">
                <div className="mb-2 h-24 rounded-lg bg-[#0f172a]" />
                <p className="text-sm font-medium">#0F172A</p>
                <p className="text-xs text-muted-foreground">Dark</p>
              </div>
              <div className="flex-1">
                <div className="mb-2 h-24 rounded-lg bg-[#f8fafc]" />
                <p className="text-sm font-medium">#F8FAFC</p>
                <p className="text-xs text-muted-foreground">Light</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>Rationale:</strong> Blue conveys trust and professionalism, aligning with your{" "}
              {personaData.industry} industry. Purple adds innovation and creativity, resonating with{" "}
              {personaData.motivations} motivations.
            </p>
          </Card>

          {/* Typography */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Icon icon="ph:text-aa" className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">Typography</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-3xl font-bold">Inter</p>
                <p className="text-sm text-muted-foreground">Headings - Modern, clean, highly readable</p>
              </div>
              <div>
                <p className="mb-2 font-sans text-lg">Open Sans</p>
                <p className="text-sm text-muted-foreground">Body - Professional, accessible, web-optimized</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <strong>Rationale:</strong> These fonts ensure excellent readability across devices and meet WCAG AA
              standards for accessibility.
            </p>
          </Card>

          {/* Visual Style */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Icon icon="ph:paint-brush" className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">Visual Style</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Icon icon="ph:check-circle-fill" className="mt-0.5 h-5 w-5 text-primary" />
                <span>
                  <strong>Modern & Minimal:</strong> Clean layouts with ample white space
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check-circle-fill" className="mt-0.5 h-5 w-5 text-primary" />
                <span>
                  <strong>Rounded Corners:</strong> 8-12px border radius for friendly feel
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check-circle-fill" className="mt-0.5 h-5 w-5 text-primary" />
                <span>
                  <strong>Subtle Shadows:</strong> Depth without overwhelming
                </span>
              </li>
            </ul>
          </Card>

          {/* Accessibility Guidelines */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Icon icon="ph:shield-check" className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">Accessibility Guidelines</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Icon icon="ph:check-circle-fill" className="mt-0.5 h-5 w-5 text-primary" />
                <span>
                  <strong>Color Contrast:</strong> Minimum 4.5:1 ratio for text (WCAG AA)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check-circle-fill" className="mt-0.5 h-5 w-5 text-primary" />
                <span>
                  <strong>Font Size:</strong> Minimum 16px for body text, scalable up to 200%
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check-circle-fill" className="mt-0.5 h-5 w-5 text-primary" />
                <span>
                  <strong>Focus Indicators:</strong> Visible keyboard navigation states
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check-circle-fill" className="mt-0.5 h-5 w-5 text-primary" />
                <span>
                  <strong>Alt Text:</strong> Descriptive text for all images and icons
                </span>
              </li>
            </ul>
          </Card>

          {/* Digital Recommendations */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Icon icon="ph:devices" className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">Digital Recommendations</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-semibold">Platform Strategy</h4>
                <p className="text-sm text-muted-foreground">
                  Focus on {personaData.platforms?.slice(0, 2).join(" and ")} based on your audience's preferences. Use{" "}
                  {personaData.contentType} content format for maximum engagement.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Content Approach</h4>
                <p className="text-sm text-muted-foreground">
                  Address pain points around {personaData.painPoints?.split(",")[0]} with solution-focused messaging.
                  Emphasize {personaData.motivations} to drive action.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Technical Requirements</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Mobile-first responsive design</li>
                  <li>• Page load time under 3 seconds</li>
                  <li>• SSL certificate and HTTPS</li>
                  <li>• Schema markup for SEO</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="flex-1">
            <Icon icon="ph:download-simple" className="mr-2 h-5 w-5" />
            Export Brand Guidelines
          </Button>
          <Button size="lg" variant="outline" className="flex-1 bg-transparent" onClick={onBack}>
            <Icon icon="ph:arrow-left" className="mr-2 h-5 w-5" />
            Back to Persona
          </Button>
        </div>
      </div>
    </div>
  )
}
