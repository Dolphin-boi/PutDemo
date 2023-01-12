const express = require("express");

process.env.TZ = 'Asia/Bangkok'
const app = express();

app.get("/test", (req,res) => {
    res.send("PutDemo test api")
})

const port = 8080;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});