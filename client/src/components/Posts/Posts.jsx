import React, {useEffect, useState} from "react";
import Picker from "emoji-picker-react";
import "./Posts.css";
import {postsAPI} from "../../api/api";

const Posts = ({ posts, getUserPosts, ...props}) => {
  const [colors, _setColors] = useState([
    '#FF3B30', '#FFCC00', '#5AC8FA',
    '#AF52DE', '#FF9500', '#34C759']);

  const [toggledPickers, setToggledPickers] = useState([])

  const [reactions, setReactions] = useState([])

  useEffect(() => {
    const shapedReactions = []
    posts.forEach((it) => {
      shapedReactions.push({reactions: it.reactions, postId: it.id, userId: it.user_id})
    })
    setReactions(shapedReactions)
  }, [])

  const onEmojiClick = (event, emojiObject, post) => {
    const postBody = {
      reaction: emojiObject.emoji,
      postId: post.id,
      reactedUserId: props.localUserId
    }
    fetchEmojiClick(postBody)
    togglePicker(post.id)
    props.callback(Math.random())
  };

  const fetchEmojiClick = (data) => {
    postsAPI.reactWithEmoji(data);
  }

  const togglePicker = (postId) => {
    if (toggledPickers.includes(postId)) {
      setToggledPickers(toggledPickers.filter(it => it !== postId));
    } else {
      setToggledPickers([...toggledPickers, postId]);
    }
  }

  const toggleReaction = (postId, emoji, reactedUserId) => {
    //console.log(reactions)
    const postBody = {
      postId: postId,
      reaction: emoji,
      reactedUserId: props.localUserId
    }
    fetchEmojiClick(postBody)
    // const reactionsCopy = JSON.parse(JSON.stringify(reactions))
    //
    // const filteredReactions = reactionsCopy.filter((it) => {
    //   return (it.postId === postId && it.userId === props.userId) && it.reactions
    // }).filter((item) => {
    //   return item => (item.reaction === emoji) && (item.users_ids.includes(props.userId))
    // })
    //
    // const neededPost = filteredReactions[0];
    // console.log(neededPost.reactions)
    //
    // //const preResult = neededPost.reactions.filter((it) => it.users_ids.includes(props.userId) && (it.reaction === emoji))
    // neededPost.reactions.filter((it) => users_ids ).filter((it) => it !== props.userId)
    // console.log(neededPost)
    props.callback(Math.random())
    // getUserPosts(props.userId)
  }

  return (
    <div>
      {
        posts.slice(0).reverse().map((post, index) => (
          <div className="comment">
            <div className="comment__item item-comment">
              <div className="item-comment__top">
                <div className="item-comment__info">
                  <div className="item-comment__photo">
                    <img src="https://cf.shopee.com.my/file/aff300f1107bfc19a4f189cdf6fea93b" alt="" />
                  </div>
                  <div className="item-comment__name">
                    {post.user_id}
                    <br/>
                    <span className="item-comment__nickname">@{post.user_id}</span>
                  </div>
                  <div className="item-comment__date">{post.createdAt}</div>
                  <div className="item-comment__text">
                    {post.comment}
                  </div>
                </div>
                <div className="item-comment__day" style={
                  // {'background-color': colors[Math.floor(Math.random()*colors.length)]}
                  {'background-color': '#34C759'}
                }><span>Note</span> {posts.length - index}</div>
              </div>
              <div className="item-comment__health health">
                {post.fever ? <div className="health__item">Fever</div> : null }
                {post.dry_cough ? <div className="health__item">Dry cough</div> : null }
                {post.tiredness ? <div className="health__item">Tiredness</div> : null }
                {post.loss_of_taste_or_smell ? <div className="health__item">Loss of taste/smell</div> : null }
                {post.sore_throat ? <div className="health__item">Sore throat</div> : null }
                {post.conjunctivitis ? <div className="health__item">Conjunctivitis</div> : null }
                {post.headache ? <div className="health__item">Headache</div> : null }
                {post.vomiting ? <div className="health__item">Vomiting</div> : null }
                {post.chest_pain_or_pressure ? <div className="health__item">Chest pressure</div> : null }
                {post.fatigue ? <div className="health__item">Fatigue</div> : null }
                {post.chills ? <div className="health__item">Chills</div> : null }
                {post.rash ? <div className="health__item">Rash</div> : null }
                {post.difficulty_breathing ? <div className="health__item">Difficulty breathing</div> : null }
                {post.nausea ? <div className="health__item">Nausea</div> : null }
              </div>
              <div className="item-comment__smiles smiles">
                {
                  post.reactions && post.reactions.map((r) => (
                    <div className={`smiles__item ` + `${r.users_ids.includes(props.localUserId) ? 'active-smile' : ''}`} onClick={() => toggleReaction(post.id, r.reaction)}>
                      {r.reaction}️ <span>{r.users_ids.length}</span>
                    </div>
                  ))
                }
                {
                  toggledPickers.includes(post.id) ? (
                    <Picker
                      onEmojiClick={(event,emojiObject) => onEmojiClick(event, emojiObject, post)}
                      disableAutoFocus={true}
                      groupNames={{ smileys_people: "PEOPLE" }}
                      native={true}
                    />
                  ) : null
                }
                <div className="smiles__item" onClick={() => togglePicker(post.id)}>
                  {toggledPickers.includes(post.id) ? <span>x Close</span> : <span>+ Add</span>}
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Posts;
