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

var hobbyData = [
    {id: '1', title: 'Swimming', description:'Fun time'},
    {id: '2', title: 'Rowing', description:'Sweating'},
    {id: '3', title: 'Fencing', description:'Poke'},
    {id: '4', title: 'Hiking', description:'Earth'},
    {id: '5', title: 'Programming', description:'Type until you lose your mind'},
    {id: '6', title: 'BallThrowing', description:'Repeat throwing of ball for dogs'}
];

var postData = [
    {id: '7', comment: 'Why so serious?'},
    {id: '8', comment: 'I got you.'},
    {id: '9', comment: 'Got milk?'},
    {id: '10', comment: 'Go hard or go home'},
    {id: '11', comment: 'Tada!'},
    {id: '12', comment: 'Bank Robbers?'}
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
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString}
    })
})

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby description',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString}
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post description',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString}
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
        },
        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args){
                return _.find(hobbyData, {id: args.id})
            }
        },
        post: {
            type: PostType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args){
                return _.find(postData, {id: args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})