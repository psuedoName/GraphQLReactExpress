const express = require('express');
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')

const schema = require('./schema/schema')
const testSchema = require('./schema/types_schema')

const cors = require('cors')

const app = express();


//DO NOT COMMIT PASSWORD!
mongoose.connect('mongodb+srv://tessa:crazydog@m001cluster-ldcue.mongodb.net/jp?retryWrites=true&w=majority', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
   console.log('Mongo is connected')
})

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))

app.listen(4000, () => { //localhost:4000
    console.log('Listening for requests on port 4000')

})