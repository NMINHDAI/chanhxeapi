const express = require("express");
const router = express.Router();
const { validateChanhxe, Chanhxe } = require("../models/chanhxe");
const { validateBaixe, Baixe } = require("../models/baixe");
//POST: CREATE A NEW chanhxe
router.post("/", async (req, res) => {
  const error = await validateChanhxe(req.body);
  if (error.message) res.status(400).send(error.message);

  let chanhxe = new Chanhxe({
    chanhxeName: req.body.chanhxeName,
    description: req.body.description
  });

  chanhxe
    .save()
    .then((chanhxe) => {
      res.send(chanhxe);
    })
    .catch((error) => {
      res.status(500).json({ err: 'Cannot create a new one' });
    });
});

//GET ALL chanh xe
router.get("/", (req, res) => {
  Chanhxe.find()
    .then((chanhxe) => res.send(chanhxe))
    .catch((error) => {
      res.status(500).json({ err: "Something went wrong" });
    });
});

//GET THE chanhxe BY ID
router.get("/:chanhxeId", async (req, res) => {
  const chanhxe = await Chanhxe.findById(req.params.chanhxeId);
  if (!chanhxe) res.status(404).json({ err: "Chanhxe not found" });
  res.send(chanhxe);
});

//UPDATE chanhxe BASED ON ID
router.put("/:chanhxeId", async (req, res) => {
  const updatedChanhxe = await Chanhxe.findByIdAndUpdate(
    req.params.chanhxeId,
    {
      chanhxeName: req.body.chanhxeName,
      description: req.body.description
    },
    { new: true }
  );

  if (!updatedChanhxe) res.status(404).json({ err: "Chanhxe not found" });
  res.send(updatedChanhxe);
});

//DELETE chanhxe BASED ON ID
router.delete("/:chanhxeId", async (req, res) => {
  const chanhxe = await Chanhxe.findByIdAndRemove(req.params.chanhxeId);
  if (!chanhxe) res.status(404).json({ err: "Chanhxe not found" });
  else {
    for (const element of chanhxe.baixe) {
      const baixe = await Baixe.findByIdAndRemove(element);
      console.log(element);
    }
    
  }
  res.send(chanhxe);
});

module.exports = router;
