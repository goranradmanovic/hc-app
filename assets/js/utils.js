// --- Fetch Data ---
async function fetchPatientData() {
    // API Endpoint and Credentials
    const apiUrl = '../../data/patients.json';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            // Handle HTTP errors
            throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }

        const patients = await response.json();

        createAsidePatientsList("patient-list", patients);
        updatePatientDetails(patients[0]);
    } catch (error) {
        console.error('Error fetching or processing patient data:', error);
        updateText('.content-center > h2', 'Error loading data');
    }
}