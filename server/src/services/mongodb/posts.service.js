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
  const postReactions = await getPostReactions(post_id);
  const users_ids = postReactions.users_ids || [];
  return await Post.findOneAndUpdate(
    {
      _id: post_id
    },
    {
      reactions:
        [
          ...postReactions,
          {
            users_ids: [...users_ids, user_id],
            reaction,
          }
        ]
    },
    {
      new: true
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
  const postReactions = await getPostReactions(post_id);

  const reactions = postReactions.map((reactionUnit) => {
    const emojiEquals = compareEmojiUnicode(reactionUnit.reaction, reaction);
    if (emojiEquals) {
      return {
        _id: reactionUnit._id,
        users_ids: [...reactionUnit.users_ids, user_id],
        reaction: reactionUnit.reaction,
      }
    }
    return reactionUnit;
  });
  return await Post.findOneAndUpdate(
    {
      _id: post_id
    },
    {
      reactions
    },
    {
      new: true
    }
  );
};

const toggleRemovePostReaction = async ({ post_id, user_id, reaction }) => {
  const postReactions = await getPostReactions(post_id);
  const userReactions = postReactions
    .filter((reactionUnit) => {
      return reactionUnit.users_ids.includes(user_id)
        && compareEmojiUnicode(reactionUnit.reaction, reaction);
    });
  const newUsersIdsList = userReactions[0].users_ids.filter((reaction_user_id) => {
    return String(reaction_user_id) !== user_id;
  });
  let newUsersReactions = [];
  if (newUsersIdsList.length) {
    newUsersReactions = postReactions.map((reactionUnit) => {
      if (compareEmojiUnicode(reactionUnit.reaction, reaction)) {
        return {
          ...reactionUnit.toObject(),
          users_ids: newUsersIdsList,
        }
      }
      return reactionUnit;
    });
  } else {
    newUsersReactions = postReactions.filter((reactionUnit) => {
      return !compareEmojiUnicode(reactionUnit.reaction, reaction);
    });
  }
  return await Post.findOneAndUpdate(
    {
      _id: post_id
    },
    {
      reactions: newUsersReactions,
    },
    {
      new: true
    }
  );
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
  const isPresent = reactions.filter((reactionUnit) => {
    return compareEmojiUnicode(reactionUnit.reaction, reaction_emoji)
  });
  return Boolean(isPresent.length);
};

const getPostReactions = async (post_id) => {
  const postReactionsQuery = await Post.findOne({ _id: post_id }, "reactions");
  return postReactionsQuery.reactions;
};

module.exports = {
  createPost,
  toggleAddNewPostReaction,
  toggleAddExistingPostReaction,
  toggleRemovePostReaction,
  checkIfUserBelongsToPostReactions,
  isReactionPresentInPost
};
