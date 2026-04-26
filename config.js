// config.js - Konfigurasi API Google Spreadsheet
// Ganti dengan URL Google Apps Script Anda!

// ========== KONFIGURASI API ==========
const API_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxx/exec'; // Ganti dengan URL Anda!

// ========== ENDPOINTS ==========
const ENDPOINTS = {
    users: `${API_SCRIPT_URL}?sheet=users`,
    alat: `${API_SCRIPT_URL}?sheet=alat_kalibrasi`,
    riwayat: `${API_SCRIPT_URL}?sheet=riwayat_kalibrasi`,
    update: API_SCRIPT_URL // untuk POST request
};

// ========== KONFIGURASI APLIKASI ==========
const WARNING_DAYS = 7;
const CHECK_INTERVAL = 3600000; // 1 jam

// ========== FUNGSI GLOBAL ==========
function daysUntil(dateStr) {
    if (!dateStr) return Infinity;
    const due = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    const diffTime = due - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getStatusAlat(dueDate) {
    const days = daysUntil(dueDate);
    if (days < 0) return { status: 'Expired', color: 'danger', icon: 'fa-times-circle' };
    if (days <= WARNING_DAYS) return { status: 'Warning', color: 'warning', icon: 'fa-exclamation-triangle' };
    return { status: 'Valid', color: 'success', icon: 'fa-check-circle' };
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Ekspor ke global
if (typeof window !== 'undefined') {
    window.API_SCRIPT_URL = API_SCRIPT_URL;
    window.ENDPOINTS = ENDPOINTS;
    window.WARNING_DAYS = WARNING_DAYS;
    window.daysUntil = daysUntil;
    window.getStatusAlat = getStatusAlat;
    window.formatDate = formatDate;
}
