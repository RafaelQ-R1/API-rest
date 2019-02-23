const express = require('express');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
require('./app/routes/index')(app);
// require('./app/controllers/projectController')(app);

app.listen(3000, () => {
    console.log('aplicação funcionando corretamente');
});


