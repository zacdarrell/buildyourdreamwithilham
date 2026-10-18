document.addEventListener("DOMContentLoaded", () => {
    const burgerToggle = document.getElementById("burgerToggle");
    const navLinks = document.getElementById("navLinks");
    const produkDropdown = document.getElementById("produkDropdown");
    const dropdownContainer = document.querySelector(".dropdown-container");
    const iconArrow = document.querySelector(".icon-arrow");

    // 1. Logika Klik Burger Menu (Buka / Tutup Drawer)
    burgerToggle.addEventListener("click", () => {
        burgerToggle.classList.toggle("open");
        navLinks.classList.toggle("show");
    });

    // 2. Logika Accordion Dropdown Produk Khusus Tampilan Mobile
    produkDropdown.addEventListener("click", (e) => {
        // Hanya berjalan jika ukuran layar di bawah desktop (991px)
        if (window.innerWidth <= 991) {
            e.preventDefault(); // Menghentikan fungsi link bawaan
            dropdownContainer.classList.toggle("expand");
            iconArrow.classList.toggle("rotate");
        }
    });

    // 3. Reset otomatis saat orientasi layar berubah atau di-resize ke Desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 991) {
            // Bersihkan semua class mobile agar tidak bentrok dengan desktop CSS
            burgerToggle.classList.remove("open");
            navLinks.classList.remove("show");
            dropdownContainer.classList.remove("expand");
            iconArrow.classList.remove("rotate");
        }
    });
});


const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
const slideIntervalTime = 4000; // Durasi per gambar tampil (4000ms = 4 detik)
let slideInterval;

// Fungsi untuk mengganti slide
function nextSlide() {
    // Hapus kelas 'active' dari gambar dan titik yang sedang aktif
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    // Pindah ke indeks berikutnya, jika sudah di ujung (slide ke-8) akan kembali ke 0
    currentSlide = (currentSlide + 1) % slides.length;

    // Tambahkan kelas 'active' ke gambar dan titik yang baru
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}

// Fungsi untuk memulai jalannya slider otomatis
function startSlideShow() {
    slideInterval = setInterval(nextSlide, slideIntervalTime);
}

// Fitur Tambahan opsional: Mengubah gambar secara manual saat titik (dot) diklik
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        // Hentikan interval sementara agar waktu pergantian tidak berantakan
        clearInterval(slideInterval);
        
        // Hapus kelas aktif lama
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");

        // Setel indeks ke titik yang diklik
        currentSlide = index;

        // Aktifkan slide pilihan
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");

        // Jalankan kembali slider otomatis
        startSlideShow();
    });
});

// Jalankan slider otomatis pertama kali saat halaman dimuat
startSlideShow();


document.addEventListener("DOMContentLoaded", () => {
    const creditForm = document.getElementById("creditForm");

    if (creditForm) {
        creditForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Mencegah reload halaman bawaan form submit

            // 1. Ambil Nilai dari Masing-Masing Field Input
            const nama = document.getElementById("nama").value.trim();
            const tipeMobil = document.getElementById("tipeMobil").value;
            const rencanaDpRaw = document.getElementById("rencanaDp").value;
            const tenor = document.getElementById("tenor").value;
            const domisili = document.getElementById("domisili").value.trim();

            // 2. Format Angka Uang Muka (DP) agar Enak Dibaca (Contoh: 100.000.000)
            const rencanaDpFormatted = new Intl.NumberFormat('id-ID').format(rencanaDpRaw);

            // 3. Susun Teks Pesan Template WhatsApp yang Rapi & Profesional
            let pesanText = `*Formulir Simulasi Kredit Mobil BYD*\n\n`;
            pesanText += `• *Nama Lengkap :* ${nama}\n`;
            pesanText += `• *Tipe & Harga Mobil :* ${tipeMobil}\n`;
            pesanText += `• *Rencana DP :* Rp ${rencanaDpFormatted}\n`;
            pesanText += `• *Tenor Jangka Waktu :* ${tenor}\n`;
            pesanText += `• *Domisili Anda :* ${domisili}\n\n`;
            pesanText += `Halo Sales Executive BYD, mohon buatkan perhitungan angsuran terbaik untuk data simulasi di atas. Terima kasih!`;

            // 4. Lakukan Konversi Karakter Pesan ke Format URL (URL Encode)
            const pesanEncoded = encodeURIComponent(pesanText);

            // 5. Deklarasikan Nomor Target WA (Format tanpa tanda plus atau angka nol didepan)
            const nomorWa = "6289522325077";

            // 6. Satukan Menjadi Link API WhatsApp Lengkap
            const urlWhatsapp = `https://wa.me/6289522325077?text=${pesanEncoded}`;

            // 7. Buka Jendela/Tab Baru Browser untuk Mengarah ke Aplikasi WhatsApp
            window.open(urlWhatsapp, '_blank');
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const tradeForm = document.getElementById("tradeForm");

    if (tradeForm) {
        tradeForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Mencegah form reload halaman otomatis

            // 1. Ambil Nilai dari Input Formulir Trade In
            const nama = document.getElementById("tradeNama").value.trim();
            const mobilLama = document.getElementById("mobilLama").value.trim();
            const tahunMobil = document.getElementById("tahunMobil").value;
            const kmMobil = document.getElementById("kmMobil").value.trim();
            const domisili = document.getElementById("tradeDomisili").value.trim();
            const unitBydBaru = document.getElementById("unitBydBaru").value;

            // 2. Susun Struktur Pesan WhatsApp yang Rapi & Detail
            let pesanTradeText = `*Pengajuan Program Trade-In (Tukar Tambah) BYD*\n\n`;
            pesanTradeText += `• *Nama Konsumen :* ${nama}\n`;
            pesanTradeText += `• *Domisili Wilayah :* ${domisili}\n\n`;
            pesanTradeText += `*Data Kendaraan Lama:*\n`;
            pesanTradeText += `• *Mobil Lama :* ${mobilLama}\n`;
            pesanTradeText += `• *Tahun Kendaraan :* ${tahunMobil}\n`;
            pesanTradeText += `• *Odometer (KM) :* ${kmMobil}\n\n`;
            pesanTradeText += `*Unit Impian Baru:*\n`;
            pesanTradeText += `• *Model BYD Diincar :* ${unitBydBaru}\n\n`;
            pesanTradeText += `Halo Sales Executive BYD, saya berencana melakukan tukar tambah mobil lama saya dengan unit BYD baru di atas. Mohon info proses estimasi appraisal unitnya.`;

            // 3. Konversi Karakter Pesan ke Format URL (URL Encode)
            const pesanTradeEncoded = encodeURIComponent(pesanTradeText);

            // 4. Set Nomor Tujuan WhatsApp Sales (6289522325077)
            const nomorWaSales = "6289522325077";

            // 5. Integrasikan ke Tautan Link API WhatsApp Resmi
            const urlTradeWhatsapp = `https://wa.me/6289522325077?text=${pesanTradeEncoded}`;

            // 6. Buka Aplikasi WhatsApp di Tab Baru
            window.open(urlTradeWhatsapp, '_blank');
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const testDriveForm = document.getElementById("testDriveForm");

    if (testDriveForm) {
        testDriveForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Mencegah form melakukan reload halaman otomatis

            // 1. Ambil Nilai dari Input Formulir Test Drive
            const nama = document.getElementById("tdNama").value.trim();
            const unit = document.getElementById("tdUnit").value;
            const jam = document.getElementById("tdJam").value.trim();
            const alamat = document.getElementById("tdAlamat").value.trim();

            // 2. Susun Struktur Pesan WhatsApp Booking Resmi
            let pesanTdText = `*Formulir Pengajuan Test Drive Mobil BYD*\n\n`;
            pesanTdText += `• *Nama Calon Konsumen :* ${nama}\n`;
            pesanTdText += `• *Unit Mobil Pilihan :* ${unit}\n`;
            pesanTdText += `• *Rencana Waktu & Jam :* ${jam}\n`;
            pesanTdText += `• *Alamat Lokasi / Rumah :* ${alamat}\n\n`;
            pesanTdText += `Halo Sales Executive BYD, saya ingin mengajukan jadwal uji kendara (test drive) sesuai data di atas. Mohon konfirmasi kesediaan unit dan waktunya. Terima kasih!`;

            // 3. Konversi Karakter Pesan ke Format URL (URL Encode)
            const pesanTdEncoded = encodeURIComponent(pesanTdText);

            // 4. Nomor Target WA Sales Representative (6289522325077)
            const nomorWaSalesTd = "6289522325077";

            // 5. Integrasikan Link API WhatsApp Resmi
            const urlTdWhatsapp = `https://wa.me/6289522325077?text=${pesanTdEncoded}`;

            // 6. Buka Tautan Link di Tab/Jendela Browser Baru
            window.open(urlTdWhatsapp, '_blank');
        });
    }
});