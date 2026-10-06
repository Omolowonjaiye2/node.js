const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));   

//app.use('/', require('./routes/roots'));


app.use('/api/employees', require('./routes/api/employees.js'));

app.use('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));









// NaijaCart is a modern Nigerian e-commerce website designed to provide a smooth online shopping experience. I developed the frontend using React ,JavaScript, HTML, CSS, with a responsive layout optimized for mobile, tablet and desktop devices. The project includes project browsing, product details, shopping cart functionality, wishlist features and a clean user interface. I focused on reusable react components, responsive design, intuitive navigation and a polished shopping experience.