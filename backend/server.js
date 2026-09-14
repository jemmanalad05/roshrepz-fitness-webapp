const express = require('express');
const app = express();
const port = 3000;

// Connects to port: 3000
app.listen(port, () => {
    console.log(`Server connected to port ${port}.`)
});

app.get('/', (req,res) => {
    res.send('Welcome to RoshRepz Fitness');
    console.log('Navigated to /')
    
})
