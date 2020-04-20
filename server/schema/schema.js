const graphql = require('graphql');
var _ = require('lodash');

//dummy data
var userData = [
    {id: '1', name: 'Chloe', age: 14, profession:'Vet'},
    {id: '2', name: 'Haley', age: 12, profession:'Teacher'},
    {id: '3', name: 'Ethan', age: 10, profession:'Scientist'},
    {id: '4', name: 'Star', age: 5, profession:'Hugger'},
    {id: '5', name: 'Gracie', age: 1, profession:'Comedian'},
    {id: '6', name: 'Connie', age: 68, profession:'Teacher'}
];

var hobbyData = [
    {id: '7', title: 'Swimming', description:'Fun time', userId: '1'},
    {id: '8', title: 'Rowing', description:'Sweating', userId: '2'},
    {id: '9', title: 'Fencing', description:'Poke', userId: '3'},
    {id: '10', title: 'Hiking', description:'Earth', userId: '4'},
    {id: '11', title: 'Programming', description:'Type until you lose your mind', userId: '5'},
    {id: '12', title: 'BallThrowing', description:'Repeat throwing of ball for dogs', userId: '5'}
];

var postData = [
    {id: '13', comment: 'Why so serious?', userId: '1'},
    {id: '14', comment: 'I got you.', userId: '2'},
    {id: '15', comment: 'Got milk?', userId: '3'},
    {id: '16', comment: 'Go hard or go home', userId: '4'},
    {id: '17', comment: 'Tada!', userId: '5'},
    {id: '18', comment: 'Bank Robbers?', userId: '5'}
];


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList

} = graphql


//createtypes
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'My description',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString},
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postData, {userId: parent.id})
            }
        },
        hobby: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(hobbyData, {userId: parent.id})
            }
        }
    })
})

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby description',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return _.find(userData, {id: parent.userId})
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post description',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return _.find(userData, {id: parent.userId})
            }
        }
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