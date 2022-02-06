const mongoose = require("mongoose");
const yup = require("yup");

const ChanhxeSchema = new mongoose.Schema({
  chanhxeName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 5000,
  },
  baixe: [String],
});

const validateChanhxe = (chanhxe) => {
  const schema = yup.object().shape({
    chanhxeName: yup.string().required().min(3).max(50)
  });

  return schema
    .validate(chanhxe)
    .then((chanhxe) => chanhxe)
    .catch((error) => {
      return {
        message: error.message,
      };
    });
};

exports.Chanhxe = new mongoose.model("Chanhxe", ChanhxeSchema);
exports.validateChanhxe = validateChanhxe;
