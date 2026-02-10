// "use client"

// import { useState } from "react"
// import { Button } from "./ui/button"
// import { Card } from "./ui/card"
// import { Input } from "./ui/input"
// import { Label } from "./ui/label"
// import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
// import { Textarea } from "./ui/textarea"
// import { Icon } from "@iconify/react"
// import PersonaOutput from "./persona-output"

// export default function ConversationalForm({ onBack }) {
//   const [step, setStep] = useState(0)
//   const [formData, setFormData] = useState({})
//   const [showPersona, setShowPersona] = useState(false)

//   const updateFormData = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }))
//   }

//   const nextStep = () => setStep((prev) => prev + 1)
//   const prevStep = () => setStep((prev) => Math.max(0, prev - 1))

//   if (showPersona) {
//     return <PersonaOutput formData={formData} onBack={() => setShowPersona(false)} onStartOver={onBack} />
//   }

//   const steps = [
//     // Branch 1: Campaign/Business Context
//     {
//       title: "Campaign & Business Context",
//       description: "Tell us about your industry and goals",
//       content: (
//         <div className="space-y-6">
//           <div className="space-y-2">
//             <Label htmlFor="industry">What is your industry/sector?</Label>
//             <Input
//               id="industry"
//               placeholder="e.g., Tech, Retail, Healthcare, Education"
//               value={formData.industry || ""}
//               onChange={(e) => updateFormData("industry", e.target.value)}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label>What is your goal?</Label>
//             <RadioGroup>
//               {[
//                 { value: "brand-awareness", label: "Brand awareness" },
//                 { value: "lead-generation", label: "Lead generation" },
//                 { value: "customer-retention", label: "Customer retention" },
//                 { value: "product-launch", label: "Product launch" },
//               ].map((option) => (
//                 <div key={option.value} className="flex items-center space-x-2">
//                   <RadioGroupItem
//                     id={option.value}
//                     value={option.value}
//                     checked={formData.goal === option.value}
//                     onChange={(e) => updateFormData("goal", e.target.value)}
//                   />
//                   <Label htmlFor={option.value} className="font-normal">
//                     {option.label}
//                   </Label>
//                 </div>
//               ))}
//             </RadioGroup>
//           </div>
//         </div>
//       ),
//     },
//     // Branch 2: Audience Basics
//     {
//       title: "Audience Basics",
//       description: "Define your target audience demographics",
//       content: (
//         <div className="space-y-6">
//           <div className="space-y-2">
//             <Label>Who is your target audience?</Label>
//             <RadioGroup>
//               {[
//                 { value: "b2c", label: "B2C (Business to Consumer)" },
//                 { value: "b2b", label: "B2B (Business to Business)" },
//               ].map((option) => (
//                 <div key={option.value} className="flex items-center space-x-2">
//                   <RadioGroupItem
//                     id={option.value}
//                     value={option.value}
//                     checked={formData.audienceType === option.value}
//                     onChange={(e) => updateFormData("audienceType", e.target.value)}
//                   />
//                   <Label htmlFor={option.value} className="font-normal">
//                     {option.label}
//                   </Label>
//                 </div>
//               ))}
//             </RadioGroup>
//           </div>
//           <div className="space-y-2">
//             <Label>What is their age range?</Label>
//             <RadioGroup>
//               {[
//                 { value: "18-24", label: "18–24" },
//                 { value: "25-34", label: "25–34" },
//                 { value: "35-44", label: "35–44" },
//                 { value: "45+", label: "45+" },
//               ].map((option) => (
//                 <div key={option.value} className="flex items-center space-x-2">
//                   <RadioGroupItem
//                     id={option.value}
//                     value={option.value}
//                     checked={formData.ageRange === option.value}
//                     onChange={(e) => updateFormData("ageRange", e.target.value)}
//                   />
//                   <Label htmlFor={option.value} className="font-normal">
//                     {option.label}
//                   </Label>
//                 </div>
//               ))}
//             </RadioGroup>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="location">What is their location/region?</Label>
//             <Input
//               id="location"
//               placeholder="e.g., United States, New York, Global"
//               value={formData.location || ""}
//               onChange={(e) => updateFormData("location", e.target.value)}
//             />
//           </div>
//         </div>
//       ),
//     },
//     // Branch 3: Psychographics & Motivations
//     {
//       title: "Psychographics & Motivations",
//       description: "Understand their interests and challenges",
//       content: (
//         <div className="space-y-6">
//           <div className="space-y-2">
//             <Label htmlFor="interests">What are their key interests/hobbies?</Label>
//             <Input
//               id="interests"
//               placeholder="e.g., Travel, Fitness, Tech, Family"
//               value={formData.interests || ""}
//               onChange={(e) => updateFormData("interests", e.target.value)}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label>What motivates them the most?</Label>
//             <RadioGroup>
//               {[
//                 { value: "saving-money", label: "Saving money" },
//                 { value: "convenience", label: "Convenience" },
//                 { value: "status", label: "Status" },
//                 { value: "innovation", label: "Innovation" },
//               ].map((option) => (
//                 <div key={option.value} className="flex items-center space-x-2">
//                   <RadioGroupItem
//                     id={option.value}
//                     value={option.value}
//                     checked={formData.motivations === option.value}
//                     onChange={(e) => updateFormData("motivations", e.target.value)}
//                   />
//                   <Label htmlFor={option.value} className="font-normal">
//                     {option.label}
//                   </Label>
//                 </div>
//               ))}
//             </RadioGroup>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="painPoints">What challenges/pain points do they face?</Label>
//             <Textarea
//               id="painPoints"
//               placeholder="e.g., Cost, time constraints, trust issues, lack of options"
//               value={formData.painPoints || ""}
//               onChange={(e) => updateFormData("painPoints", e.target.value)}
//               rows={4}
//             />
//           </div>
//         </div>
//       ),
//     },
//     // Branch 4: Digital Behavior
//     {
//       title: "Digital Behavior",
//       description: "Identify their online preferences",
//       content: (
//         <div className="space-y-6">
//           <div className="space-y-2">
//             <Label>Which platforms do they use the most?</Label>
//             <div className="space-y-2">
//               {["Instagram", "TikTok", "LinkedIn", "YouTube", "Facebook", "Twitter/X"].map((platform) => (
//                 <div key={platform} className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     id={platform}
//                     checked={formData.platforms?.includes(platform) || false}
//                     onChange={(e) => {
//                       const current = formData.platforms || []
//                       if (e.target.checked) {
//                         updateFormData("platforms", [...current, platform])
//                       } else {
//                         updateFormData(
//                           "platforms",
//                           current.filter((p) => p !== platform),
//                         )
//                       }
//                     }}
//                     className="h-4 w-4 rounded border-input"
//                   />
//                   <Label htmlFor={platform} className="font-normal">
//                     {platform}
//                   </Label>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="space-y-2">
//             <Label>What type of content do they prefer?</Label>
//             <RadioGroup>
//               {[
//                 { value: "short-video", label: "Short-form video" },
//                 { value: "blogs", label: "Blogs" },
//                 { value: "podcasts", label: "Podcasts" },
//                 { value: "infographics", label: "Infographics" },
//               ].map((option) => (
//                 <div key={option.value} className="flex items-center space-x-2">
//                   <RadioGroupItem
//                     id={option.value}
//                     value={option.value}
//                     checked={formData.contentType === option.value}
//                     onChange={(e) => updateFormData("contentType", e.target.value)}
//                   />
//                   <Label htmlFor={option.value} className="font-normal">
//                     {option.label}
//                   </Label>
//                 </div>
//               ))}
//             </RadioGroup>
//           </div>
//         </div>
//       ),
//     },
//   ]

//   const currentStep = steps[step]
//   const isLastStep = step === steps.length - 1
//   const canProceed = () => {
//     switch (step) {
//       case 0:
//         return formData.industry && formData.goal
//       case 1:
//         return formData.audienceType && formData.ageRange && formData.location
//       case 2:
//         return formData.interests && formData.motivations && formData.painPoints
//       case 3:
//         return formData.platforms && formData.platforms.length > 0 && formData.contentType
//       default:
//         return true
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="border-b border-border bg-card">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//           <div className="flex items-center gap-2">
//             <Icon icon="ph:sparkle-fill" className="h-6 w-6 text-primary" />
//             <span className="text-xl font-semibold">PersonaAI</span>
//           </div>
//           <Button variant="ghost" size="sm" onClick={onBack}>
//             <Icon icon="ph:x" className="h-5 w-5" />
//           </Button>
//         </div>
//       </header>

//       <div className="mx-auto max-w-3xl px-6 py-12">
//         {/* Progress */}
//         <div className="mb-8">
//           <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
//             <span>
//               Step {step + 1} of {steps.length}
//             </span>
//             <span>{Math.round(((step + 1) / steps.length) * 100)}% Complete</span>
//           </div>
//           <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
//             <div
//               className="h-full bg-primary transition-all duration-300"
//               style={{ width: `${((step + 1) / steps.length) * 100}%` }}
//             />
//           </div>
//         </div>

//         {/* Step Content */}
//         <Card className="p-8">
//           <div className="mb-6">
//             <h2 className="mb-2 text-2xl font-bold">{currentStep.title}</h2>
//             <p className="text-muted-foreground">{currentStep.description}</p>
//           </div>

//           {currentStep.content}

//           {/* Navigation */}
//           <div className="mt-8 flex items-center justify-between gap-4">
//             <Button variant="outline" onClick={prevStep} disabled={step === 0}>
//               <Icon icon="ph:arrow-left" className="mr-2 h-5 w-5" />
//               Previous
//             </Button>
//             <Button
//               onClick={() => {
//                 if (isLastStep) {
//                   setShowPersona(true)
//                 } else {
//                   nextStep()
//                 }
//               }}
//               disabled={!canProceed()}
//             >
//               {isLastStep ? "Generate Persona" : "Next"}
//               <Icon icon="ph:arrow-right" className="ml-2 h-5 w-5" />
//             </Button>
//           </div>
//         </Card>
//       </div>
//     </div>
//   )
// }
