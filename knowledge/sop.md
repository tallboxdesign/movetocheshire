# movetocheshire.uk — Agent SOP (Machine-Readable)

**10 Standard Operating Procedures for the movetocheshire.uk content agent.**
**Read the relevant SOP before starting any task. All figures must come from data.md.**

---

## SOP INDEX

| # | SOP Name | Trigger |
|---|----------|---------|
| 1 | New Page Creation | Starting any new page |
| 2 | Data Verification | Before using any figure in content |
| 3 | Internal Linking | After drafting any page |
| 4 | LLM Citability Check | Before marking any page done |
| 5 | Backlink Outreach | George requests outreach (DRAFT ONLY) |
| 6 | GSC Monitoring | George provides GSC CSV export |
| 7 | NotebookLM Research | Before writing any content page |
| 8 | Schema Markup | After content is drafted |
| 9 | Page Update | Existing page needs refresh |
| 10 | Chester Bridge Page | Writing /where-to-live/chester only |

---

## SOP 1 — NEW PAGE CREATION

**TRIGGER:** Starting a new page from pages.json

**INPUTS REQUIRED:**
- Page URL and type (hub / spoke / bridge / contact)
- Notebook number from notebooks.md
- Current page status in pages.json must be "pending"

**PROCEDURE:**
1. Read pages.json → confirm page is "pending" → set status to "in_progress"
2. Read brief.md → load site rules, voice, architecture
3. Read data.md → load all figures relevant to this page's topic
4. Open NotebookLM link from notebooks.md → extract verified data points
5. Run SOP 2 (Data Verification) on every figure you intend to use
6. Draft content following page type template from brief.md
7. Include all semantic visual elements from brief.md
8. Run SOP 3 (Internal Linking) → add correct links
9. Run SOP 4 (LLM Citability Check) → confirm all requirements met
10. Run SOP 8 (Schema Markup) → add FAQPage schema
11. Set page status in pages.json to "done"

**OUTPUT FORMAT:**
- Markdown file: `[page-slug].md`
- Schema: separate `[page-slug].schema.json`
- Internal links: listed at bottom of markdown file

**DECISION BRANCHES:**
| IF | THEN |
|----|------|
| Figure needed but not in data.md | Run SOP 2 to fetch and add to data.md first |
| Notebook link returns no data | WebSearch using query focus from notebooks.md |
| Page is hub type | Write 3–4 intro paragraphs only — do not duplicate spoke content |
| Page is Chester bridge | Follow SOP 10 instead |

---

## SOP 2 — DATA VERIFICATION

**TRIGGER:** Any figure is needed for content

**PROCEDURE:**
1. Check data.md for the figure
2. IF figure exists AND status is VERIFIED → use it, cite source inline
3. IF figure exists AND status is UNVERIFIED → fetch from listed source URL using WebFetch
4. IF figure not in data.md → WebSearch to find it, verify at primary source, add to data.md with source and date, then use
5. IF figure cannot be verified → do not use it. Note the gap for George.

**OUTPUT FORMAT:**
Inline citation: `[figure] (Source: [name], [month year])`
Example: `£306,000 (Source: ONS, November 2025)`

**DECISION BRANCHES:**
| IF | THEN |
|----|------|
| Two sources give conflicting figures | Flag conflict, use the ONS figure as primary, note conflict |
| Source is paywalled | Find alternative open source, do not cite paywalled content |
| Figure is older than 12 months | Fetch updated version before using |
| Live lookup required (BoE rate, mortgage rates) | WebFetch from canonical source listed in data.md |

---

## SOP 3 — INTERNAL LINKING

**TRIGGER:** After any page draft is complete

**PROCEDURE:**
1. Read brief.md → internal linking rules
2. Identify page type: hub, spoke, bridge, or contact
3. Hub pages: add card links to all child spokes listed in brief.md architecture
4. Spoke pages: add breadcrumb (Home > Hub > Spoke) and link back to parent hub
5. Add 2–3 cross-links to topically related spokes (from pages.json)
6. Chester bridge page: add ONE link to movetochester.co.uk in handoff block only
7. Contact page: no internal links beyond nav

**RULES:**
- Max 3 cross-spoke links per page
- No sitewide or footer links between movetocheshire.uk and movetochester.co.uk
- Anchor text must be descriptive — no "click here" or "read more"

---

## SOP 4 — LLM CITABILITY CHECK

**TRIGGER:** Before marking any page done

**CHECKLIST — all must be YES before page is marked done:**
- [ ] H1 is a question or contains the primary keyword
- [ ] First paragraph directly answers the H1 question
- [ ] At least one comparison table present
- [ ] All stats have inline source citations with year
- [ ] FAQPage schema drafted (min 5 Q&A pairs) — see SOP 8
- [ ] "Last updated: [month year]" badge present
- [ ] No paywalled sources cited
- [ ] Answer-first structure throughout (conclusion before explanation)
- [ ] At least 5 PAA accordion questions present

**IF any item is NO:** fix before proceeding.

---

## SOP 5 — BACKLINK OUTREACH

**TRIGGER:** George requests outreach to a specific site or contact

**⚠️ CRITICAL: Agent must NEVER send emails. Draft only. George approves and sends.**

**PROCEDURE:**
1. Identify target site and reason for outreach (data correction, collaboration, mention)
2. WebFetch target site to understand their content and tone
3. Draft outreach email: subject line, 3–4 sentence body, clear ask
4. Save draft as `outreach-[target-domain]-[date].md`
5. Present to George for approval before any sending

---

## SOP 6 — GSC MONITORING

**TRIGGER:** George provides a GSC CSV export

**NOTE:** Agent cannot log into Google Search Console. George must export the CSV and provide it.

**PROCEDURE:**
1. Receive CSV from George
2. Identify: top performing pages, pages with high impressions but low CTR, pages losing rank
3. Cross-reference with pages.json to identify which pages need updating
4. For each underperforming page: identify likely cause (title, meta, content gap)
5. Produce recommendations report: `gsc-report-[date].md`
6. Flag pages that need SOP 9 (Page Update)

---

## SOP 7 — NOTEBOOKLM RESEARCH

**TRIGGER:** Before writing any content page (part of SOP 1, step 4)

**PROCEDURE:**
1. Find page in notebooks.md → get notebook number and link
2. Open NotebookLM link
3. For each item in "Exact Data Required" list in notebooklm.docx for that notebook:
   - Ask the notebook the question
   - Record the answer with the source it cites
   - Cross-check against data.md
4. For each "Example Question" in the notebook entry: run it and record the answer
5. Compile research notes: `research-[page-slug].md`
6. Flag any figures that conflict with data.md → run SOP 2

**DECISION BRANCHES:**
| IF | THEN |
|----|------|
| Notebook has no sources added yet | WebSearch using sources listed in notebooks.md |
| Notebook gives unverified figure | Run SOP 2 before using |
| Two pages share same notebook | Research both pages in one session |

---

## SOP 8 — SCHEMA MARKUP

**TRIGGER:** After any page draft is complete

**REQUIRED SCHEMA — all pages:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[answer text — 2–3 sentences, includes figure with source]"
      }
    }
  ]
}
```
Minimum 5 Question/Answer pairs per page.
Questions must match the PAA accordion questions on the page.
Answers must include at least one verified figure with source.

**ADDITIONAL SCHEMA — homepage and hub pages only:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Move to Cheshire",
  "url": "https://movetocheshire.uk"
}
```

---

## SOP 9 — PAGE UPDATE

**TRIGGER:** GSC report flags a page as underperforming, or a figure in data.md is updated

**PROCEDURE:**
1. Identify what changed: figure update, new competitor content, CTR drop, rank drop
2. Read current page content
3. Run SOP 2 on all figures — update any that are outdated
4. Update "Last updated" badge to current month/year
5. If CTR is low: rewrite title tag and meta description only, do not rewrite full page
6. If rank is dropping: identify content gap via WebSearch — add missing section
7. Re-run SOP 4 (LLM Citability Check) after any update
8. Update pages.json: note update date

---

## SOP 10 — CHESTER BRIDGE PAGE

**TRIGGER:** Writing /where-to-live/chester specifically

**THIS PAGE IS DIFFERENT — read all rules below before starting.**

**PROCEDURE:**
1. Follow SOP 1 steps 1–6 (standard page creation)
2. Use Notebook 2 for area context + WebFetch movetochester.co.uk for service details
3. Build neighbourhood comparison table (6 Chester neighbourhoods — see brief.md)
4. Write 4 content sections: what Chester is, who moves there, costs, why it works as a base
5. Write 2 relocator question blocks specific to Chester (not generic Cheshire)
6. Write 6 PAA questions specific to Chester
7. At the END of the page only, add handoff block:
   - Heading: "Ready to View Properties in Chester?"
   - 2–3 sentences on remote viewing problem
   - One text link to https://movetochester.co.uk
   - Disclosure line: "Disclosure: the author of this site also operates movetochester.co.uk"
8. Do NOT add any other links to movetochester.co.uk anywhere else on this page or any other page
9. Run SOP 3, SOP 4, SOP 8 as normal

**DATA SOURCES FOR THIS PAGE:**
- Neighbourhood prices: data.md → Chester house prices section
- Safety: data.md → safety section (Chester city centre figure)
- Commute: data.md → transport section
- Service details: WebFetch https://movetochester.co.uk
