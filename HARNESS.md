# HARNESS — chizuru-quiz-adat

Standar kerja WAJIB untuk semua perubahan di repo ini. Dibaca sebelum menulis kode; reviewer menolak PR yang melanggar.

## 1. Identitas

| Field | Isi |
|---|---|
| Jenis proyek | Game kuis HTML statis (fan-made, non-komersial), deploy GitHub Pages dari `main` |
| Stack | HTML + CSS + vanilla JS (ES modules), tanpa dependensi runtime, tanpa backend/database |
| Basis harness | Harness ringan turunan `Aisac-Indonesia/loop-v5` @ `57d414ccde3ca77f4194666032f4b3942bd5b3aa` (RULES-OF-THE-GAME, standards/, harness/review-checklist) + `aisac-id/harness-extension` @ `2301564c22989c5b11efd2f81f76edf8bcb1ae71` (STANDARDS v1.5: batas 300 LoC/file, ES modules, nol hardcode, checklist acceptance) |
| Pemilik harness | GM Games & Entertainment (Project Lead). Perubahan harness hanya lewat PR `chore/harness-*` |

## 2. Aturan yang berlaku + pengecualian

Diadopsi dari loop-v5: #11 audit sebelum deploy (security, performa, a11y, review), #14 kode/komentar/identifier 100% English (teks UI boleh Indonesia), #15 supply-chain (versi exact tanpa `^`/`~`, lockfile di-commit, CI `npm ci`, audit 0 high/critical untuk dependensi runtime), #16 config via environment + nol secret hardcoded, #19 test-first untuk logika baru (setiap bug fix punya test regresi yang merah sebelum fix), #23 git + Conventional Commits.

Diadopsi dari harness-extension: maks **300 LoC per file** (kode sumber; lockfile/aset generated dikecualikan), vanilla ES modules, tanpa CDN/eval/polling liar, `.env.example` + `.gitignore`, checklist acceptance (§6).

Pengecualian (dengan alasan, disetujui Project Lead):
- Aturan DB/backend loop-v5 (#2 FK, #3 soft delete, #4 CRUD satu halaman, #5 drawer, #7 data dari API, #8 akses DB, #9 backend dulu): **tidak berlaku** — game statis tanpa database; data kuis adalah konten produk, bukan dummy data.
- #13 Cloudflare edge: **tidak berlaku** di GitHub Pages (tanpa form/auth/endpoint sensitif). Risiko residual dicatat; mitigasi: tanpa input pengguna, tanpa secret, CSP meta bila memungkinkan.
- #14 i18n 3 bahasa (id/en/ja): **ditangguhkan** — UI default `id`; `en` wajib untuk teks legal/disclaimer. `ja` di luar scope mini-game edukasi audiens Indonesia.
- #12 UX Heuristic Benchmark 3 framework: **disederhanakan** menjadi gate WCAG 2.2 AA + aturan UX inti (touch target ≥44×44px, fokus terlihat, feedback instan, navigasi ≤3 layar). Scorecard penuh hanya bila UI dirombak total.
- #17 SRE (health endpoint, backup drill): **tidak berlaku** untuk hosting statis; git = sumber kebenaran, uptime mengikuti GitHub Pages.
- #18 UU PDP: aplikasi tidak memproses data pribadi (hanya skor lokal `localStorage`, tanpa identtas). Tetap wajib: tanpa tracker/pihak ketiga, tanpa pengumpulan data.
- #24 `progress.md`: digantikan backlog GitHub Issues + PR (satu sumber kebenaran, hemat duplikasi).

## 3. Struktur folder & batas ukuran

```
index.html            markup saja (target; saat ini CSS+JS inline — refactor via PR fitur)
css/                  stylesheet (target)
js/                   ES modules, maks 300 LoC/file (target: main, quiz, ui, storage)
data/                 data publik ES module; DILARANG memuat pose/rarity/prompt internal (#1)
assets/               gambar kostum; target WebP 512/768/1024 + <picture>/sizes, lazy-load
promo/                logo/hero/brand kit
tests/e2e/            Playwright, maks 300 LoC/file
scripts/              tooling dev (serve, lint, check-hardcode), bukan kode aplikasi
Operation/            DILARANG commit — dokumen internal Confidential (lihat .gitignore)
```
Satu penulis utama per area/direktori per batch. Anggota lain hanya membaca/me-review.

## 4. Konfigurasi (nol hardcode)

Tidak ada secret runtime. Variabel env tooling (lihat `.env.example`, nilai palsu):

| Variabel | Fungsi | Contoh |
|---|---|---|
| `PORT` | Port server statis lokal untuk test | `8123` |
| `HOST` | Host server statis lokal; dasar URL test | `127.0.0.1` |
| `BASE_URL` | Base URL test e2e (default: gabungan HOST+PORT) | `http://127.0.0.1:8123` |

`.env` lokal masuk `.gitignore`; hanya `.env.example` yang di-commit. Infrastruktur AISAC (bila kelak dipakai) hanya lewat `C:\Users\Acer\.aisac\vercel-ai.cmd`; secret produksi di Vercel env, tidak pernah di repo.

## 5. Quality gates

**Aksesibilitas — WCAG 2.2 AA:** pinch-zoom boleh (tanpa `maximum-scale=1`), kontras teks ≥4.5:1, alt gambar bermakna TANPA membocorkan jawaban, progressbar `role`+`aria-valuenow`, skor/feedback `aria-live`, keyboard penuh (Tab/Enter), fokus terlihat, touch target ≥44×44px.

**Performance budget:** unduhan awal (layar start) ≤150 KB; per soal ≤100 KB; satu putaran 100 soal ≤8 MB; LCP ≤2.5 s, CLS ≤0.1, INP ≤200 ms; gambar WebP (AVIF opsional) `srcset` 512/768/1024 + `sizes`, lazy-load di bawah lipatan, dimensi eksplisit; total aset repo ≤12 MB (prasyarat PWA #16).

**Keamanan:** payload publik tanpa `pose`/`rarity`/prompt produksi (#1); semua data dinamis via `textContent` (tanpa `innerHTML` berisi data, `eval`, `new Function`, `document.write`); tanpa input pengguna/skrip pihak ketiga; tanpa secret di mana pun; `Operation/` dan dokumen internal tidak boleh masuk repo; kanal takedown legal via GitHub Issue.

**Testing:** e2e Playwright minimal alur kritis (start → jawab → lanjut → selesai); setiap bug fix wajib test regresi; CI hijau sebelum Ready for review.

## 6. Definition of Done (per PR)

1. Satu PR = satu tujuan, ≤ sekitar 400 baris review (lockfile/aset generated dikecualikan dan disebut di deskripsi).
2. `node scripts/lint.mjs` LULUS (batas 300 LoC + pola terlarang).
3. `npm test` (Playwright) LULUS; bukti uji (output test/screenshot/headless) ditempel di deskripsi PR.
4. `C:\Users\Acer\.aisac\no-hardcode.cmd` → **NO-HARDCODE: LULUS** ditempel di deskripsi PR; CI `check-hardcode` hijau.
5. Gate a11y + performance budget terpenuhi untuk perubahan yang menyentuh UI/aset (bukti terukur).
6. Review **Code Reviewer + Security Reviewer** (format temuan `[BLOCKER|MAJOR|MINOR|NIT] file:baris, alasan, saran`); UI/performa bila relevan: UI Designer / Performance Engineer.
7. **QA GATE: LULUS/GAGAL** dari QA Engineer di PR, dengan bukti verifikasi acceptance criteria.
8. Conventional Commits, rujuk nomor issue; branch `feat/…`, `fix/…`, `security/…`, `perf/…`, `content/…`, `chore/…`, `docs/…`.
9. **Merge hanya oleh Owner.** Dilarang: push langsung ke main, force-push, rewrite history, merge sendiri, ubah setting repo, publikasi ke luar. Setelah merge: `git fetch --prune`, branch baru dari main terbaru.
10. Kuota: jalankan `C:\Users\Acer\.aisac\quota.cmd` sebelum langkah besar; STOP bila kuota habis. Claude DILARANG (model: diskusi Qwen4-Max, coding Sonus).

## 7. Review checklist (ringkas)

- [ ] Scope satu tujuan; diff ≤ ~400 baris review; issue dirujuk
- [ ] ≤300 LoC/file; ES modules; identifier/komentar English
- [ ] Tanpa secret/pose/rarity/prompt internal di payload publik; tanpa eval/innerHTML-data
- [ ] Test regresi/e2e baru lulus; CI hijau; NO-HARDCODE: LULUS ditempel
- [ ] A11y AA + performance budget terjaga (bukti bila menyentuh UI/aset)
- [ ] Bukti uji di deskripsi PR; risiko & rollback ditulis
- [ ] Review Code + Security selesai; QA GATE tertulis; merge oleh Owner

## 8. Alur rilis & bukti rilis

Merge ke `main` oleh Owner → GitHub Pages deploy otomatis. Bukti rilis (release-evidence): link PR + QA GATE + CI hijau + smoke test pasca-deploy (halaman start dan 1 soal). Tag/GitHub Release hanya oleh Owner; Release Manager menyiapkan changelog. Versi A = fan-made (LICENSE MIT untuk kode saja + NOTICE ID/EN, aset fan-art ARR — lihat #9/#10); Versi B = karakter original AISAC (tahap terpisah setelah A stabil).