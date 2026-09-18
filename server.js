const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

app.disable("x-powered-by");
app.use((req,res,next)=>{
  res.setHeader("X-Content-Type-Options","nosniff");
  res.setHeader("Referrer-Policy","strict-origin-when-cross-origin");
  next();
});
app.use(express.static(ROOT));
app.use((req,res)=>res.status(404).sendFile(path.join(ROOT,"index.html")));
app.listen(PORT,()=>console.log(`RECOVA → http://localhost:${PORT}`));
