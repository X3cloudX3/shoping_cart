const mongoose = require("mongoose")

const mongoConnection = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URL}/${process.env.DB_NAME}`,
            { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })

        console.log(`${process.env.MONGO_DB_URL}/${process.env.DB_NAME} db client is connected...`)
    } catch (ex) {
        console.log(ex.message)
        process.exit(1)
    }
}

module.exports = mongoConnection;