# Struktur Susunan HTML & Tag `<div>` Modul ADAS

Bagi mengelakkan isu struktur *layout* (seperti tab terkeluar dari grid atau teranjak ke bawah) berlaku lagi pada masa akan datang, berikut merupakan panduan struktur blok HTML utama bagi projek **SmartLine QR Rover (Modul ADAS)** ini.

## 1. Konsep SPA (Single Page Application)
Keseluruhan aplikasi berjalan di dalam satu fail sahaja iaitu `index.html`. Penukaran halaman berlaku menerusi *class* `active` pada `<section>` yang dikawal oleh butang di `sidebar`.

## 2. Struktur Pokok Utama (Root Structure)
```html
<body>
  <div class="app-container">
     
     <!-- 1. Header Global -->
     <header class="top-nav">...</header>

     <!-- 2. Kotak Utama Aplikasi -->
     <div class="app-layout">
        
        <!-- A. Menu Navigasi Tepi -->
        <aside class="sidebar">...</aside>
        
        <!-- B. Ruangan Paparan Utama -->
        <main class="main-content">
           
           <!-- TAB 1: Simulator -->
           <section id="tab-simulator" class="tab-panel active">
              ... kandungan ...
           </section>
           
           <!-- TAB 2: Teori -->
           <section id="tab-teori" class="tab-panel">
              ... kandungan ...
           </section>

           <!-- TAB 3: Rajah Pendawaian -->
           <section id="tab-wiring" class="tab-panel">
              ... kandungan ...
           </section>

           <!-- TAB 4: Buku Log Diagnostik -->
           <section id="tab-jobcard" class="tab-panel">
              ... kandungan ...
           </section>

           <!-- TAB 5: Kuiz Penilaian Kendiri -->
           <section id="tab-kuiz" class="tab-panel">
              ... kandungan ...
           </section>

           <!-- TAB 6: Glosari Automotif Pintar -->
           <section id="tab-glosari" class="tab-panel">
              ... kandungan ...
           </section>

        </main> <!-- Penutup B -->
     </div> <!-- Penutup 2 -->
  </div> <!-- Penutup 1 -->
</body>
```

## 3. Punca Ralat (Tab Terkeluar)
Ralat yang berlaku sebentar tadi (kandungan Jobcard/Kuiz turun ke bawah) adalah berpunca daripada **Tag Penutup `</div>` Yang Berlebihan** di dalam blok `<section id="tab-wiring">`.

- Apabila terdapat *extra* `</div>` di dalam sesuatu `<section>`, pelayar (browser) secara automatik akan menganggap ia bertujuan untuk menutup `<main class="main-content">` atau `<div class="app-layout">`.
- Ini menyebabkan blok `<section>` yang berada di bahagian bawah (Jobcard, Kuiz, Glosari) tercampak **keluar** daripada kotak pembungkus utama, lantas di-render (dilukis) di hujung/bawah halaman skrin tanpa mengikut susunan CSS asal.

## 4. Peraturan Menulis atau Mengubah (Edit) Kod
1. **Gunakan IDE (VS Code)**: Sentiasa pasang *extension* seperti **Highlight Matching Tag** atau **Auto Close Tag** supaya jelas di mana pasangannya.
2. **Kekalkan Identasi (Indentation)**: Setiap anak (child) tag perlu masuk 1 tab ke dalam supaya jika tertinggal penutup, ia senang dikesan.
3. **Kiraan Tag Penutup**:
   - Jika anda membuang satu `<div>`, **wajib** buang satu `</div>` yang sepadan.
   - Jika membuat script janaan dinamik (Javascript *replace*), kira jumlah pembuka dan penutup.
4. Jangan meletakkan sebarang kod HTML di luar penutup `<main class="main-content">`.
