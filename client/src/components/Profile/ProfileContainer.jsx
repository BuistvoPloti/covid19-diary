import React, {useEffect, useState} from "react";
import PostsContainer from "../Posts/PostsContainer";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserPosts} from "../../redux/Posts/posts.reducer";
import AddPostForm from "../Forms/AddPostForm";
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')


const ProfileContainer = (props) => {
  const [localUser, setLocalUser] = useState({});

  useEffect(() => {
    //props.getUserPosts(props.match.params.id)
    fetch(`http://localhost:3022/users/qqq/${props.match.params.id}`)
      .then((res) => res.json())
      .then((userResponse) => setLocalUser(userResponse.data.user))
  }, props.match.params.id)

  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }

  return(
    <div>
      {
        localUser.id ? <div>
          <Profile user={localUser} currentAuthUserId={props.user.id}/>
          {/*<AddPostForm userId={props.user.id}/>*/}
          {
            localUser.id === props.user.id ? (
              <>
                <button onClick={openModal}>New Post</button>
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2 ref={_subtitle => (subtitle = _subtitle)}>Add post</h2>
                  <AddPostForm userId={props.user.id} closeModalRef={closeModal}/>
                  <button onClick={closeModal}>close</button>
                </Modal>
              </>
            ) : null
          }
          <h2>Latest posts</h2>
          <PostsContainer userId={props.match.params.id} localUserId={props.user.id} posts={props.posts} getUserPosts={props.getUserPosts}/>
        </div> : <div>Loading</div>
      }
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    posts: state.posts,
  };
};

export default connect(mapStateToProps, {getUserPosts})(ProfileContainer);
