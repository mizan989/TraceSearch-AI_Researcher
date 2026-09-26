import { jsPDF } from "jspdf";
import { ResearchSession } from "@/types/research";
import { formatDate } from "@/lib/utils";

// Palette RGB Constants
const COLOR_WHITE = [255, 255, 255] as const;
const COLOR_COFFEE_BEAN = [26, 7, 6] as const; // #1A0706 - Primary font color
const COLOR_BLACK_CHERRY = [85, 16, 13] as const; // #55100D - Secondary font color
const COLOR_BORDER_LINE = [220, 215, 215] as const;
const COLOR_RACING_RED = [221, 2, 0] as const; // #DD0200 - Accent line/bullet

export function exportResearchAsPDF(session: ResearchSession): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 18;
  const contentWidth = pageWidth - marginX * 2; // 174mm
  const bottomThreshold = 270;

  let y = 22;

  // Helper: Paint white background on page
  const paintBackground = () => {
    doc.setFillColor(COLOR_WHITE[0], COLOR_WHITE[1], COLOR_WHITE[2]);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
  };

  // Helper: Check page boundary and break cleanly
  const ensureSpace = (neededHeight: number) => {
    if (y + neededHeight > bottomThreshold) {
      doc.addPage();
      paintBackground();
      y = 22;
      renderRunningHeader();
    }
  };

  // Helper: Sub-page running header
  const renderRunningHeader = () => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(COLOR_COFFEE_BEAN[0], COLOR_COFFEE_BEAN[1], COLOR_COFFEE_BEAN[2]);
    doc.text("TraceSearch", marginX, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
    doc.text("by Md Mizan", marginX + 24, y);

    doc.setDrawColor(COLOR_BORDER_LINE[0], COLOR_BORDER_LINE[1], COLOR_BORDER_LINE[2]);
    doc.setLineWidth(0.3);
    doc.line(marginX, y + 2, marginX + contentWidth, y + 2);

    y += 9;
  };

  // 1. Initial Page Background
  paintBackground();

  // 2. Primary Header (Top of Document)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(COLOR_COFFEE_BEAN[0], COLOR_COFFEE_BEAN[1], COLOR_COFFEE_BEAN[2]);
  doc.text("TraceSearch", marginX, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
  doc.text("by Md Mizan", marginX, y + 5.5);

  // Decorative header rule in Black Cherry
  doc.setDrawColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
  doc.setLineWidth(0.8);
  doc.line(marginX, y + 8, marginX + contentWidth, y + 8);

  y += 16;

  // 3. Document Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(COLOR_COFFEE_BEAN[0], COLOR_COFFEE_BEAN[1], COLOR_COFFEE_BEAN[2]);
  const titleLines = doc.splitTextToSize(session.title, contentWidth);
  doc.text(titleLines, marginX, y);
  y += titleLines.length * 6.5 + 2;

  // 4. Research Metadata Banner
  doc.setFillColor(248, 246, 246);
  doc.roundedRect(marginX, y, contentWidth, 18, 1.5, 1.5, "F");
  doc.setDrawColor(COLOR_BORDER_LINE[0], COLOR_BORDER_LINE[1], COLOR_BORDER_LINE[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX, y, contentWidth, 18, 1.5, 1.5, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
  doc.text("Original Query:", marginX + 4, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(COLOR_COFFEE_BEAN[0], COLOR_COFFEE_BEAN[1], COLOR_COFFEE_BEAN[2]);
  const queryDisplay = session.query.length > 85 ? session.query.slice(0, 82) + "..." : session.query;
  doc.text(`"${queryDisplay}"`, marginX + 27, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
  const dateStr = session.createdAt ? formatDate(session.createdAt) : new Date().toLocaleDateString();
  const metaText = `Generated: ${dateStr} · Status: Verified · Sources: ${session.sources.length} · Findings: ${session.findings.length}`;
  doc.text(metaText, marginX + 4, y + 13);

  y += 24;

  // 5. Executive Summary Section
  ensureSpace(20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
  doc.text("EXECUTIVE SUMMARY", marginX, y);

  doc.setDrawColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
  doc.setLineWidth(0.4);
  doc.line(marginX, y + 1.8, marginX + 35, y + 1.8);
  y += 6.5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(COLOR_COFFEE_BEAN[0], COLOR_COFFEE_BEAN[1], COLOR_COFFEE_BEAN[2]);
  const summaryLines = doc.splitTextToSize(session.summary, contentWidth);
  ensureSpace(summaryLines.length * 4.8);
  doc.text(summaryLines, marginX, y, { lineHeightFactor: 1.35 });
  y += summaryLines.length * 4.8 + 6;

  // 6. Key Evidence Findings Section
  ensureSpace(20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
  doc.text("KEY EVIDENCE FINDINGS", marginX, y);

  doc.setDrawColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
  doc.setLineWidth(0.4);
  doc.line(marginX, y + 1.8, marginX + 38, y + 1.8);
  y += 7.5;

  session.findings.forEach((finding, idx) => {
    const findingNumber = String(idx + 1).padStart(2, "0");
    const headingText = `${findingNumber}. ${finding.title}`;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(COLOR_COFFEE_BEAN[0], COLOR_COFFEE_BEAN[1], COLOR_COFFEE_BEAN[2]);
    const headingLines = doc.splitTextToSize(headingText, contentWidth - 4);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const contentLines = doc.splitTextToSize(finding.content, contentWidth - 4);

    const neededHeight = headingLines.length * 5 + contentLines.length * 4.5 + 16;
    ensureSpace(neededHeight);

    // Finding Card Outline
    const cardStartY = y;
    doc.setFillColor(252, 250, 250);
    doc.roundedRect(marginX, cardStartY, contentWidth, neededHeight - 4, 1.2, 1.2, "F");
    doc.setDrawColor(COLOR_BORDER_LINE[0], COLOR_BORDER_LINE[1], COLOR_BORDER_LINE[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(marginX, cardStartY, contentWidth, neededHeight - 4, 1.2, 1.2, "S");

    // Red left-accent indicator
    doc.setFillColor(COLOR_RACING_RED[0], COLOR_RACING_RED[1], COLOR_RACING_RED[2]);
    doc.rect(marginX, cardStartY, 2, neededHeight - 4, "F");

    let cardY = cardStartY + 5;

    // Finding Heading
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(COLOR_COFFEE_BEAN[0], COLOR_COFFEE_BEAN[1], COLOR_COFFEE_BEAN[2]);
    doc.text(headingLines, marginX + 5, cardY);
    cardY += headingLines.length * 5 + 1;

    // Finding Content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(COLOR_COFFEE_BEAN[0], COLOR_COFFEE_BEAN[1], COLOR_COFFEE_BEAN[2]);
    doc.text(contentLines, marginX + 5, cardY, { lineHeightFactor: 1.3 });
    cardY += contentLines.length * 4.3 + 2;

    // Attributed Sources
    const sourceNames = finding.sourceIds
      .map((id) => {
        const matched = session.sources.find((s) => s.id === id);
        return matched ? `${id} (${matched.domain})` : id;
      })
      .join(", ");

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
    doc.text(`Attributed Evidence: ${sourceNames || "General synthesis"}`, marginX + 5, cardY);

    if (finding.uncertainty) {
      cardY += 4;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.8);
      doc.setTextColor(117, 82, 80);
      const uncText = `Caveat: ${finding.uncertainty}`;
      const uncLines = doc.splitTextToSize(uncText, contentWidth - 10);
      doc.text(uncLines, marginX + 5, cardY);
    }

    y += neededHeight + 2;
  });

  y += 4;

  // 7. Evidence Sources Section
  if (session.sources.length > 0) {
    ensureSpace(24);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
    doc.text("VERIFIED EVIDENCE SOURCES", marginX, y);

    doc.setDrawColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
    doc.setLineWidth(0.4);
    doc.line(marginX, y + 1.8, marginX + 42, y + 1.8);
    y += 7.5;

    session.sources.forEach((source, idx) => {
      ensureSpace(12);

      // Source ID & Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(COLOR_COFFEE_BEAN[0], COLOR_COFFEE_BEAN[1], COLOR_COFFEE_BEAN[2]);
      const srcTitle = `[${source.id}] ${source.title}`;
      const srcTitleLines = doc.splitTextToSize(srcTitle, contentWidth - 4);
      doc.text(srcTitleLines, marginX, y);
      y += srcTitleLines.length * 4;

      // Domain & URL
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
      const urlText = `${source.domain} · ${source.url}`;
      const urlLines = doc.splitTextToSize(urlText, contentWidth - 4);
      doc.text(urlLines, marginX + 2, y);
      y += urlLines.length * 3.6 + 2.5;
    });

    y += 4;
  }

  // 8. Key Uncertainties & Caveats (if present)
  if (session.uncertainties && session.uncertainties.length > 0) {
    ensureSpace(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
    doc.text("KEY UNCERTAINTIES & DATA GAPS", marginX, y);

    doc.setDrawColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
    doc.setLineWidth(0.4);
    doc.line(marginX, y + 1.8, marginX + 48, y + 1.8);
    y += 7.5;

    session.uncertainties.forEach((unc) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(COLOR_COFFEE_BEAN[0], COLOR_COFFEE_BEAN[1], COLOR_COFFEE_BEAN[2]);
      const uncLines = doc.splitTextToSize(`•  ${unc}`, contentWidth - 4);
      ensureSpace(uncLines.length * 4.2 + 2);
      doc.text(uncLines, marginX + 2, y);
      y += uncLines.length * 4.2 + 2;
    });

    y += 4;
  }

  // 9. Recommended Follow-Up Questions (if present)
  if (session.followUpQuestions && session.followUpQuestions.length > 0) {
    ensureSpace(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
    doc.text("RECOMMENDED FOLLOW-UP QUESTIONS", marginX, y);

    doc.setDrawColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
    doc.setLineWidth(0.4);
    doc.line(marginX, y + 1.8, marginX + 54, y + 1.8);
    y += 7.5;

    session.followUpQuestions.forEach((q) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(COLOR_COFFEE_BEAN[0], COLOR_COFFEE_BEAN[1], COLOR_COFFEE_BEAN[2]);
      const qLines = doc.splitTextToSize(`?  ${q}`, contentWidth - 4);
      ensureSpace(qLines.length * 4.2 + 2);
      doc.text(qLines, marginX + 2, y);
      y += qLines.length * 4.2 + 2;
    });
  }

  // 10. Stamp Running Footers across all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Footer divider line
    doc.setDrawColor(COLOR_BORDER_LINE[0], COLOR_BORDER_LINE[1], COLOR_BORDER_LINE[2]);
    doc.setLineWidth(0.3);
    doc.line(marginX, pageHeight - 12, marginX + contentWidth, pageHeight - 12);

    // Footer Brand Label
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_BLACK_CHERRY[0], COLOR_BLACK_CHERRY[1], COLOR_BLACK_CHERRY[2]);
    doc.text("TraceSearch · by Md Mizan · AI Research Engine", marginX, pageHeight - 8);

    // Page Number
    const pageNumText = `Page ${i} of ${totalPages}`;
    const pageNumWidth = doc.getTextWidth(pageNumText);
    doc.text(pageNumText, marginX + contentWidth - pageNumWidth, pageHeight - 8);
  }

  // 11. Generate clean filename and trigger browser download
  const cleanTitle = session.title
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 40)
    .replace(/_+/g, "_");
  const fileName = `TraceSearch-${cleanTitle || "Research-Report"}.pdf`;

  doc.save(fileName);
}
