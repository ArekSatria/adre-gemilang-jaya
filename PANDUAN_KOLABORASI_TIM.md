# 🤝 Panduan Kolaborasi Tim: Frontend vs Backend & CMS
**Portal PT Adre Gemilang Jaya**

Dokumen ini disusun sebagai panduan kerja sama agar pengerjaan antara **Frontend Developer (Arek)** dan **Backend & CMS Developer (Anda)** terstruktur rapi, tidak saling bertubrukan (*merge conflict*), dan mudah saat melakukan pengembangan.

---

## 📌 1. Pembagian Peran & Tanggung Jawab (Jobdesk)

| Anggota Tim | Peran | Fokus Utama |
| :--- | :--- | :--- |
| **Arek** | **Frontend Developer** | Desain antarmuka (UI/UX), komponen halaman publik, animasi, responsivitas mobile, styling Tailwind CSS, dan visual website yang dilihat oleh pengunjung/penggemar. |
| **Anda** | **Backend & CMS Developer** | Panel admin CMS (`/admin`), REST API (`/api/v1`), integrasi Database Neon PostgreSQL (`Prisma`), upload file, keamanan autentikasi, serta sinkronisasi data dinamis ke frontend. |

---

## 📂 2. Peta Folder & Hak Akses Pengerjaan

Struktur proyek ini adalah **Fullstack Next.js**, di mana seluruh kode berada dalam satu repositori namun dipisahkan secara tegas berdasarkan fungsinya:

```text
Webad/
├── src/
│   ├── app/
│   │   ├── (Halaman Publik) ──────────> [AREK - FRONTEND]
│   │   │   ├── page.tsx                 (Halaman Beranda)
│   │   │   ├── about/page.tsx           (Halaman Tentang Kami)
│   │   │   ├── matches/page.tsx         (Halaman Pertandingan)
│   │   │   ├── teams/page.tsx           (Halaman Katalog Divisi)
│   │   │   ├── teams/[slug]/page.tsx    (Halaman Detail Roster Divisi)
│   │   │   ├── news/page.tsx            (Halaman Berita & Kegiatan)
│   │   │   ├── news/[slug]/page.tsx     (Halaman Baca Berita)
│   │   │   └── partners/page.tsx        (Halaman Mitra & Sponsor)
│   │   │
│   │   ├── admin/ ────────────────────> [ANDA - BACKEND & CMS]
│   │   │   ├── page.tsx                 (Dashboard CMS)
│   │   │   ├── company/                 (Kelola Profil Perusahaan, Visi, Misi, Linimasa)
│   │   │   ├── teams/                   (Kelola Divisi, Tambah Divisi, Roster Atlet)
│   │   │   ├── matches/                 (Kelola Jadwal & Skor Pertandingan)
│   │   │   ├── news/                    (Kelola & Tulis Artikel Berita)
│   │   │   ├── partners/                (Kelola Sponsor & Mitra Resmi)
│   │   │   ├── settings/                (Pengaturan Global & Foto Bersama Skuad)
│   │   │   └── login/                   (Halaman Login Admin)
│   │   │
│   │   └── api/ ──────────────────────> [ANDA - BACKEND & API]
│   │       ├── v1/                      (Endpoint API: company, teams, matches, news, upload, dll.)
│   │       └── auth/                    (API Login & Logout Session)
│   │
│   ├── components/
│   │   ├── sections/ ─────────────────> [AREK - TAMPILAN HALAMAN UTAMA]
│   │   │   ├── HomeBentoView.tsx        (Tata letak visual Beranda)
│   │   │   ├── AboutView.tsx            (Tata letak Visi, Misi, Perjalanan Kami)
│   │   │   ├── MatchesView.tsx          (Tampilan filter jadwal & skor pertandingan)
│   │   │   ├── TeamsCatalogView.tsx     (Tampilan kartu-kartu divisi 2:1)
│   │   │   ├── DivisionDetailView.tsx   (Tampilan skuad roster pemain & pelatih)
│   │   │   ├── NewsCatalogView.tsx      (Tampilan grid kartu berita)
│   │   │   └── PartnersView.tsx         (Tampilan grid mitra & sponsor)
│   │   │
│   │   └── ui/ ───────────────────────> [AREK - KOMPONEN REUSABLE]
│   │       ├── SectionHeading.tsx       (Judul seksi halaman)
│   │       ├── BrandElements.tsx        (Elemen logo & grafis)
│   │       └── LanguageSwitcher.tsx     (Tombol ganti bahasa ID/EN)
│   │
│   ├── lib/
│   │   ├── db.ts ─────────────────────> [ANDA - KONEKSI DATABASE PRISMA]
│   │   ├── auth.ts ───────────────────> [ANDA - AUTENTIKASI ADMIN]
│   │   ├── schemas/ ──────────────────> [BERSAMA - KONTRAK DATA ZOD / TYPES]
│   │   └── utils/ ────────────────────> [BERSAMA - HELPER UTILITIES]
│   │
│   └── public/
│       ├── images/ ───────────────────> [AREK - ASET GAMBAR STATIS & LOGO]
│       └── uploads/ ──────────────────> [OTOMATIS DARI CMS KETIKA UPLOAD]
│
└── prisma/
    └── schema.prisma ─────────────────> [ANDA - STRUKTUR TABEL DATABASE NEON]
```

---

## 🔄 3. Bagaimana Frontend dan Backend Saling Terhubung?

1. **Penginputan Data (Sisi Anda)**:
   - Anda membuka CMS di browser: `http://localhost:3000/admin`.
   - Anda menambahkan divisi baru, anggota roster, mengubah visi misi, atau mengganti foto bersama skuad.
   - Data otomatis tersimpan ke Neon PostgreSQL via Prisma.

2. **Penyajian Data ke Komponen (Sisi Arek)**:
   - Komponen tampilan Arek di folder `src/components/sections/` menerima data dinamis melalui **Props**.
   - Contoh di `AboutView({ company })`:
     - Arek cukup menggunakan data `company.vision`, `company.missions`, dan `company.milestones`.
     - Arek bebas mempercantik card, mengganti font, mengatur animasi hover, atau warna Tailwind tanpa perlu khawatir merusak database atau logika backend.

---

## 🌿 4. Panduan Kerja Sama Menggunakan Git

Agar pengerjaan tidak bertabrakan saat melakukan *push* dan *pull*:

### A. Buat Branch Terpisah
- **Branch Utama**: `main` (hanya untuk versi stabil yang siap dipakai).
- **Branch Arek**: `frontend/ui-revamp`
  ```bash
  git checkout -b frontend/ui-revamp
  ```
- **Branch Anda**: `backend/cms-features`
  ```bash
  git checkout -b backend/cms-features
  ```

### B. Aturan Emas Kolaborasi
1. **Arek**:
   - Bebas mengubah file di `src/components/sections/*`, `src/components/ui/*`, dan file CSS.
   - Jangan mengubah file di folder `src/app/admin/*`, `src/app/api/*`, dan `prisma/*`.
2. **Anda**:
   - Bebas mengelola folder `src/app/admin/*`, `src/app/api/*`, dan `prisma/*`.
   - Jika perlu menambahkan data baru ke komponen Arek, komunikasikan properti baru apa yang ditambahkan.
3. **Berkas `.env`**:
   - File `.env` berisi `DATABASE_URL` dan `NEXTAUTH_SECRET`. Jangan pernah melakukan *commit* file `.env` ke GitHub publik.

---

## 🚀 5. Cara Menjalankan Project di Laptop Arek & Anda

Untuk menjalankan aplikasi di laptop lokal masing-masing:

```bash
# 1. Pastikan dependensi terpasang
npm install

# 2. Jalankan server lokal
npm run dev
```

Website akan berjalan di:
- **Tampilan Website Publik**: `http://localhost:3000`
- **Panel CMS Admin**: `http://localhost:3000/admin`

