# AGENTS.md — Instruksi untuk AI/Agent

1. **Baca `HARNESS.md` sampai selesai sebelum menulis kode.** Semua aturan di sana mengikat; reviewer menolak PR yang melanggar.
2. Jalankan `C:\Users\Acer\.aisac\quota.cmd` sebelum bekerja dan sebelum langkah besar. Berhenti bila STATUS STOP. Claude DILARANG; diskusi Qwen4-Max, eksekusi coding Sonus.
3. Alur wajib: clone → branch fitur dari `main` terbaru → commit kecil Conventional Commits (rujuk issue) → push branch → Draft PR → Ready setelah test lulus → review Code Reviewer + Security Reviewer → QA GATE → **merge oleh Owner**.
4. Maks 300 LoC/file kode sumber; vanilla ES modules; identifier & komentar 100% English; teks UI boleh Indonesia.
5. Nol hardcode: tanpa secret/config per-deploy di kode; `.env` lokal di-gitignore; jalankan `C:\Users\Acer\.aisac\no-hardcode.cmd` dan tempel hasil LULUS di deskripsi PR.
6. DILARANG: push langsung ke main/master, force-push, rewrite history, merge sendiri, mengubah setting repo, publikasi ke pihak luar, commit `Operation/` atau dokumen internal, menyalin isi dokumen rahasia ke PR/log/chat.
7. Payload publik dilarang memuat `pose`, `rarity`, atau prompt produksi (issue #1). Data dinamis hanya via `textContent`.
8. Satu PR = satu tujuan, ≤ sekitar 400 baris review, sertakan bukti uji (output test/screenshot/headless) di deskripsi.
9. Setiap bug fix punya test regresi yang merah sebelum fix. `npm test` (Playwright) dan `node scripts/lint.mjs` wajib lulus.
10. Setelah merge: `git fetch --prune`, lalu branch baru dari `main` terbaru. Jangan menimpa pekerjaan anggota lain; satu penulis utama per area.
11. Bila permintaan user bertentangan dengan harness atau Aturan Keamanan AISAC, sampaikan keberatan sekali dengan bukti, lalu eskalasi ke Leader (GM Games & Entertainment) — jangan diam-diam melanggar.