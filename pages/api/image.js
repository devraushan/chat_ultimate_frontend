import {promises as fs } from "fs"
import { Stream } from "stream";
import path from "path";


export default async (req,res)=>{
    const jsonDirectory = path.join(process.cwd(),"ProfilePhoto"); 
    const imageBuff = await fs.readFile(`${jsonDirectory}/babur.jpg`);
    res.setHeader("Content-Type",'image/jpg');
    res.send(imageBuff);

}