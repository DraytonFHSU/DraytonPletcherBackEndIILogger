const button = document.getElementById('button');
const form = document.getElementById('form');

function logger(action) {
    fetch('http://localhost:3000/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action, timestamp: new Date().toISOString() })
    })
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(error => console.error('Error logging event:', error));
}

button.addEventListener('click', () => logger('Button clicked'));

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
    logger('Form submitted');
    form.reset(); // Reset form after submission
});
