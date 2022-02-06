const mongoose = require('mongoose');
const yup = require("yup");

const BaixeSchema = new mongoose.Schema({
    baixeName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:40
    },
    address:{
        type:String,
        required:true,
        minlength:3,
        maxlength:200
    },
    phone: [String],
    chanhxeId:{
        type:String,
        required:true
    },
});

const validateBaixe = (baixe) => {
    const schema = yup.object().shape({
        baixeName: yup.string().required().min(3).max(50)
    });
  
    return schema
      .validate(baixe)
      .then((baixe) => baixe)
      .catch((error) => {
        return {
          message: error.message,
        };
      });
    };

exports.Baixe = new mongoose.model("Baixe", BaixeSchema);
exports.validateBaixe = validateBaixe;