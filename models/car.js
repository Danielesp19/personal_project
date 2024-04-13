const mongoose= require("mongoose")

const carScheema= mongoose.carScheema({
  Placa:{
    type:String,
    require: true
  },
  Color:{
    type:String,
    require:true
  }
})

module.exports= mongoose.model("carpeta",carScheema);