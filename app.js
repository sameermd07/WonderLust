const express=require('express')
const app=express()
const {listing}=require("./Models/listing.js");
const {sampleListings}=require('./Models/listingData.js');
const mongoose=require('mongoose')
app.get("/",async (req,res)=>{
    let data=await listing.find({});
    res.render("listings.ejs",{data});
})
app.listen(2000,(req,res)=>{
    console.log("listening");
})