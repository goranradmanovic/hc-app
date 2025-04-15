// Function for create patients list
function createAsidePatientsList(containerId, patients) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const ul = document.createElement("ul");
    ul.className = 'patient-list';
    
    patients.forEach((patient, index) => {
        const li = document.createElement("li");
        
        if (index === 0) {
            li.className = "active";
        }

        li.addEventListener('click', function(event) {
            removeActiveClass();
            removeOldResults();
            removeDiagnosticInfo();

            li.className = "active";
            updatePatientDetails(patient);
        });

        const img = document.createElement("img");
        img.src = patient.profile_picture;
        img.alt = patient.name;
        
        const infoDiv = document.createElement("div");
        infoDiv.className = "patient-info";
        
        const nameSpan = document.createElement("span");
        nameSpan.className = "name";
        nameSpan.textContent = patient.name;
        
        const detailsSpan = document.createElement("span");
        detailsSpan.className = "details";
        detailsSpan.textContent = `${patient.gender}, ${patient.age}`;
        
        infoDiv.appendChild(nameSpan);
        infoDiv.appendChild(detailsSpan);
        
        const optionsSpan = document.createElement("span");
        const imgIcon = document.createElement("img");
        imgIcon.src = './assets/images/more_horiz.svg';
        imgIcon.alt = 'More Horizontal';
        optionsSpan.className = "options-icon";
        optionsSpan.appendChild(imgIcon);
        
        li.appendChild(img);
        li.appendChild(infoDiv);
        li.appendChild(optionsSpan);
        
        ul.appendChild(li);
    });
    
    container.appendChild(ul);
}

function removeActiveClass() {
    // Get all li with inside the ul container
    const lis = document.querySelectorAll("ul.patient-list > li.active");

    // Loop through the lis and add the active class to the current/clicked button
    for (let i = 0; i < lis.length; i++) {
        if (lis[i].classList.contains('active')) {
            lis[i].classList.remove('active');
        }
    }
}