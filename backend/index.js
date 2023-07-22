const { query } = require('express');
const express = require('express');
const app = express();
const PORT = 8000;
const {graphqlHTTP} = require('express-graphql');
const { type } = require('express/lib/response');
const {graphql, buildSchema, GraphQLObjectType, GraphQLInt, GraphQLBoolean,GraphQLList, GraphQLSchema, GraphQLString} = require('graphql')
const sendData = [
    {id:1, language:"python",loved:true},
    {id:2, language:"c",loved:true},
    {id:3, language:"c++",loved:false},
]

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  hello: () => {
    return "Hello world!"
  },
}

// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: "{ hello }",
  rootValue,
}).then(response => {
  console.log(response)
})

// schema
//  resolver
const languageType = new GraphQLObjectType({
    name:"Language",
    description:'ProgramforLanguage',
    fields:{
        id:{
            type:GraphQLInt,
        },
        language:{
            type:GraphQLString,
        },
        loved:{
            type:GraphQLBoolean
        }
    }
})
const rootQuery  = new GraphQLObjectType({
    name:'RootQuery',
    description:"helloworld",
    fields:{
        languages : {
            type  : new GraphQLList(languageType),
            resolve: () => sendData
        },
        language : {
            type : languageType,
            args:{
                id:{type:GraphQLInt}
            },
            // resolve: (parent, args, context, info)=>sendData.find( language=>language.id == args.id)
            resolve: (_, {id}) => sendData.find( language=>language.id == id)
        }
    }
})

/*
 how to search on chrome
 query {
  languages {
    id
    language
    loved
  }
}
*/
var schema = new GraphQLSchema({query:rootQuery})
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true,
}))
app.get('/name',(req,res)=>{
    return res.send("hello world")
 })
app.listen(PORT, (req, res) => {
    console.log('server running in port no 8000')
})