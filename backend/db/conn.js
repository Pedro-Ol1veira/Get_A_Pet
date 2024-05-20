const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localgost:27017/getapet');
    console.log("Conectou ao mongoose");
};

main().catch((err) => console.log(err));

module.exports = mongoose;