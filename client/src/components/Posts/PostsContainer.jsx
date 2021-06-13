import React, {useEffect, useState} from "react";
import Posts from "./Posts";
import {connect} from "react-redux";
import {getUserPosts} from "../../redux/Posts/posts.reducer";
import {postsAPI} from "../../api/api";

const PostsContainer = (props) => {
  const [reload, setReload] = useState(1234567);
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    props.getUserPosts(props.userId)
    setTimeout(() => {
      postsAPI.getUserPosts(props.userId).then((res) => setUserPosts(res.data.data.posts))
    }, 500)
  }, [props.userId, reload])

  return (
    <>
      {
        props.posts.posts.length ? <Posts
          callback={setReload}
          localUserId={props.localUserId}
          posts={userPosts}
          getUserPosts={props.getUserPosts}
          userId={props.userId}/> : <div>Add post</div>
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { getUserPosts })(PostsContainer);
// export default PostsContainer;
