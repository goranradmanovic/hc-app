// Update Patients aside profile
function updatePatientProfile(patientData) {
    // -- Update Right Sidebar Details --
    updateImage('.sidebar-right .patient-photo-large', patientData.profile_picture);
    updateText('.sidebar-right h3', patientData.name);

    // Find detail items more robustly
    const detailItems = document.querySelectorAll('.sidebar-right .detail-item');

    detailItems.forEach(item => {
        const labelElement = item.querySelector('.label');

        if (labelElement) {
            const label = labelElement.textContent.trim();
            switch (label) {
                case 'Date Of Birth':
                    updateText('.value.birth', formatDate(patientData.date_of_birth));
                    break;
                case 'Gender':
                    updateImage('.gender-icon', `./assets/images/${patientData.gender.toLowerCase()}.svg`);
                    updateText('.value.gender', patientData.gender);
                    break;
                case 'Contact Info.':
                    updateText('.value.phone', patientData.phone_number);
                    break;
                case 'Emergency Contacts':
                    updateText('.value.emergency', patientData.emergency_contact);
                    break;
                case 'Insurance Provider':
                    updateText('.value.insurance', patientData.insurance_type);
                    break;
            }
        }
    });
}