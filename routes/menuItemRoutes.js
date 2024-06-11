const express = require('express');
const router = express.Router();
const menuItem = require('./../models/menuItem');



//POST route to add new menuItem
router.post("/",async (req,res)=>{
    const menuData =req.body;
    try {
        const newMenuItem = new menuItem(menuData);
        const response = await newMenuItem.save();
        console.log("New menuItem is saved successfully");
        res.status(200).json(response);
    } catch (error) {
        console.log("Error while saving the new menuItem ", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


// GET route to get all menuItems
router.get("/",async(req,res)=>{
    try {
        const menuItemData = await menuItem.find();
        console.log(" MenuItems are fetched successfully ");
        res.status(200).json(menuItemData);

    } catch (error) {
        console.log("Error while fetching the data ", error);
        res.status(500).json({ error: "Internal server error" });
        
    }
})


// GET route to get a particular menuItem
router.get("/:taste", async (req,res)=>{
    
    try {
       const taste = req.params.taste;
       if(taste==='spicy'|| taste==='sweet'|| taste==='sour'){
           const response = await menuItem.find({taste:taste});
           console.log("MenuItem is fetched successfully");
           res.status(200).json(response);
       } else{
           res.status(404).json({ error: "Invalid menuItem" });
       }
    } catch (error) {
       console.log("Error while fetching the data ", error);
       res.status(500).json({ error: "Internal server error" });
    }
})

// PUT route to update a menuItem
router.put("/:MenuItemId",async(req,res)=>{
    try {
        const menuItemId = req.params.MenuItemId;
        const UpdatemenuItem = req.body;
        const response = await menuItem.findByIdAndUpdate(menuItemId,UpdatemenuItem,{
            new:true,
            runValidators:true
        })
        if(!response){
            res.status(404).json({ error: "menuItem not found" });
        }
        console.log("Menu item updated successfully");
        res.status(200).json(response);

    } catch (error) {
        console.log("Error while fetching the data ", error);
       res.status(500).json({ error: "Internal server error" });
    }
})


//DELETE route to delete a menuItem
router.delete("/:MenuItemId",async (req,res)=>{
    try {
        const menuItemId = req.params.MenuItemId;
        const response = await menuItem.findByIdAndDelete(menuItemId);
        if(!response){
            res.status(404).json({ error: "menuItem not found" });
        }
        console.log("Menu item deleted successfully");
        res.status(200).json(response);

   
    } catch (error) {
        console.log("Error while fetching the data ", error);
       res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router;