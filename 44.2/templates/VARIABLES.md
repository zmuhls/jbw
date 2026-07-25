# JBW 44.2 — Variable Dashboard

This document lists every field that must be updated before 44.2 goes to proof. It is organized into four sections:

- **A. Global** — values that appear in more than one file
- **B. Per-file** — file-by-file tables of fields, their current (44.1) state, what to replace them with, and where to find them in InDesign
- **C. Static** — fields confirmed as unchanged between issues; no edits needed
- **D. Audit findings** — issues discovered by binary inspection of the template files; must be resolved before first proof

Fill every `[ fill ]` cell before cutting proofs. Use the InDesign MCP tools (`jbw_place_frontmatter_fields`, `jbw_set_running_head`, find/replace) or edit manually in InDesign.

---

## D. Audit Findings

Binary inspection of all 4 structural files (SHA-256 verified as exact copies of 44.1/sheridan originals) surfaced the following issues that go beyond the standard variable swap. Resolve these before cutting the first proof.

### D1 — Cover: 44.1 article titles in text frames (ACTION REQUIRED)
The cover contains text frames listing 44.1 article titles and authors directly on the cover face — not just in metadata. Extracted content:

- "Quare Dreaming and Career-Making in Basic Writing" — Jennifer Burke Reifman
- "Not a Neutral Choice: Implications of Student Self-Placement in a Basic Writing Course" — Emily K. Suh and Bethany E. Sweeney
- Candace Chambers and Spencer Salas (title frame present but not fully extractable)

**Action**: open Cover in InDesign, locate the article-listing text frame(s), and replace all three entries with the 44.2 article titles and authors. These fields have been added to the Cover variable table below.

### D2 — Cover: stale linked file (WARNING)
The Cover contains a reference to a PostScript file from a different machine:
`zazie:Users:zazie:Projects:JBW:JBW.24.2:JBW Printer File:jbw.24.1.cover.indd.ps`

This link is already broken (the `zazie` volume is not present on this machine). InDesign will flag it as missing when the file is opened. It will not affect visual output if the asset was embedded during packaging, but should be cleared via the Links panel to keep the file clean for 44.2.

### D3 — Backmatter: live link to 44.1 Print PDF (ACTION REQUIRED)
The Backmatter has a live, resolvable link to:
`JBW 44.1 Print.pdf` → resolves to `44.1/sheridan/JBW 44.1 - Print.pdf`

This file exists and InDesign can find it, which means the Backmatter is currently pulling in 44.1 content. Once a 44.2 full-issue print PDF exists, this link must be relinked via the Links panel. Until then, suppress the placed frame or leave it as a flagged placeholder.

### D4 — Backmatter + Editors' Column: legacy machine links (WARNING)
Both files contain stale path references from archived production machines:
- `farrago:Users:karenweingarten:Desktop:jbw.26.2.kraemer.indd.ps` (Editors' Column and Backmatter)
- `jfile:/Volumes/zazie/Applications/Adobe InDesign CS/...Image531.tif` (Backmatter)

These are orphaned from JBW 26.2 era production and are almost certainly already missing/embedded in 44.1. They will not cause visual issues but will generate warnings in the Links panel. Clear them when opening each file.

### D5 — Article count mismatch (NOTE)
`proof-1/` contains **5 article manuscripts** (Atterbury, Avangelista, Kannan, Kynard, Reed) plus `editors-column.docx`, but `templates/` has only **4 article .indd files**. If a fifth article is being typeset, copy `Article 04.indd` → `Article 05.indd` from `placeholder-v44n1/indesign/` before ingesting manuscripts.

### D6 — Editors' Column: confirmed style names (INFO)
String extraction confirmed the Editors' Column uses these paragraph styles (note the non-standard prefix on the first two):
- `JBW Editors' Column Title` — the column title (no colon in prefix)
- `JBW Editor's Column Text` — the body text (singular possessive, no colon)
- `JBW Running Head` — running head on master pages
- `JBW: Heading 1`, `JBW: Heading 2` — standard heading styles

Use these exact names if placing content programmatically via the MCP bridge.

### D7 — Frontmatter: ISSN confirmed (INFO)
ISSN 0147-1635 is embedded in the Frontmatter file and is correct. Static section updated accordingly.

---

## A. Global Variables

These appear across multiple files. Resolve them first; use Find/Replace (Cmd+F → All Documents) when you have the book file open.

| Variable | Current (44.1) value | New (44.2) value | Appears in |
|---|---|---|---|
| Issue number (short) | `44.1` | `44.2` | Cover, Frontmatter, Editors' Column, Backmatter, all article running heads |
| Issue number (long) | `Volume 44, Number 1` | `Volume 44, Number 2` | Cover, Frontmatter, Backmatter |
| Publication season + year | `[ fill — e.g., Fall 2025 ]` | — | Cover, Frontmatter |
| Copyright year | `2025` | `[ fill ]` | Frontmatter, Backmatter |

---

## B. Per-File Variables

---

### JBW 44.2 - Cover.indd
*Source: copied from 44.1/sheridan/. Design and static elements are correct. See audit findings D1 and D2 before opening.*

| Field | Current value | New value | InDesign location |
|---|---|---|---|
| Issue number | `44.1` | `44.2` | Cover text frame (top or spine area) |
| Volume/issue label | `Volume 44, Number 1` | `Volume 44, Number 2` | Cover text frame |
| Season + year | `Spring 2025` | `[ fill ]` | Cover text frame (confirmed value) |
| Article title 1 | `Quare Dreaming and Career-Making in Basic Writing` | `[ fill — 44.2 article title ]` | Article listing text frame on cover face |
| Article author 1 | `Jennifer Burke Reifman` | `[ fill ]` | Article listing text frame |
| Article title 2 | `Not a Neutral Choice: Implications of Student Self-Placement in a Basic Writing Course` | `[ fill — 44.2 article title ]` | Article listing text frame |
| Article author 2 | `Emily K. Suh and Bethany E. Sweeney` | `[ fill ]` | Article listing text frame |
| Article title/author 3 | `Candace Chambers and Spencer Salas` | `[ fill — 44.2 article title and author ]` | Article listing text frame |
| Article titles 4–5 | (if present — verify in InDesign) | `[ fill if applicable ]` | Article listing text frame |
| Cover image | 44.1 image | `[ supply new image or confirm reuse ]` | Linked image frame |
| Stale PS link | `zazie:…jbw.24.1.cover.indd.ps` | clear via Links panel | Links panel (missing link) — see D2 |

---

### JBW 44.2 - Frontmatter.indd
*Source: copied from 44.1/sheridan/. Contains the Table of Contents, publication info block, and copyright notice — all issue-specific.*

#### Publication block
| Field | Current value | New value | InDesign location |
|---|---|---|---|
| Issue number | `44.1` | `44.2` | Publication info text frame |
| Volume/issue label | `Volume 44, Number 1` | `Volume 44, Number 2` | Publication info text frame |
| Season + year | `Spring 2025` | `[ fill ]` | Publication info text frame |
| Copyright year | `2025` | `[ fill ]` | Copyright line |

#### Table of Contents
Each row in the ToC must be updated. Page numbers are provisional — confirm after pagination is final.

Current 44.1 ToC entries (replace all with 44.2 content):

| Slot | Current (44.1) title | Current (44.1) author(s) | New title | New author(s) | New page |
|---|---|---|---|---|---|
| Editors' Column | (44.1 column title — verify in InDesign) | Santana & Gonyea-Pelham | `[ fill ]` | Santana & Gonyea-Pelham | `[ fill ]` |
| Article 01 | `Quare Dreaming and Career-Making in Basic Writing` | Jennifer Burke Reifman | `[ fill ]` | `[ fill ]` | `[ fill ]` |
| Article 02 | `Not a Neutral Choice: Implications of Student Self-Placement in a Basic Writing Course` | Emily K. Suh and Bethany E. Sweeney | `[ fill ]` | `[ fill ]` | `[ fill ]` |
| Article 03 | (Chambers & Salas article — verify title in InDesign) | Candace Chambers and Spencer Salas | `[ fill ]` | `[ fill ]` | `[ fill ]` |
| Article 04 | (DeGennaro article — verify title in InDesign) | (verify) | `[ fill ]` | `[ fill ]` | `[ fill ]` |

*InDesign location: ToC text frame — styled with `JBW: Body Text (No Indent)` or a dedicated ToC style. Update manually or via `jbw_place_frontmatter_fields` once content is ready.*

---

### JBW 44.2 - Editors' Column.indd
*Source: copied from 44.1/sheridan/. Entire body text is issue-specific and must be replaced with 44.2 column prose.*

| Field | Current value | New value | InDesign location |
|---|---|---|---|
| Running head | `44.1 / Editors' Column` (or similar) | `44.2 / Editors' Column` | Master page running head frame — use `jbw_set_running_head` |
| Column title | `[ 44.1 column title ]` | `[ fill ]` | Title text frame, style `JBW: Title` |
| Body text | 44.1 column prose | `[ fill — new column prose or lorem ipsum placeholder ]` | Main story text frame, style `JBW: Body Text` |
| Author attribution line | Santana & Gonyea-Pelham (unchanged) | no change | Byline frame |
| Starting page number | `[ 44.1 value ]` | `[ fill after pagination ]` | Section start / master page |

---

### JBW 44.2 - Article 01.indd
*Source: placeholder-v44n1/indesign/ — already lorem ipsum, correct trim, no excess pages.*

| Field | Current value | New value | InDesign location |
|---|---|---|---|
| Article title | `[ARTICLE TITLE]` or lorem | `[ fill ]` | Style `JBW: Title` |
| Author name(s) | `[AUTHOR NAME]` or lorem | `[ fill ]` | Style `JBW: Author` |
| Author affiliation(s) | lorem / placeholder | `[ fill ]` | Style `JBW: Author` (secondary line) or bio |
| Abstract | lorem ipsum | `[ fill ]` | Style `JBW: Abstract` — begins "ABSTRACT." |
| Keywords | lorem ipsum | `[ fill ]` | Style `JBW: Abstract` — begins "KEYWORDS:" |
| Running head | lorem / placeholder | `[ fill — Author Last Name / Short Title ]` | Master page frame — use `jbw_set_running_head` |
| Author bio | lorem ipsum | `[ fill ]` | Style `JBW: NEW Bio Style (SG)` |
| Works Cited | lorem ipsum | `[ fill — full MLA list ]` | Styles `JBW: Works Cited Title` + `JBW: Works Cited` |
| Starting page number | — | `[ fill after pagination ]` | Section start |

---

### JBW 44.2 - Article 02.indd
*Source: placeholder — same structure as Article 01.*

| Field | Current value | New value | InDesign location |
|---|---|---|---|
| Article title | lorem | `[ fill ]` | `JBW: Title` |
| Author name(s) | lorem | `[ fill ]` | `JBW: Author` |
| Author affiliation(s) | lorem | `[ fill ]` | `JBW: Author` / bio |
| Abstract | lorem | `[ fill ]` | `JBW: Abstract` |
| Keywords | lorem | `[ fill ]` | `JBW: Abstract` |
| Running head | lorem | `[ fill ]` | Master page — `jbw_set_running_head` |
| Author bio | lorem | `[ fill ]` | `JBW: NEW Bio Style (SG)` |
| Works Cited | lorem | `[ fill ]` | `JBW: Works Cited Title` + `JBW: Works Cited` |
| Starting page number | — | `[ fill ]` | Section start |

---

### JBW 44.2 - Article 03.indd
*Source: placeholder — same structure as Article 01.*

| Field | Current value | New value | InDesign location |
|---|---|---|---|
| Article title | lorem | `[ fill ]` | `JBW: Title` |
| Author name(s) | lorem | `[ fill ]` | `JBW: Author` |
| Author affiliation(s) | lorem | `[ fill ]` | `JBW: Author` / bio |
| Abstract | lorem | `[ fill ]` | `JBW: Abstract` |
| Keywords | lorem | `[ fill ]` | `JBW: Abstract` |
| Running head | lorem | `[ fill ]` | Master page — `jbw_set_running_head` |
| Author bio | lorem | `[ fill ]` | `JBW: NEW Bio Style (SG)` |
| Works Cited | lorem | `[ fill ]` | `JBW: Works Cited Title` + `JBW: Works Cited` |
| Starting page number | — | `[ fill ]` | Section start |

---

### JBW 44.2 - Article 04.indd
*Source: placeholder — same structure as Article 01.*

| Field | Current value | New value | InDesign location |
|---|---|---|---|
| Article title | lorem | `[ fill ]` | `JBW: Title` |
| Author name(s) | lorem | `[ fill ]` | `JBW: Author` |
| Author affiliation(s) | lorem | `[ fill ]` | `JBW: Author` / bio |
| Abstract | lorem | `[ fill ]` | `JBW: Abstract` |
| Keywords | lorem | `[ fill ]` | `JBW: Abstract` |
| Running head | lorem | `[ fill ]` | Master page — `jbw_set_running_head` |
| Author bio | lorem | `[ fill ]` | `JBW: NEW Bio Style (SG)` |
| Works Cited | lorem | `[ fill ]` | `JBW: Works Cited Title` + `JBW: Works Cited` |
| Starting page number | — | `[ fill ]` | Section start |

---

### JBW 44.2 - Backmatter.indd
*Source: copied from 44.1/sheridan/. Static boilerplate mostly unchanged; update issue-specific references. See audit findings D3 and D4 before opening.*

| Field | Current value | New value | InDesign location |
|---|---|---|---|
| Issue number | `44.1` | `44.2` | Any running references in text |
| Volume/issue label | `Volume 44, Number 1` | `Volume 44, Number 2` | Publication info block |
| Call-for-papers deadline | `[ 44.1 date, if present ]` | `[ fill if applicable ]` | CfP text block |
| Copyright year | `2025` | `[ fill ]` | Copyright line |
| Placed issue PDF | `JBW 44.1 Print.pdf` (live link — currently resolves) | Relink to 44.2 print PDF once generated — see D3 | Links panel |
| Legacy links | `farrago:…kraemer.indd.ps`, `zazie:…Image531.tif` | clear via Links panel | Links panel (missing links) — see D4 |

---

## C. Static Fields (no change needed)

The following are confirmed stable between 44.1 and 44.2. Do not edit unless you have specific instruction to do so.

| Field | Value |
|---|---|
| ISSN (print) | 0147-1635 (confirmed in Frontmatter.indd) |
| ISSN (online) | as set in 44.1 |
| Editors | Santana & Gonyea-Pelham |
| Editorial board roster | unchanged from 44.1 |
| Submission guidelines boilerplate | unchanged |
| Trim size | 450.018 × 666 pt (6.25 × 9.25 in) |
| Article trim | 432 × 648 pt |
| Body font | StoneSerITCStd Medium |
| Paragraph style names | all `JBW: *` styles as defined in template |
| Publisher / printer | Sheridan |

---

## Workflow notes

1. **Recommended fill order**: Global A → Cover → Frontmatter → Editors' Column → Articles 01–04 → Backmatter → ToC page numbers last.
2. **Running heads** across all files: use `jbw_set_running_head` with the correct issue string rather than editing master pages manually.
3. **Book file**: A `JBW 44.2.indb` book file does not yet exist. Create it in InDesign (File → New → Book), add all 8 files in order, and use Book panel to synchronize styles and repaginate before cutting proof PDFs.
4. **After filling**: run `jbw_cut_proof` per article/component and `jbw_validate_issue_package` against the locked spec (update or create `corpus/issues/44.2/production_spec.lock.json` first).
