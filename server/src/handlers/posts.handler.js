const postsService = require("../services/mongodb/posts.service");
const { throwCustomException } = require("../utils/response-helpers");
const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../utils/response-helpers");

const createPost = async (req, res, next) => {
  try {
    const user_id = req.body.user_id;
    if (req.session.user_id !== user_id) {
      throwCustomException("User is not authenticated to add post") // todo may be move to middleware + after auth protection for routed
    }
    const postBody = { ...req.body, reactions: null };
    const post = await postsService.createPost(postBody);
    return handleSuccessResponse({ post }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const handleTogglePostReaction = async (req, res, next) => {
  try {
    const reaction = req.body.reaction;
    const post_id = req.body.id;
    const user_id = req.body.reactedUserId;
    const reactionsBody = { reaction, post_id, user_id };
    const userReactions = await postsService
      .checkIfUserBelongsToPostReactions(post_id, user_id, reaction);
    let reactions = [];
    if (!userReactions.length) {
      const isReactionPresent = await postsService.isReactionPresentInPost(post_id, reaction);
      if (isReactionPresent) {
        reactions = await postsService.toggleAddExistingPostReaction(reactionsBody);
      } else {
        reactions = await postsService.toggleAddNewPostReaction(reactionsBody);
      }
    } else {
      reactions = await postsService.toggleRemovePostReaction(reactionsBody);
    }
    return handleSuccessResponse({ reactions }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

module.exports = {
  createPost,
  handleTogglePostReaction
};
