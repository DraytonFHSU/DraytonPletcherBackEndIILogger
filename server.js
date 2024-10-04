const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); 

const app = express();
const PORT = 3000;

let logs = [];

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/log', (req, res) => {
    const { action, timestamp } = req.body;
    logs.push({ action, timestamp });
    res.json({ message: 'Event logged successfully' });
});

setInterval(() => {
    if (logs.length > 0) {
        console.log('Batch log summary:', logs);
        logs = []; // Clear logs after processing
    }
}, 120); // 2 minutes

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

