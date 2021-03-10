const Post = require("../../models/mongodb/post");
const { throwCustomException } = require("../../utils/response-helpers");
const { compareEmojiUnicode } = require("../../utils/string.utils");

const createPost = async (postBody) => {
  const post = await new Post(postBody);
  return post.save();
};

const toggleAddNewPostReaction = async (
  {
    post_id,
    user_id,
    reaction,
  }
) => {
  return await Post.findOneAndUpdate(
    {
      _id: post_id
    },
    {
      $push: {
        reactions: {
          users_ids: [user_id],
          reaction
        }
      }
    },
    {
      new: true,
      upsert: true,
    }
  );
};

const toggleAddExistingPostReaction = async (
  {
    post_id,
    user_id,
    reaction,
  }
) => {
  return await Post.findOneAndUpdate(
    {
      _id: post_id,
      reactions: {
        $elemMatch: {
          reaction: reaction,
        }
      }
    },
    {
      $push: {
        "reactions.$.users_ids": user_id
      }
    },
    {
      new: true,
      upsert: true,
    }
  );
};

const toggleRemovePostReaction = async ({ post_id, user_id, reaction }) => {
  const updatedPost = await Post.findOneAndUpdate(
    {
      _id: post_id,
      reactions: {
        $elemMatch: {
          reaction: reaction,
        }
      }
    },
    {
      $pull: {
        "reactions.$.users_ids": {
          $in: [user_id]
        }
      }
    },
    {
      new: true,
      upsert: true,
    }
  );
  const isEmptyReactions = updatedPost.reactions.some((reactionUnit) => {
    return compareEmojiUnicode(reactionUnit.reaction, reaction) && !reactionUnit.users_ids.length
  });

  if (isEmptyReactions) {
    return await Post.findOneAndUpdate(
      {
        _id: post_id,
      },
      {
        $pull: {
          reactions: {
            reaction: reaction
          }
        }
      },
      {
        new: true,
        upsert: true,
      }
    )
  }

  return updatedPost;
};

const checkIfUserBelongsToPostReactions = async (post_id, user_id, reaction) => {
  const postReactions = await getPostReactions(post_id);
  return postReactions.filter((reactionUnit) => {
    return reactionUnit.users_ids.includes(user_id)
      && compareEmojiUnicode(reactionUnit.reaction, reaction);
  });
};

const isReactionPresentInPost = async (post_id, reaction_emoji) => {
  const reactions = await getPostReactions(post_id);
  return reactions.some((reactionUnit) => {
    return compareEmojiUnicode(reactionUnit.reaction, reaction_emoji)
  });
};

const getPostReactions = async (post_id) => {
  const postReactionsQuery = await Post.findOne({ _id: post_id }, "reactions");
  return postReactionsQuery.reactions;
};

const getPostById = async (post_id) => {
  return await Post.findOne({ _id: post_id });
};

const getUserPosts = async (user_id) => {
  return await Post.find({ user_id })
};

module.exports = {
  createPost,
  toggleAddNewPostReaction,
  toggleAddExistingPostReaction,
  toggleRemovePostReaction,
  checkIfUserBelongsToPostReactions,
  isReactionPresentInPost,
  getPostById,
  getUserPosts
};
