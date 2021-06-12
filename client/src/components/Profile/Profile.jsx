import React from "react";
import "./Profile.css";

const Profile = (props) => {
  return (
    <div className="profile">
      <div className="profile-photo">
        <img src="https://cf.shopee.com.my/file/aff300f1107bfc19a4f189cdf6fea93b" alt="" />
      </div>
      <div className="profile-info">
        {props.user.login}
        <br/>
        <span className="profile-nickname">@{props.user.login}</span>
        <div className="profile-caption">
          {props.user.email}
        </div>
        <div className="profile-stats">
          {/*<span>20 followers</span>*/}
          <span>{props.user.infected ? <span>⛔️Infected</span> : <span>✅Not infected</span>}</span>
          {/*<span>{props.user.followed_users.length} following</span>*/}
          { (props.currentAuthUserId!==props.user.id) ? <button>unfollow</button> : '' }
        </div>
      </div>

    </div>
  )
}

export default Profile;
