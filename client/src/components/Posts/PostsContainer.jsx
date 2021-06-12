import React, {useEffect} from "react";
import Posts from "./Posts";
import {connect} from "react-redux";
import {getUserPosts} from "../../redux/Posts/posts.reducer";

const PostsContainer = (props) => {
  return (
    <>
      {
        props.posts.posts.length ? <Posts posts={props.posts.posts}/> : <div>Add post</div>
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
