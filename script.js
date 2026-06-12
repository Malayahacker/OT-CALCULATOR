// Ambil elemen DOM dari HTML
const grossInput = document.getElementById('grossSalary');
const rateSelect = document.getElementById('otRate');
const hoursInput = document.getElementById('otHours');
const hoursHelpText = document.getElementById('hoursHelpText');

const hourlyRateDisplay = document.getElementById('hourlyRate');
const appliedRateDisplay = document.getElementById('appliedRate');
const totalOTDisplay = document.getElementById('totalOT');

const themeToggle = document.getElementById('themeToggle');

// --- Logik Pengurusan Dark Mode (Apple UI Transitions) ---
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙'; // Ikon Apple Sleep Mode
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️'; // Ikon Apple Wake Mode
    }
});

// --- Logik Pengiraan OT ---
function handleRateChange() {
    const selectedOption = rateSelect.options[rateSelect.selectedIndex];
    const defaultHours = selectedOption.getAttribute('data-default-hours');
    
    if (defaultHours) {
        hoursInput.value = defaultHours;
    }
    
    hoursHelpText.textContent = `Default auto: ${defaultHours} jam (Boleh diubah jika perlu).`;
    calculateOT();
}

function calculateOT() {
    const grossSalary = parseFloat(grossInput.value) || 0;
    const otRate = parseFloat(rateSelect.value) || 1.5;
    const otHours = parseFloat(hoursInput.value) || 0;

    // Formula Ikut Ketepatan Gambar Kalkulator Apple Anda
    const baseHourlyRate = grossSalary / 26 / 8;
    const rateHourlyRate = baseHourlyRate * otRate;
    const totalOT = rateHourlyRate * otHours;

    // Papar hasil pada skrin dengan format mata wang kemas
    hourlyRateDisplay.textContent = `RM ${baseHourlyRate.toFixed(2)}`;
    appliedRateDisplay.textContent = `${otRate.toFixed(1)}x (RM ${rateHourlyRate.toFixed(4)}/jam)`;
    totalOTDisplay.textContent = `RM ${totalOT.toFixed(2)}`;
}

// Pasang event listener untuk sistem live-update
grossInput.addEventListener('input', calculateOT);
rateSelect.addEventListener('change', handleRateChange);
hoursInput.addEventListener('input', calculateOT);

// Jalankan tetapan permulaan sistem sebaik sahaja halaman dimuatkan
handleRateChange();