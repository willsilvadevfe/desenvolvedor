const express = require("express");
const router = express.Router();

router.get('/', (req,res)=>{
  res.send('Index port is running...')
})

module.exports = router;
