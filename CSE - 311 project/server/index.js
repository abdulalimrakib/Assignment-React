const app = require('./app')

const PORT = 3000;

app.listen(PORT, () =>{
    console.log(`server is running at http://localhost:${PORT}`);
})