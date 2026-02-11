"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Icon } from "@iconify/react";

export default function PersonaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [persona, setPersona] = useState(null);

  // AI view + chat
  const [aiView, setAiView] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const docRef = useRef(null);

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

  // ------------------ Load persona ------------------
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE_URL}/api/personas/${id}`, {
          credentials: "include",
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.message || "Failed to load persona");
        }

        const data = await res.json();
        if (!cancelled) setPersona(data);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (id) run();
    return () => {
      cancelled = true;
    };
  }, [id, API_BASE_URL]);

  // ------------------ Normalize persona ------------------
  const ai = useMemo(() => {
    if (!persona) return null;

    let d = persona;
    if (typeof d === "string") {
      try {
        d = JSON.parse(d);
      } catch {
        // ignore
      }
    }

    if (d?.raw && typeof d.raw === "object") {
      return { ...d.raw, ...d };
    }

    return d;
  }, [persona]);

  // Set initial AI view
  useEffect(() => {
    if (ai) setAiView(ai);
  }, [ai]);

  // ------------------ AI Prompt Handler ------------------
  const handleSendPrompt = async () => {
    if (!chatInput.trim() || chatLoading) return;

    const prompt = chatInput.trim();
    const userMsg = { role: "user", content: prompt };

    setMessages((m) => [...m, userMsg]);
    setChatLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/persona-refine`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          persona: aiView,
          prompt,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.message || "AI request failed");
      }

      const data = await res.json();

      if (data?.refinedPersona) {
        setAiView(data.refinedPersona);
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Persona updated successfully." },
        ]);
      } else {
        throw new Error("Invalid AI response");
      }
    } catch (e) {
      console.error("AI refine failed:", e);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: e?.message || "Failed to update persona.",
        },
      ]);
    } finally {
      setChatInput("");
      setChatLoading(false);
    }
  };

  // ------------------ PDF Export (jsPDF + autoTable) ------------------
  const safeFileName = (name) =>
    `${
      (name || "persona")
        .toString()
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
        .trim()
        .slice(0, 80) || "persona"
    }.pdf`;

  const asList = (v) => {
    if (Array.isArray(v)) return v.filter(Boolean).map(String);
    if (typeof v === "string") {
      return v
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [];
  };

  const exportPDF = () => {
    if (!aiView) return;

    const doc = new jsPDF({ unit: "pt", format: "a4" });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const marginX = 40;
    const maxTextWidth = pageWidth - marginX * 2;

    let y = 44;

    const title = aiView?.name || "Persona";
    const summary = aiView?.summary || "No summary available.";

    // ---------- TITLE (WRAPPED) ----------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);

    // Wrap title so it never exceeds paper width
    const titleLines = doc.splitTextToSize(String(title), maxTextWidth);

    doc.setTextColor(17, 24, 39);
    doc.text(titleLines, marginX, y);

    // Advance Y based on number of lines
    y += titleLines.length * 22; // line height for title
    y += 6;

    // ---------- SUMMARY (WRAPPED) ----------
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const summaryLines = doc.splitTextToSize(String(summary), maxTextWidth);
    doc.setTextColor(60, 60, 60);
    doc.text(summaryLines, marginX, y);

    y += summaryLines.length * 14 + 14;
    doc.setTextColor(0, 0, 0);

    // Helper for page breaks
    const ensureSpace = (needed = 120) => {
      if (y > pageHeight - needed) {
        doc.addPage();
        y = 44;
      }
    };

    const sections = [
      {
        heading: "Extracted insights",
        rows: [
          [
            "Key themes",
            asList(aiView?.extracted_insights?.key_themes).join("\n") || "—",
          ],
          [
            "Audience patterns",
            asList(aiView?.extracted_insights?.audience_patterns).join("\n") ||
              "—",
          ],
          [
            "Emotional signals",
            asList(aiView?.extracted_insights?.emotional_signals).join("\n") ||
              "—",
          ],
          [
            "Opportunities",
            asList(aiView?.extracted_insights?.opportunities).join("\n") || "—",
          ],
          [
            "Contradictions",
            asList(aiView?.extracted_insights?.contradictions).join("\n") ||
              "—",
          ],
        ],
      },
      {
        heading: "Emotional profile",
        rows: [
          [
            "Key emotional drivers",
            asList(aiView?.emotional_profile?.key_emotional_drivers).join(
              "\n",
            ) || "—",
          ],
          [
            "Core values",
            asList(aiView?.emotional_profile?.core_values).join("\n") || "—",
          ],
          [
            "Core motivations",
            asList(aiView?.emotional_profile?.core_motivations).join("\n") ||
              "—",
          ],
          [
            "Emotional barriers",
            asList(aiView?.emotional_profile?.emotional_barriers).join("\n") ||
              "—",
          ],
          [
            "Decision triggers",
            asList(aiView?.emotional_profile?.decision_triggers).join("\n") ||
              "—",
          ],
        ],
      },
    ];

    sections.forEach((s, idx) => {
      ensureSpace(140);

      // Section heading
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(17, 24, 39);
      doc.text(String(s.heading), marginX, y);
      y += 10;

      autoTable(doc, {
        startY: y + 8,
        head: [["Field", "Details"]],
        body: s.rows,
        theme: "grid",
        styles: {
          font: "helvetica",
          fontSize: 10,
          cellPadding: 8,
          valign: "top",
          overflow: "linebreak",
        },
        headStyles: {
          fillColor: [243, 244, 246],
          textColor: [17, 24, 39],
          fontStyle: "bold",
        },
        columnStyles: {
          0: { cellWidth: 160, fontStyle: "bold" },
          1: { cellWidth: maxTextWidth - 160 },
        },
        margin: { left: marginX, right: marginX },
      });

      y = doc.lastAutoTable.finalY + 18;

      // Spacer between sections
      if (idx < sections.length - 1) ensureSpace(140);
    });

    // Footer
    const footer = `Generated: ${new Date().toLocaleString()}`;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(footer, marginX, pageHeight - 24);

    doc.save(safeFileName(aiView?.name));
  };

  // ------------------ Loading / Error ------------------
  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-10 text-muted-foreground">
        <Icon
          icon="ph:spinner-gap"
          className="mr-2 inline h-5 w-5 animate-spin"
        />
        Loading persona...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Card className="p-6">
          <p className="text-destructive">{error}</p>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button onClick={() => navigate("/upload")}>Upload another</Button>
          </div>
        </Card>
      </div>
    );
  }

  // ------------------ Render ------------------
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 lg:grid-cols-[1fr_360px]">
        {/* DOCUMENT (your UI stays the same) */}
        <div id="persona-document" ref={docRef} className="p-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{aiView?.name || "Persona"}</h1>
            <p className="mt-2 text-muted-foreground">
              {aiView?.summary || "No summary available."}
            </p>
          </div>

          <Section
            title="Extracted insights"
            icon="ph:magnifying-glass"
            items={[
              ["Key themes", aiView?.extracted_insights?.key_themes],
              [
                "Audience patterns",
                aiView?.extracted_insights?.audience_patterns,
              ],
              [
                "Emotional signals",
                aiView?.extracted_insights?.emotional_signals,
              ],
              ["Opportunities", aiView?.extracted_insights?.opportunities],
              ["Contradictions", aiView?.extracted_insights?.contradictions],
            ]}
          />

          <Section
            title="Emotional profile"
            icon="ph:heart"
            items={[
              [
                "Key emotional drivers",
                aiView?.emotional_profile?.key_emotional_drivers,
              ],
              ["Core values", aiView?.emotional_profile?.core_values],
              ["Core motivations", aiView?.emotional_profile?.core_motivations],
              [
                "Emotional barriers",
                aiView?.emotional_profile?.emotional_barriers,
              ],
              [
                "Decision triggers",
                aiView?.emotional_profile?.decision_triggers,
              ],
            ]}
          />

          <div className="mt-8 flex gap-2">
            <Button variant="outline" onClick={exportPDF}>
              Export PDF
            </Button>
            <Button variant="outline" onClick={() => navigate("/upload")}>
              Upload another document
            </Button>
            <Button onClick={() => navigate("/dashboard/insights")}>
              View all insights
            </Button>
          </div>
        </div>

        {/* CHAT */}
        <ChatPanel
          messages={messages}
          value={chatInput}
          loading={chatLoading}
          onChange={setChatInput}
          onSend={handleSendPrompt}
        />
      </div>
    </div>
  );
}

// ------------------ Chat Panel ------------------
function ChatPanel({ messages, value, loading, onChange, onSend }) {
  return (
    <Card className="flex h-[80vh] flex-col p-4">
      <h3 className="mb-2 font-semibold">AI Assistant</h3>

      <div className="flex-1 space-y-2 overflow-y-auto text-sm">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : ""}>
            <span className="inline-block rounded bg-muted px-3 py-2">
              {m.content}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded border px-3 py-2 text-sm"
          placeholder="e.g. Rewrite for Gen Z audience"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) onSend();
          }}
        />
        <Button disabled={loading} onClick={onSend}>
          Send
        </Button>
      </div>
    </Card>
  );
}

// ------------------ Helpers ------------------
function Section({ title, icon, items }) {
  return (
    <Card className="mt-6 p-6">
      <div className="mb-4 flex items-center gap-2">
        <Icon icon={icon} className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map(([label, arr]) => (
          <Card key={label} className="p-4">
            <p className="font-semibold">{label}</p>
            <Bullets items={arr} />
          </Card>
        ))}
      </div>
    </Card>
  );
}

function Bullets({ items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return <p className="mt-2 text-sm text-muted-foreground">—</p>;
  }

  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}
