// Update Patients Diagnosis History
function updateDiagnosisHistory(patientData) {
    updateText('.content-center h2', `${patientData.name}'s Diagnosis History`);

    if (!patientData.diagnosis_history?.length) {
        console.warn("No diagnosis history found for", patientData.name);
        return createOrUpdateChart(); // Create chart with default static data
    }

    const latestDiagnosis = patientData.diagnosis_history[0];

    // Update BP Values
    if (latestDiagnosis.blood_pressure) {
        const { systolic, diastolic } = latestDiagnosis.blood_pressure;

        updateText('.chart-legend .systolic-value', systolic?.value ?? 'N/A');
        updateText('.chart-legend .diastolic-value', diastolic?.value ?? 'N/A');

        updateTrendIcon('.chart-legend .systolic-trend', systolic?.levels);
        updateTrendIcon('.chart-legend .diastolic-trend', diastolic?.levels);
    }

    // Update Info Cards
    updateCardInfo('.info-card.respiratory', latestDiagnosis.respiratory_rate, 'bpm');
    updateCardInfo('.info-card.temperature', latestDiagnosis.temperature, '°F');
    updateCardInfo('.info-card.heart-rate', latestDiagnosis.heart_rate, 'bpm', true);

    // Update Chart with historical data
    createOrUpdateChart(patientData.diagnosis_history);
}

// Helper function to update trend icons
function updateTrendIcon(selector, trend) {
    const trendElement = document.querySelector(selector);
    if (!trendElement) return;

    trendElement.textContent = trend ?? '';

    if (trend) {
        const icon = document.createElement('i');
        icon.setAttribute('aria-hidden', true);
        icon.className = trend.includes('Lower') ? 'fa fa-caret-down' : 'fa fa-caret-up';
        trendElement.prepend(icon);
    }
}

// Helper function to update info cards
function updateCardInfo(selector, data, unit = '', addIcon = false) {
    const card = document.querySelector(selector);
    if (!card || !data) return;

    updateText(`${selector} .card-value`, `${data.value ?? 'N/A'} ${unit}`);
    updateText(`${selector} .card-status`, data.levels ?? 'N/A');

    if (addIcon) {
        const statusElement = document.querySelector(`${selector} .card-status`);
        if (statusElement) {
            const icon = document.createElement('i');
            icon.setAttribute('aria-hidden', true);
            icon.className = data.levels?.includes('Lower') ? 'fa fa-caret-down' : 'fa fa-caret-up';
            statusElement.prepend(icon);
        }
    }
}