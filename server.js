import express from "express";
import fs from "fs";
import path from "path";
const app =express();
app.use(express.json());
app.get('/users', (req, res)=>{
    const data=JSON.parse(fs.readFileSync(path.join(process.cwd(), "users.json")));
    return res.json(data)
});
app.post('/users', (req, res)=>{
    const {id,name}=req.body;
    const users=JSON.parse(fs.readFileSync(path.join(process.cwd(), "users.json")));
    if(users.every(obj=>obj.id!=id&&obj.name!=name)){
      users.push(req.body)
      fs.writeFileSync(path.join(process.cwd(), "users.json"), JSON.stringify(users, null, 2));
      return res.send(users)
    }else{
return res.send("Ushbu user alla qachun ro'yhatdan o'tgan !")
    }
});
app.put('/users', (req, res)=>{
  const users=JSON.parse(fs.readFileSync(path.join(process.cwd(), "users.json")));
  const {id, name}=req.body;
  users.map((a)=>{
    if(a.id==id)a.name=name;
  })
  fs.writeFileSync(path.join(process.cwd(), "users.json"), JSON.stringify(users, null, 2));
  return res.send(users)
});
app.delete('/users', (req, res)=>{
  let users=JSON.parse(fs.readFileSync(path.join(process.cwd(), "users.json")));
  const {id, name}=req.body;
  users=users.filter((a)=>a.id!=id)
  fs.writeFileSync(path.join(process.cwd(), "users.json"), JSON.stringify(users, null, 2));
  return res.send(users)
})
app.listen(7000, console.log("7000   done"));