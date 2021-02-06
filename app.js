const { ApolloServer, gql } = require("apollo-server")
const axios = require("axios")

// ig will be reference key on the React App
const typeDefs = gql`
    type User {
        id: ID
        login: String
        avatar_url: String
    }

    type UserWithRepos {
        id: ID
        login: String
        avatar_url: String
        repos_url: String
    }

    type UserWithFollowers {
        id: ID
        login: String
        avatar_url: String
        followers_url: String
    }

    type Query {
        users: [User],
        usersWithRepos: [UserWithRepos],
        usersWithFollowers: [UserWithFollowers]
    }
`

// resolver is a collection of functions that help generate a response from a GraphQL Query. 
const resolvers = {
    Query: {
        // relate to users query
        users: async () => {
            try {
                const users = await axios.get("https://api.github.com/users")
                return users.data.map(({ id, login, avatar_url }) => ({
                    id,
                    login,
                    avatar_url
                }))
            } catch (error) {
                throw error
            }
        },
        usersWithRepos: async () => {
            try {
                const usersWithRepos = await axios.get("https://api.github.com/users")
                return usersWithRepos.data.map(({ id, login, avatar_url, repos_url }) => ({
                    id,
                    login,
                    avatar_url,
                    repos_url
                }))
            } catch (error) {
                throw error
            }
        },
        usersWithFollowers: async () => {
            try {
                const usersWithFollowers = await axios.get("https://api.github.com/users")
                return usersWithFollowers.data.map(({ id, login, avatar_url, followers_url }) => ({
                    id,
                    login,
                    avatar_url,
                    followers_url
                }))
            } catch (error) {
                throw error
            }
        }
    }
}

// ApolloServer constructor needs an object with schema and resolver
const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))