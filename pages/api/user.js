import {promises as fs } from "fs"
import path from "path";


export default async (req,res)=>{
    const jsonDirectory = path.join(process.cwd(),"UserData"); 
    const fileContent = await fs.readFile(jsonDirectory+"/user.json","utf-8");
    const user = JSON.parse(fileContent);
    res.status(200).send(user);

}