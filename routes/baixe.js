const express = require("express");
const router = express.Router();
const { validateBaixe, Baixe } = require("../models/baixe");
const { validateChanhxe, Chanhxe } = require("../models/chanhxe");

//POST: CREATE A NEW Baixe
router.post("/", async (req, res) => {
  const error = await validateBaixe(req.body);
  if (error.message) res.status(400).json({ err: error.message });



  let baixe = new Baixe({
    baixeName: req.body.baixeName,
    address: req.body.address,
    phone: req.body.phone,
    chanhxeId: req.body.chanhxeId
  });

  // update chanhxe
  const updatedChanhxe = await Chanhxe.findByIdAndUpdate(
    req.body.chanhxeId,
    {
      $push: {
        baixe: baixe._id,
      },
    },
    { new: true }
  );
  if (!updatedChanhxe) res.status(404).json({ err: "Chanhxe not found" });
  else {
    baixe
    .save()
    .then((baixe) => {
      res.send(baixe);
    })
    .catch((error) => {
      res.status(500).json({ err: "Something went wrong" });
    });
  } 
});

//GET ALL Baixe
router.get("/", (req, res) => {
  Baixe.find()
    .then((baixe) => res.send(baixe))
    .catch((error) => {
      res.status(500).send("Something went wrong");
    });
});

//GET THE baixe BY ID
router.get("/:baixeId", async (req, res) => {
  const baixe = await Baixe.findById(req.params.baixeId);
  if (!baixe) res.status(404).json({ err: "Baixe not found" });
  res.send(baixe);
});

//UPDATE Baixe BASED ON ID
router.put("/:baixeId", async (req, res) => {
  const updatedBaixe = await Baixe.findByIdAndUpdate(
    req.params.baixeId,
    {
      baixeName: req.body.baixeName,
      address: req.body.address,
      phone: req.body.phone
    },
    { new: true }
  );

  if (!updatedBaixe) res.status(404).json({ err: "Baixe not found" });
  res.send(updatedBaixe);
});

//DELETE baixe BASED ON ID
router.delete("/:baixeId", async (req, res) => {
  const baixe = await Baixe.findByIdAndRemove(req.params.baixeId);
  if (!baixe) res.status(404).json({ err: "Baixe not found" });
  else {
    const updatedChanhxe = await Chanhxe.findByIdAndUpdate(
      baixe.chanhxeId,
      {
        $pullAll: {
          baixe: [baixe._id] ,
        },
      },
      { new: true }
    );
    if (!updatedChanhxe) res.status(500).json({ err: "Something went wrong" });
  }
  res.send(baixe);
});

module.exports = router;
