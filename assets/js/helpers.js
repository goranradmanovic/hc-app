// --- Helper Functions ---
// --- Function to format date string (Month Day, Year)
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // Check if dateString is valid before formatting
    const date = new Date(dateString);
    if (isNaN(date)) {
        return "Invalid Date"; // Or handle as needed
    }
    return date.toLocaleDateString('en-US', options);
}

// --- Function to update element text content safely
function updateText(selector, text) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = text ?? 'N/A'; // Use 'N/A' if text is null/undefined
    } else {
        console.warn(`Element not found for selector: ${selector}`);
    }
}

// --- Function to update image source safely
function updateImage(selector, src) {
    const element = document.querySelector(selector);
    if (element) {
        element.src = src ?? 'placeholder-default.png'; // Provide a default placeholder
        element.alt = "Patient Image"; // Update alt text if needed
    } else {
        console.warn(`Element not found for selector: ${selector}`);
    }
}

// --- Get last n items from array
function getLastItems(arr, n) {
    return arr.slice(n)
}

// --- Update Patient Details (aside profile section and patients diagnosis history) ---
function updatePatientDetails(patientData) {
    updatePatientProfile(patientData);
    createLabResultsList(patientData.lab_results);
    updateDiagnosisHistory(patientData);
    createDiagnosticTable(patientData.diagnostic_list);
}