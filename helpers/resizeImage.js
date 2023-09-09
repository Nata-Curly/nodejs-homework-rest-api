const Jimp = require('jimp');

const resizeImage = async (req, res) => {
    const image = await Jimp.read(req);
    image.resize(250, 250);
    await image.writeAsync(res);
};


// Jimp.read("./path/to/image.jpg")
    //   .then((image) => {
    //     // Do stuff with the image.
    //   })
    //   .catch((err) => {
    //     // Handle an exception.
    //   });

module.exports = resizeImage;