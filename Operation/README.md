# Operation — Chizuru Quiz Adat

Knowledge base komersial & operasional untuk **Chizuru Quiz Adat** — kuis web satu halaman yang menebak daerah asal kostum adat dari 100 entri busana Indonesia dan dunia, ditulis sebagai `index.html` (5,8 KB) plus bank soal `data.js` (14,6 KB, `const COSTUMES`) tanpa pustaka pihak ketiga, tanpa server, dan tanpa akun, diterbitkan sebagai situs statis GitHub Pages dari repository `aisac-id/chizuru-quiz-adat`. Dokumen-dokumen di bawah diterbitkan oleh **PT. Sainskerta Solusi Nusantara** (software house & AI partner, sejak 2013; Gedung Graha Mampang Lt. 3, Jakarta Selatan) sebagai basis kerja Divisi Produk & Komersial untuk lini ini, dan seluruh klaim fitur disusun dari berkas nyata di repository (`README.md`, `index.html`, `data.js`, `assets/` 100 JPEG ±34 MB, `promo/` 6 berkas).

> **Catatan penting.** Seluruh harga, nilai kontrak, target konversi, ambang keberhasilan PoC, nilai RTO/RPO, dan proyeksi dalam dokumen di sini berstatus **usulan — perlu validasi manajemen** sebelum dipakai dalam penawaran ke klien atau kontrak. Kompetitor yang dibandingkan adalah produk nyata dengan URL sumber.

> **Catatan kekayaan intelektual (WAJIB dibaca lebih dahulu).** Karakter Chizuru Mizuhara adalah karya berhak cipta pihak lain dari seri *Rent-A-Girlfriend* (*Kanojo, Okarishimasu*) karya Reiji Miyajima. Posisi jujur produk ini saat ini adalah **fan showcase / portofolio non-komersial**. Komersialisasi langsung fan-art ini **tidak disarankan dalam skema apa pun** — termasuk penjualan, pemasangan iklan, donasi, merchandise, maupun penggunaan di acara berbayar. Yang dapat dikerjakan dan ditawarkan adalah konten budaya orisinal (bank soal, teks kurasi, aset gambar) dan jasa produksinya. Jalur komersial yang sah atas karakter hanya dua: memperoleh izin tertulis dari pemegang hak, atau menjalankan rebranding penuh ke karakter orisinal milik klien atau perusahaan. Analisis risiko IP dimuat di `04-Analisis-SWOT.docx`, `01-Business-Model-Canvas.docx`, dan kedua dokumen proposal (`05`).

## 01-Business-Strategy

| Dokumen | Isi |
|---|---|
| [01-Business-Model-Canvas](01-Business-Strategy/01-Business-Model-Canvas.docx) | Dua aset dipisah: wajah karakter tak dijual, bank soal budaya dapat dilisensikan |
| [02-ICP-dan-Segmentasi-Pasar](01-Business-Strategy/02-ICP-dan-Segmentasi-Pasar.docx) | Sekolah & madrasah, museum, dinas pariwisata, penerbit; pelajar sebagai segmen gratis |
| [03-Analisis-Kompetitor](01-Business-Strategy/03-Analisis-Kompetitor.docx) | Kahoot!, Wayground, Wordwall, Educaplay, ZebQuiz, Seterra/GeoGuessr, rakitan sendiri |
| [04-Analisis-SWOT](01-Business-Strategy/04-Analisis-SWOT.docx) | Spesifisitas konten vs kedalaman pedagogis, akurasi label daerah, dan risiko IP |

## 02-Sales

| Dokumen | Isi |
|---|---|
| [05-Proposal-Penjualan-B2B-Institusi-Budaya](02-Sales/05-Proposal-Penjualan-B2B-Institusi-Budaya.docx) | Empat tahap: kurasi & verifikasi, pedagogi, identitas institusi, pelaporan |
| [05-Proposal-Penjualan-B2C-Pelajar-Budaya](02-Sales/05-Proposal-Penjualan-B2C-Pelajar-Budaya.docx) | Akses gratis tanpa akun & batas yang dijaga, jalur lanjut pasca-rebrand |
| [06-Statement-of-Work](02-Sales/06-Statement-of-Work.docx) | Lingkup kerja lisensi konten budaya & rebranding karakter, in scope dan out of scope |
| [07-Pricing-dan-Packaging](02-Sales/07-Pricing-dan-Packaging.docx) | Paket Rp 0 s.d. lisensi konten Rp 20–45 juta; aset fan-art tidak diberi harga |
| [08-Sales-Playbook-dan-Battlecard](02-Sales/08-Sales-Playbook-dan-Battlecard.docx) | Kartu tempur per kompetitor, gerbang kualifikasi hak, dan garis merah |
| [09-Product-Datasheet](02-Sales/09-Product-Datasheet.docx) | Bobot berkas nyata, mekanik 100 soal / 79 label, batas yang jujur dinyatakan |

## 03-Pre-Sales

| Dokumen | Isi |
|---|---|
| [10-Discovery-Questionnaire](03-Pre-Sales/10-Discovery-Questionnaire.docx) | Bagian A penghenti peluang, lalu kebutuhan budaya, teknis, dan pengadaan |
| [11-Demo-Script-dan-PoC-Plan](03-Pre-Sales/11-Demo-Script-dan-PoC-Plan.docx) | Naskah demo 20 menit, desain uji edukasi, dan kriteria lulus PoC |
| [12-Technical-Proposal](03-Pre-Sales/12-Technical-Proposal.docx) | Lima varian pemasangan: tautan terkelola, luring, situs internal, kios, lisensi konten |
| [13-ROI-dan-Business-Case](03-Pre-Sales/13-ROI-dan-Business-Case.docx) | Rakitan sendiri vs alat gratis vs lisensi konten, plus nilai yang dihindarkan |

## 04-IT-Communication

| Dokumen | Isi |
|---|---|
| [14-Arsitektur-Solusi](04-IT-Communication/14-Arsitektur-Solusi.docx) | Runtime statis tanpa backend, alur data `COSTUMES`, rantai distribusi GitHub Pages |
| [15-Arsitektur-Keamanan-dan-Threat-Model](04-IT-Communication/15-Arsitektur-Keamanan-dan-Threat-Model.docx) | Ancaman S1/T1/R1/I1/D1/E1 pada repo publik tanpa peladen |
| [16-Privasi-Data-dan-Kepatuhan](04-IT-Communication/16-Privasi-Data-dan-Kepatuhan.docx) | Posisi UU PDP atas rekor `cq_best`, perlindungan anak, dan kepatuhan konten budaya |

## 05-Resilience-Operations

| Dokumen | Isi |
|---|---|
| [17-Business-Continuity-Plan](05-Resilience-Operations/17-Business-Continuity-Plan.docx) | Skenario S1 take-down IP s.d. S5 aset hilang, tanpa infrastruktur fiktif |
| [18-Disaster-Recovery-Plan](05-Resilience-Operations/18-Disaster-Recovery-Plan.docx) | Runbook P1–P5: pemulihan repo, kanal, gambar, dan bank soal |
| [19-SOP-Insiden-dan-Breach-Response](05-Resilience-Operations/19-SOP-Insiden-dan-Breach-Response.docx) | Enam tahap deteksi sampai notifikasi, termasuk tenggat 3x24 jam |
| [20-SLA-dan-Model-Dukungan](05-Resilience-Operations/20-SLA-dan-Model-Dukungan.docx) | Jenjang komunitas s.d. utama, target T1–T4, dan pengecualian jujur |

## Cara Memakai Folder Ini

1. Mulai dari `01-Business-Strategy` untuk menetapkan segmen dan posisi sebelum menyusun penawaran apa pun; produk ini bernilai karena kontennya, bukan karena teknologinya.
2. Baca pernyataan IP pada dokumen `01`, `04`, dan kedua `05` lebih dahulu; seluruh angka harga hanya berlaku untuk konten budaya orisinal, jasa kurasi/verifikasi, atau varian berkarakter orisinal.
3. Gunakan `10-Discovery-Questionnaire` sebagai gerbang kualifikasi — Bagian A adalah penghenti peluang, bukan formalitas.
4. Rujuk `17`–`20` saat menyusun kontrak dukungan; produk tidak memiliki backend, sehingga yang dijamin adalah respons dan pemulihan berkas, bukan uptime infrastruktur pihak ketiga.

Empat hal yang harus dinyatakan jujur kepada klien maupun internal: build fan-art yang tersedia publik tidak dapat dijual, dipasangi iklan, atau dipasang di acara berbayar; produk tidak memiliki server sehingga tidak ada klaim analitik, leaderboard, sesi kelas tersinkron, maupun jaminan ketersediaan hosting pihak ketiga; akurasi 100 label daerah belum ditelaah verifikator budaya sehingga angka capaian pembelajaran tidak boleh dijanjikan sebelum PoC; dan repository belum memuat berkas `LICENSE` maupun catatan pengujian lintas peramban, sehingga klaim legalitas dan kompatibilitas masih terbuka.

---

© 2026 PT. Sainskerta Solusi Nusantara · hello@sainskerta.id · sainskerta.net
