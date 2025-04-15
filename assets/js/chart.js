// --- Create or Update Chart ---
// Takes diagnosis history (optional)
function createOrUpdateChart(diagnosisHistory = []) {
    const ctx = document.getElementById('bloodPressureChart')?.getContext('2d');
    
    if (!ctx) {
        console.error('Canvas element for chart not found!');
        return;
    }

    // Static Data based on the image (Oct 2023 - Mar 2024) - Default data
    // Correcting the apparent typo in the image (Nov/Dec 2025 -> 2023) - Default data
    let labels = ["Oct, 2023", "Nov, 2023", "Dec, 2023", "Jan, 2024", "Feb, 2024", "Mar, 2024"], // Default data
        systolicData = [165, 160, 170, 155, 168, 160], // Default data
        diastolicData = [82, 75, 80, 72, 85, 78];   // Default data

    // --- Dynamic Data Processing
    if (diagnosisHistory && diagnosisHistory.length > 0) {
        // Sort history if necessary (e.g., by date)
        diagnosisHistory.sort((a, b) => new Date(a.month + ' 1, ' + a.year) - new Date(b.month + ' 1, ' + b.year));
        labels = diagnosisHistory.map(entry => `${entry.month.substring(0, 3)}, ${entry.year}`);
        systolicData = diagnosisHistory.map(entry => entry.blood_pressure?.systolic?.value);
        diastolicData = diagnosisHistory.map(entry => entry.blood_pressure?.diastolic?.value);
    }

    const chartData = {
        labels: getLastItems(labels, -6),
        datasets: [
            {
                label: 'Systolic',
                data: getLastItems(systolicData, -6),
                borderColor: '#E66FF4', // Use actual color or CSS Var if possible
                backgroundColor: '#E66FF4', // Point color
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: false,
                tension: 0.5, // Slight curve
                borderWidth: 2,
            },
            {
                label: 'Diastolic',
                data: getLastItems(diastolicData, -6),
                borderColor: '#705AAA', // Use actual color or CSS Var
                backgroundColor: '#705AAA', // Point color
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: false,
                tension: 0.5, // Slight curve
                borderWidth: 2,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Allows height/width control via CSS container
        scales: {
            y: {
                beginAtZero: false, // Don't necessarily start at 0
                min: 60,          // Set min based on data range visible
                max: 200,         // Set max based on data range visible
                ticks: {
                    stepSize: 20, // Control Y-axis tick increments
                    color: 'var(--unnamed-color-072635)', // Use CSS var for tick color
                    font: {
                        family: 'var(--unnamed-font-family-manrope)', // Use CSS var for font
                    }
                },
                grid: {
                    color: '#999', // Use CSS var for grid line color
                    drawBorder: false,
                }
            },
            x: {
                ticks: {
                    color: 'var(--unnamed-color-072635)', // Use CSS var for tick color
                    font: {
                        family: 'var(--unnamed-font-family-manrope)', // Use CSS var for font
                    }
                },
                grid: {
                    display: false, // Hide vertical grid lines as per image
                }
            }
        },
        plugins: {
            legend: {
                display: true, // Hide default legend, use custom HTML one
                labels: {
                    font: {
                        size: 13
                    }
                }
            },
            tooltip: {
                enabled: true // Enable tooltips on hover
            }
        },
        animation: {
            duration: 400 // Add a subtle animation
        }
    };

    // Destroy previous chart instance if it exists before creating a new one
    if(Chart.getChart('bloodPressureChart')) {
        Chart.getChart('bloodPressureChart')?.destroy()
    }

    // Create the new chart instance
    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions
    });
}