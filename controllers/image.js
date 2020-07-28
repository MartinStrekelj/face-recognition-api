const Clarifai = require("clarifai");

const app = new Clarifai.App({
    apiKey: '978fb01e4f364656a6c36bf7706c7120'
   });

const APIHandler = (req, res) => {
    const {input} = req.body;
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, input)
        .then(data => {
            return res.json(data)
        })
        .catch(err => res.status(400).json("Unable to work with API."))
}
   
const processImage = (req, res, db) => {
    const { id } = req.body;
    db("users").where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => res.json(entries[0]))
    .catch(err => res.json(400).json("Unable to increment entries"))
}

module.exports = {
    processImage : processImage,
    APIHandler: APIHandler
}