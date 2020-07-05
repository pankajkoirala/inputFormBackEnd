const experss = require("express");
const router = experss.Router();
const multer = require("multer");
const pictureManager = require("../middleware/picManager");
const {
  Observation,
  createObservationValidator,
  updateObservationValidator
} = require("../model/observation");

router.get("/", async (req, res) => {
  const observation = await Observation.find({})
    .select("-__v")
    .sort({ date: 1 });
  return res.status(200).send(observation);
});

router.get("/:id", async (req, res) => {
  const observation = await Observation.findOne({ _id: req.params.id });
  return res.status(200).send(observation);
});

router.post(
  "/", 
  multer({}).single("picture"),
  pictureManager,
  async (req, res) => {    
    const { error } = createObservationValidator(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    let observation = new Observation(req.body);
    await observation.save();
    return res.status(201).send(observation);
  }
);

router.put("/:id", async (req, res) => {
  const { error } = updateObservationValidator(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  const observation = await Observation.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  );
  return res.status(201).send(observation);
});

router.delete("/:id", async (req, res) => {
  const observation = await Observation.findOneAndDelete({
    _id: req.params.id
  });
  return res.status(200).send(observation);
});

module.exports = router;
