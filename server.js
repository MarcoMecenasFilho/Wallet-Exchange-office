const  express = require('express')
const  path  = require('path');

const app =  express()

if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/*", function(req, res) {
      res.sendFile(path.join(__dirname, "./build/index.html"));
    });
}


app.get('/page',function(req,res){
  res.send("page");
});

app.listen(process.env.PORT || 3000, (err) => {
  if (err) { return console.log(err)}
  console.log('Esta funcionando')
})
