const graphql = require('graphql');
var _ = require('lodash');

//dummy data
var userData = [
    {id: '01', name: 'Chloe', age: 14, profession:'Vet'},
    {id: '12', name: 'Haley', age: 12, profession:'Teacher'},
    {id: '23', name: 'Ethan', age: 10, profession:'Scientist'},
    {id: '45', name: 'Star', age: 5, profession:'Hugger'},
    {id: '67', name: 'Gracie', age: 1, profession:'Comedian'},
    {id: '89', name: 'Connie', age: 68, profession:'Teacher'}
];
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema

} = graphql


//createtypes
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'My description',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString}
    })
})

//rootquery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'My description',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},

            resolve(parent, args){
                return _.find(userData, {id: args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})