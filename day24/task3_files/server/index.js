import express from 'express';
import cors from 'cors';
import fs from 'fs';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import path from 'path';
// const fs = require('fs');
const app= express();
app.use(cors());
app.use(express.json({extended:true}));
const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("hello");
});

// const __filename = fileURLToPath(import.meta.url);
// const __filename = ""
// const __dirName= path.join(__filename, '/userFiles');

app.post("/CreateFolder", (req,res) => {
    const Folder_name = req.body.FolderName;
    // console.log(Folder_name);
    try {
        if (!fs.existsSync(`./userFiles/${Folder_name}`)) {
            fs.mkdirSync(`./userFiles/${Folder_name}`);
            res.send("true");
        }
        
    } catch (err) {
        console.error(err);
    }
});

app.post("/CreateFile",(req,res)=>{
    const Folder_name = req.body.FolderName;
    const File_name = req.body.FileName;
    fs.writeFile(`./userFiles/${Folder_name}/${File_name}.txt`, `This is my File named ${File_name}`, function (err) {
        if (err) throw err;
        console.log('Results Received');
        }); 
        res.send("true");
});


app.post("/WriteData",(req,res)=>{
    const Folder_name = req.body.FolderName;
    const File_name = req.body.FileName;
    const Data = req.body.Data;
    fs.writeFile(`./userFiles/${Folder_name}/${File_name}.txt`, `${Data}`, function (err) {
        if (err) throw err;
        console.log('Results Received');
        }); 
        res.send("true");
});


app.post("/AppendData",(req,res)=>{
    const Folder_name = req.body.FolderName;
    const File_name = req.body.FileName;
    const Data = req.body.Data;
    // console.log(Folder_name);
    // console.log(File_name);
    // console.log(Data);
    fs.appendFile(`./userFiles/${Folder_name}/${File_name}.txt`, `${Data}`, function (err) {
        if (err) throw err;
        console.log('Results Received');
        }); 
        res.send("true");
});

app.post("/ReadData",(req,res)=>{
    const Folder_name = req.body.FolderName;
    const File_name = req.body.FileName;
    try {
        const data = fs.readFileSync(`./userFiles/${Folder_name}/${File_name}.txt`, 'utf8');
        res.send(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
});


app.post("/DeleteFile",(req,res)=>{
    const Folder_name = req.body.FolderName;
    const File_name = req.body.FileName;
    try {
        fs.stat(`./userFiles/${Folder_name}/${File_name}.txt`, function (err, stats) {
            console.log(stats);//here we got all information of file in stats variable
         
            if (err) {
                return console.error(err);
            }
            
            fs.unlink(`./userFiles/${Folder_name}/${File_name}.txt`,function(err){
                 if(err) return console.log(err);
                 console.log('file deleted successfully');
                 res.send("1");
            });  
        });
    } catch (err) {
        console.error(err);
    }
});


app.post("/DisplayFiles",(req,res)=>{
    const Folder_name = req.body.FolderName;
    try {
        fs.readdir(`./userFiles/${Folder_name}`, (error, files) => {
            if (error) console.log(error)
            console.log(files);
            res.send(files);
            // files.forEach( file => File = {...File, file})
            })
      } catch (err) {
        console.error(err);
      }
});


app.listen(PORT,()=>{
    console.log(`server is started on port ${PORT}`);
});