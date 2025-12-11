const socialDataService = require('../services/social-data-service');

const resolvers = {
    Query: {
        getConnectedAccounts: async () => {
            return await socialDataService.getConnectedAccounts();
        },
        getDashboardFeed: async () => {
            return await socialDataService.getFeed();
        },
        getComments: async (_, { platform, postId, accountId }) => {
            return await socialDataService.getPostComments(platform, postId, accountId);
        }
    },
    Mutation: {
        disconnectAccount: async (_, { platform, accountId }) => {
            return await socialDataService.disconnectAccount(platform, accountId);
        },
        addComment: async (_, { platform, postId, text, accountId }) => {
            await socialDataService.addComment(platform, postId, text, accountId);
            return "Comment added";
        },
        toggleAccountStatus: async (_, { platform, accountId, isEnabled }) => {
            return await socialDataService.toggleAccountStatus(platform, accountId, isEnabled);
        }
    }
};

module.exports = resolvers;
