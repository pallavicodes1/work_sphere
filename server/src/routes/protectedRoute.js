const express=require('express');
const router=express.Router();
router.get(
    "/",
    (req, res) => {

        res.status(200).json({
            success: true,
            user: req.user
        });

    }
);
module.exports=router; 