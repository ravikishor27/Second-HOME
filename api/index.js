import express from 'express';

const api= express();

api.listen(3000,()=>{
    console.log("Server is Successfully running in port 3000")
});