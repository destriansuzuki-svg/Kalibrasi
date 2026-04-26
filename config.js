// config.js - Konfigurasi Global Aplikasi
// Ganti dengan URL API Google Spreadsheet Anda

// ========== KONFIGURASI GOOGLE SHEETS ==========
// Cara 1: Menggunakan SheetDB.io (Rekomendasi untuk pemula)
// Daftar di https://sheetdb.io/ - free 200 request/bulan
const API_BASE_URL = 'https://sheetdb.io/api/v1/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

// Cara 2: Menggunakan Google Apps Script (Lebih flexible)
// const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxx/exec';

// ========== ENDPOINTS ==========
const ENDPOINTS = {
    users: `${API_BASE_URL}?sheet=users`,
    alat: `${API_BASE_URL}?sheet=alat_kalibrasi`,
    riwayat: `${API_BASE_URL}?sheet=riwayat_kalibrasi`
};

// ========== KONFIGURASI NOTIFIKASI ==========
// Daftar email penerima notifikasi (pisah dengan koma)
const NOTIFICATION_EMAILS = 'supervisor@suzuki.co.id,manager@suzuki.co.id';

// Batas hari untuk peringatan
const WARNING_DAYS = 7;

// Interval pengecekan otomatis (dalam milidetik) - default 1 jam
const CHECK_INTERVAL = 3600000;

// ========== FUNGSI GLOBAL ==========
// Fungsi hitung hari
function daysUntil(dateStr) {
    if (!dateStr) return Infinity;
    const due = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    const diffTime = due - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Fungsi dapatkan status alat
function getStatusAlat(dueDate) {
    const days = daysUntil(dueDate);
    if (days < 0) return { status: 'Expired', color: 'danger', icon: 'fa-times-circle' };
    if (days <= WARNING_DAYS) return { status: 'Warning', color: 'warning', icon: 'fa-exclamation-triangle' };
    return { status: 'Valid', color: 'success', icon: 'fa-check-circle' };
}

// Fungsi format tanggal Indonesia
function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Ekspor ke window global
if (typeof window !== 'undefined') {
    window.API_BASE_URL = API_BASE_URL;
    window.ENDPOINTS = ENDPOINTS;
    window.NOTIFICATION_EMAILS = NOTIFICATION_EMAILS;
    window.WARNING_DAYS = WARNING_DAYS;
    window.CHECK_INTERVAL = CHECK_INTERVAL;
    window.daysUntil = daysUntil;
    window.getStatusAlat = getStatusAlat;
    window.formatDate = formatDate;
}
