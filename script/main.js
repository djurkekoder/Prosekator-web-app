// Available colors for subjects
var availableColors = [
    "#B4D63D", 
    "#00F5FF", 
    "#FF007F", 
    "#ADFF2F", 
    "#FFD700", 
    "#FF5E00", 
    "#00FF00", 
    "#9400D3",
    "#00BFFF", 
    "#FF1493", 
    "#39FF14",
    "#CCFF00", 
    "#FF3131", 
    "#1F51FF", 
    "#BC13FE", 
    "#0FF0FC", 
    "#7FFF00", 
    "#FF00FF", 
    "#4D4DFF", 
    "#FFFF33", 
    "#08FF08", 
    "#FF6EC7", 
    "#00E5FF", 
    "#FF9933", 
    "#B57EDC", 
    "#FFCC33", 
    "#2EEAD3", 
    "#FF44CC", 
    "#9DFF00", 
    "#66FFFF"
];

let subjects = [];

// Logics for adding subjects
document.getElementById('addSubjectBtn').addEventListener('click', function() {
    const input = document.getElementById('subjectName');
    const name = input.value.trim();
    const tooltip = input.parentElement.querySelector('.error-tooltip');

    if (!name) {
        tooltip.classList.add('visible');
        return;
    } else {
        tooltip.classList.remove('visible');
    }

    if (availableColors.length === 0) {
        alert("Nema više dostupnih boja!");
        return;
    }

    const subjectColor = availableColors.shift();

    const newSubject = {
        id: Date.now(),
        name: name,
        grades: [],
        average: 0,
        color: subjectColor
    };

    subjects.push(newSubject);
    input.value = '';
    renderSubjects();
    calculateOverall();
});

document.getElementById('subjectName').addEventListener('input', function() {
    const tooltip = this.parentElement.querySelector('.error-tooltip');
    if(tooltip) tooltip.classList.remove('visible');
});

// Adding grades
window.addGrade = function(id) {
    const val = prompt("Unesi ocenu (1-5):");
    const grade = parseInt(val);

    if (grade >= 1 && grade <= 5) {
        const sub = subjects.find(s => s.id === id);
        sub.grades.push(grade);
        
        const sum = sub.grades.reduce((a, b) => a + b, 0);
        sub.average = sum / sub.grades.length;
        
        renderSubjects();
        calculateOverall();
    } else if (val !== null) {
        alert("Moraš uneti broj od 1 do 5!");
    }
};

// Calculating the average
function calculateOverall() {
    if (subjects.length === 0) {
        document.getElementById('finalAverage').innerText = "0.00";
        return;
    }
    
    // Prosek zaokruženih ocena svakog predmeta
    const roundedSum = subjects.reduce((acc, sub) => {
        return acc + (sub.grades.length > 0 ? Math.round(sub.average) : 0);
    }, 0);
    
    const total = roundedSum / subjects.length;
    document.getElementById('finalAverage').innerText = total.toFixed(2);
}

// Rendering subjects
function renderSubjects() {
    const container = document.getElementById('subjectsContainer');
    container.innerHTML = '';

    subjects.forEach(sub => {
        const div = document.createElement('div');
        div.className = 'subject-card';
       
        div.style.setProperty('--subject-color', sub.color);
        
        div.innerHTML = `
            <div class="subject-info">
                <h3>${sub.name}</h3>
                <div>
                    ${sub.grades.map(g => `<span class="grade-badge">${g}</span>`).join('')}
                    <button class="add-grade-btn" onclick="addGrade(${sub.id})">+</button>
                </div>
            </div>
            <div class="sub-avg-val">${sub.average > 0 ? sub.average.toFixed(2) : "---"}</div>
        `;
        container.appendChild(div);
    });
}

// Error Tooltip
document.getElementById('addSubjectBtn').addEventListener('click', function() {
    const input = document.getElementById('subjectName');
    const tooltip = input.parentElement.querySelector('.error-tooltip');
    const name = input.value.trim();

    if (!name) {
        // 1. Pokaži tooltip i zazeleni border
        tooltip.classList.add('visible');
        input.classList.add('invalid-field');

        input.focus();

        // Skloni grešku čim korisnik počne da kuca
        input.addEventListener('input', () => {
            tooltip.classList.remove('visible');
            input.classList.remove('invalid-field');
        }, { once: true });

        return;
    }
});