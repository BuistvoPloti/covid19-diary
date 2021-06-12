import React, {useState} from 'react';
import {connect} from "react-redux";
import {createPost} from "../../redux/Posts/posts.reducer";

const AddPostForm = (props) => {
  const [symptoms, setSymptoms] = useState({
    "fever": false,
    "dry_cough": false,
    "tiredness": false,
    "chest_pain_or_pressure": false,
    "loss_of_taste_or_smell": false,
    "difficulty_breathing": false,
    "sore_throat": false,
    "conjunctivitis": false,
    "headache": false,
    "vomiting": false,
    "fatigue": false,
    "chills": false,
    "rash": false,
    "nausea": false
  });
  const [comment, setComment] = useState("");

  const onCheckBoxClick = (e) => {
    const labelName = e.target.name;
    setSymptoms({...symptoms, [labelName]: !symptoms[labelName]})
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {...symptoms, comment, reactions: null, user_id: props.userId}
    props.createPost(postData);
    props.closeModalRef();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {
          Object.keys(symptoms).map((it) => (
            <div>
              {it}
              <input type="checkbox" name={it} onClick={onCheckBoxClick} value={symptoms[it]} />
            </div>
          ))
        }

        <label>
          Comment:
          <input type="text" onChange={handleCommentChange}/>
        </label>
        <input type="submit" value="Send" />
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.user.isAuth,
    user: state.user,
  };
};

export default connect(mapStateToProps, { createPost })(AddPostForm);
