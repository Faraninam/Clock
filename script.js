let is24Hour = true;

function pad(num) {
    return num.toString().padStart(2, '0');
}

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let ampm = '';

    if (!is24Hour) {
        ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12
    }

    document.getElementById('hours').textContent = pad(hours);
    document.getElementById('minutes').textContent = pad(now.getMinutes());
    document.getElementById('seconds').textContent = pad(now.getSeconds());

    // Show or update AM/PM
    let ampmSpan = document.getElementById('ampm');
    if (!ampmSpan) {
        ampmSpan = document.createElement('span');
        ampmSpan.id = 'ampm';
        ampmSpan.style.fontSize = '1.5rem';
        ampmSpan.style.marginLeft = '16px';
        document.getElementById('clock').appendChild(ampmSpan);
    }
    ampmSpan.textContent = is24Hour ? '' : ampm;

    // Update date and weekday
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    document.getElementById('weekday').textContent = weekdays[now.getDay()];
    document.getElementById('date').textContent =
        pad(now.getDate()) + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();
}

document.getElementById('toggleFormat').addEventListener('click', function () {
    is24Hour = !is24Hour;
    this.textContent = is24Hour ? 'Switch to 12-hour' : 'Switch to 24-hour';
    updateClock();
});

setInterval(updateClock, 1000);
updateClock();