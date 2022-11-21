const { query } = require('express');
const express = require('express');
const app = express();
const PORT = 8000;
const {graphqlHTTP} = require('express-graphql')
const {GraphQLObjectType, GraphQLInt, GraphQLBoolean,GraphQLList, GraphQLSchema, GraphQLString} = require('graphql')
const sendData = [
    {id:1, language:"python",loved:true},
    {id:2, language:"c",loved:true},
    {id:3, language:"c++",loved:false},
]
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
const schema = new GraphQLSchema({query:rootQuery})
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