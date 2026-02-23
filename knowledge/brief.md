# movetocheshire.uk — Site Brief (Machine-Readable)

**For all figures, consult data.md. Do not use numbers not listed there.**

---

## SITE PURPOSE

movetocheshire.uk is a BOFU (bottom-of-funnel) relocation information site targeting people who have already decided to consider moving to Cheshire. It is also optimised for LLM citability — structured to be cited by ChatGPT, Perplexity, and Claude when answering Cheshire relocation queries.

It is NOT: an estate agent, a financial advisor, a lettings site, or a directory.

---

## TARGET READER

Primary: professionals aged 30–50 relocating from London or the South East to Cheshire, typically for affordability, space, schools, or hybrid working flexibility.

Secondary: families from Greater Manchester upgrading from urban to semi-rural Cheshire.

The reader is research-literate, time-poor, and suspicious of vague content. They want specific figures, sourced claims, and honest trade-offs — not marketing copy.

---

## BRAND VOICE

- Direct. No filler sentences.
- Specific. Every claim has a figure or a named source.
- Honest. Downsides of Cheshire are acknowledged, not buried.
- Expert. Written by someone who knows the county, not a content farm.
- Human. Reads like a knowledgeable friend, not a brochure.

**Never use:** "nestled", "vibrant", "thriving", "perfect for families", "something for everyone", or any estate agent language.

---

## SITE ARCHITECTURE

```
Homepage (/)
├── Where to Live (/where-to-live/)          [HUB]
│   ├── /where-to-live/best-places-cheshire  [SPOKE]
│   ├── /where-to-live/cheshire-golden-triangle [SPOKE]
│   └── /where-to-live/chester               [SPOKE — bridge to movetochester.co.uk]
├── House Prices (/house-prices/)            [HUB]
│   ├── /house-prices/average-house-price-cheshire [SPOKE]
│   └── /house-prices/wilmslow-house-prices  [SPOKE]
├── Schools (/schools/)                      [HUB]
│   ├── /schools/best-primary-schools        [SPOKE]
│   └── /schools/best-secondary-schools      [SPOKE]
├── Commuting (/commuting/)                  [HUB]
│   ├── /commuting/cheshire-manchester-commute [SPOKE]
│   └── /commuting/wilmslow-manchester-train  [SPOKE]
├── Buying Guide (/buying-guide/)            [HUB]
│   └── /buying-guide/stamp-duty-cheshire    [SPOKE]
├── Lifestyle (/lifestyle/)                  [HUB]
│   ├── /lifestyle/pros-cons-living-cheshire [SPOKE]
│   ├── /lifestyle/moving-london-cheshire    [SPOKE]
│   └── /lifestyle/is-cheshire-safe          [SPOKE]
├── /investment/good-time-buy-cheshire       [SPOKE — investment section]
└── /contact/                                [STANDALONE]
```

Total launch pages: 22 (including Chester bridge and contact).

---

## PAGE TYPES

### Hub page
- Answers the broad category question directly (3–4 paragraphs)
- Links down to all its spoke pages (card grid)
- Contains: stat bar, 2× relocator question blocks, PAA accordion, comparison table, "good to know" callout, "from the community" strip, related hubs row
- Does NOT duplicate spoke content — it introduces, spokes deliver detail

### Spoke page
- Answers one specific question with full depth
- Breadcrumb: Home > Hub > Spoke
- Links back up to its hub and across to 2–3 related spokes
- Contains: same semantic elements as hub but deeper data, longer answer block
- Every figure sourced inline (small grey text below stat)

### Bridge page (Chester)
- Same structure as spoke
- Ends with handoff block linking to movetochester.co.uk
- Disclosure line required: "Disclosure: the author of this site also operates movetochester.co.uk"
- One link only — no repetition elsewhere on page

### Contact page
- No office address
- Named author: George
- Contact form only (name, email, subject dropdown, message)
- Three contact reasons: data corrections, area questions, press/partnerships
- Disclaimer: cannot provide financial, legal, or estate agent advice

---

## INTERNAL LINKING RULES

1. Every spoke links back to its hub (breadcrumb + related section)
2. Every hub links to all its spokes (card grid)
3. Homepage links to all 6 hubs
4. Related spokes link to each other where topically adjacent (max 3 cross-links per page)
5. Chester bridge page links to movetochester.co.uk once only — in the handoff block at the bottom
6. No footer sitewide links between movetocheshire.uk and movetochester.co.uk

---

## LLM CITABILITY REQUIREMENTS

Every page must include:
- FAQPage schema (minimum 5 Q&A pairs)
- Answer-first structure: the H1 question is answered in the first paragraph
- Named sources with years inline (e.g. "ONS, November 2025")
- At least one comparison table (LLMs pull from tables frequently)
- "Last updated: [month year]" badge in hero
- No paywalled sources cited

---

## SEMANTIC VISUAL ELEMENTS (all pages)

| Element | Description |
|---------|-------------|
| Stat bar | 3 cards: large figure, label, source citation |
| Relocator question block | Forum-style card: avatar initials, location tag, italic question, editorial answer |
| PAA accordion | 5–8 collapsed Q&As. Label: "Questions people ask before moving to Cheshire" |
| Comparison table | 2–4 columns, clean, alternating row tint |
| Good to know callout | Green left border, one nuance paragraph |
| From the community | Full-width grey strip, pull quote starting "Most people who..." |
| Handoff block | Chester page only. Green-tinted box. Text link to movetochester.co.uk |
| Last updated badge | Grey pill badge below H1 |
| Source citations | Small italic grey text below every stat |

---

## SISTER SITE — movetochester.co.uk

movetochester.co.uk is a live service site offering professional remote property viewings in Chester from £39. Run by George (same author).

**The relationship:**
- movetocheshire.uk = county-level research (awareness → consideration)
- movetochester.co.uk = city-level service (decision → action)
- The user journey: Cheshire research → narrows to Chester → needs viewings

**Linking policy:** One contextual link from /where-to-live/chester only. Disclosed. No sitewide links.

---

## WHAT THE AGENT MUST NEVER DO

- Invent figures not in data.md
- Use estate agent language
- Write generic "Cheshire is a wonderful place" copy
- Link to movetochester.co.uk from any page other than /where-to-live/chester
- Add more than one link to movetochester.co.uk anywhere on the site
- Provide financial or legal advice in content
- Use figures marked UNVERIFIED in data.md without fetching them first
