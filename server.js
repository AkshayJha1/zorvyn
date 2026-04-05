require('dotenv').config();
const connectDatabase = require('./src/config/database');
const app = require("./src/app")
const PORT = process.env.PORT || 5000;

connectDatabase().then(() => {
        app.listen(PORT,()=>{
                console.log(`server is listening on port ${PORT}`)
        })
}).catch((error)=>{
    console.error("Failed to connect to database:", error.message);
    process.exit(1);
});