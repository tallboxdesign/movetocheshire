# movetocheshire.uk — Content Agent Skill

Write SEO-optimised, LLM-citable content pages for movetocheshire.uk, one or two at a time, using verified data only and following the site's SOPs.

## Trigger conditions
- "Write the next page"
- "Start on [page name]"
- "Write [hub] + its spoke"
- "Do the contact page"
- "What pages are left?"

## On every invocation — read in this order
1. `knowledge/pages.json` — find next pending page(s). Set status to in_progress.
2. `knowledge/brief.md` — load site rules, voice, architecture, linking rules.
3. `knowledge/data.md` — load all verified figures. Note which are UNVERIFIED.
4. `knowledge/notebooks.md` — find the notebook number and link for this page.
5. Open the NotebookLM link → pull verified data for this page's topic.
6. `knowledge/sop.md` → read the relevant SOP(s) for this page type.

## Chain with existing skills — in this order
1. `marketing:seo-audit` — confirm primary keyword, search volume, SERP intent before writing.
2. `marketing:content-creation` — draft the page content following the template in brief.md.
3. `marketing:brand-review` — check voice against brief.md rules before finalising.

## Output — for every page
- `content/[page-slug].md` — full page content in markdown
- `schema/[page-slug].schema.json` — FAQPage schema (min 5 Q&A pairs)
- Update `knowledge/pages.json` — set status to "done", add completion date

## Rules that cannot be overridden
- Never use a figure not in data.md
- Never use a figure marked UNVERIFIED without fetching it from the listed source first
- Never link to movetochester.co.uk from any page except /where-to-live/chester
- Never write estate agent language (see brief.md banned words list)
- Never mark a page "done" until SOP 4 checklist passes

## Merged notebook pages — write these together
| Write together | Shared notebook |
|----------------|----------------|
| /where-to-live/ + /where-to-live/best-places-cheshire | Notebook 2 |
| /house-prices/ + /house-prices/average-house-price-cheshire | Notebook 3 |
| /schools/ + /schools/best-primary-schools + /schools/best-secondary-schools | Notebook 5 |
| /commuting/ + /commuting/cheshire-manchester-commute | Notebook 6 |
| /lifestyle/ + /lifestyle/pros-cons-living-cheshire | Notebook 7 |

## Priority order (from pages.json)
Contact → Where to Live hub+spoke → Chester bridge → Golden Triangle → House Prices hub+spoke → Wilmslow prices → Buying Guide → Stamp Duty → Schools (3 pages) → Commuting hub+spoke → Wilmslow train → Lifestyle hub+spoke → Moving from London → Is Cheshire Safe → Good Time to Buy

## Special pages
- `/contact/` — no notebook needed. Follow contact page spec in brief.md. Named author: George. No office address.
- `/where-to-live/chester` — follow SOP 10. One link to movetochester.co.uk at bottom only. Disclosure required.
- `/investment/good-time-buy-cheshire` — requires live lookup of BoE rate and mortgage rates before writing. See data.md live lookup section.
