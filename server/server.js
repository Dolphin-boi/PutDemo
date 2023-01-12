const express = require("express");
const coilApi = require("./api/coilApi")
process.env.TZ = 'Asia/Bangkok'
const app = express();
app
  .use(express.json())
  .use('/api/coil',coilApi)

app.get("/test", (req,res) => {
    res.send("PutDemo test api")
})

const port = 8080;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});