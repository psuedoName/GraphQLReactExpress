const graphql = require('graphql');


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLNonNull

} = graphql

//Scalar Type
/*
    String
    Int
    Float
    Boolean
    ID
*/

const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'Represents a Person Type',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
        isMarried: {type: GraphQLBoolean},
        gpa: {type: GraphQLFloat},

        justAType:{
            type: Person,
            resolve(parent, args){
                return parent
            }
        }
    })
})


//rootquery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'My description',
    fields: {
        person: {
            type: Person,
            resolve(parent, args){
                let personObj = {
                    name: null,
                    age: null,
                    isMarried: false,
                    gpa: 3.0
                }
                return personObj
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})