const fs = require('fs');
const path = 'd:\\Mipac Tvet\\Modul ADAS\\app.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Add ldwActive and bsmActive to simState
if (!content.includes('ldwActive:')) {
    content = content.replace('aebTriggerTime: 0,', 'aebTriggerTime: 0,\n    ldwActive: false,\n    bsmActive: false,');
}

// 2. Add trigger functions
if (!content.includes('window.triggerLDW')) {
    const triggers = `
window.triggerLDW = function() {
    simState.ldwActive = !simState.ldwActive;
    const btn = document.getElementById('btn-ldw');
    if(btn) {
        if(simState.ldwActive) {
            btn.classList.remove('btn-outline');
            btn.style.backgroundColor = '#a855f7'; // Purple
            btn.style.color = 'white';
        } else {
            btn.classList.add('btn-outline');
            btn.style.backgroundColor = '';
            btn.style.color = '';
        }
    }
};

window.triggerBSM = function() {
    simState.bsmActive = !simState.bsmActive;
    const btn = document.getElementById('btn-bsm');
    if(btn) {
        if(simState.bsmActive) {
            btn.classList.remove('btn-outline');
            btn.style.backgroundColor = '#06b6d4'; // Cyan
            btn.style.color = 'black';
        } else {
            btn.classList.add('btn-outline');
            btn.style.backgroundColor = '';
            btn.style.color = '';
        }
    }
};
`;
    // append to end of file
    content += '\n' + triggers;
}

// 3. Inject visuals into drawRover
const ldwVisual = `
    // LDW Visuals
    if (simState.ldwActive) {
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        
        ctx.beginPath();
        ctx.moveTo(10, -40);
        ctx.lineTo(-60, -40);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(10, 40);
        ctx.lineTo(-60, 40);
        ctx.stroke();
        
        ctx.setLineDash([]);
        
        if (Math.random() < 0.05) {
            ctx.fillStyle = 'rgba(168, 85, 247, 0.3)';
            ctx.beginPath();
            ctx.arc(0, 0, 50, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // BSM Visuals
    if (simState.bsmActive) {
        ctx.lineWidth = 3;
        const alertL = Math.random() < 0.08;
        const alertR = Math.random() < 0.08;

        ctx.strokeStyle = alertL ? 'rgba(245, 158, 11, 0.9)' : 'rgba(6, 182, 212, 0.3)';
        ctx.beginPath();
        ctx.arc(-25, -20, 25, Math.PI, Math.PI * 1.5);
        ctx.stroke();

        ctx.strokeStyle = alertR ? 'rgba(245, 158, 11, 0.9)' : 'rgba(6, 182, 212, 0.3)';
        ctx.beginPath();
        ctx.arc(-25, 20, 25, Math.PI * 0.5, Math.PI);
        ctx.stroke();
    }
`;

if (!content.includes('// LDW Visuals')) {
    content = content.replace('ctx.restore();', ldwVisual + '\n    ctx.restore();');
}

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully added LDW and BSM visuals!');
