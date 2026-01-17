const { gql } = require('graphql-tag');

const typeDefs = gql`
  type SocialAccount {
    id: ID!
    platform: String!
    username: String
    email: String
    profilePicture: String
    isConnected: Boolean!
    isEnabled: Boolean
    lastSyncedAt: String
  }

  type Post {
    id: ID!
    platform: String!
    content: String
    mediaUrl: String
    mediaType: String # IMAGE, VIDEO, TEXT
    likesCount: Int
    commentsCount: Int
    publishedAt: String
    permalink: String
    authorName: String
    authorImage: String
  }

  type Comment {
    id: ID!
    authorRaw: String
    text: String
    likes: Int
    publishedAt: String
    replyCount: Int
  }

  type Query {
    getConnectedAccounts: [SocialAccount]
    getDashboardFeed: [Post]
    getComments(platform: String!, postId: String!, accountId: String): [Comment]
  }

  type Mutation {
    disconnectAccount(platform: String!, accountId: String): Boolean
    addComment(platform: String!, postId: String!, text: String!, accountId: String): String
    toggleAccountStatus(platform: String!, accountId: String!, isEnabled: Boolean!): Boolean
  }
`;

module.exports = typeDefs;
