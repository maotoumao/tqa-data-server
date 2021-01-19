const app = require('express')();
const cors = require('cors');
const router = require('./router');

app.use(cors());
app.use(router);

app.listen(6028, function(){
    console.log('listening');
});
