import React from "react";
import {Link} from "react-router-dom";


const Following = (props) => {
  return (
    <div className="following">
      <h3 className="following-title">Following</h3>
      {
        props.followed_users.map((user) => (
          <div className="followed-user">
            <div className="followed-user__avatar">
              <img
                src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70"
                alt=""/>
            </div>

            {/*className="followed-user__name"*/}
            <div >
              <Link className="followed-user__name" to={`/profile/${user}`}>{user}</Link>
              {/*TODO add login and email */}
              <br/>
              <span className="followed-user__username">@{user}</span>
            </div>
          </div>
        ))
      }
      {/*<div className="followed-user">*/}
      {/*  <div className="followed-user__avatar">*/}
      {/*    <img*/}
      {/*      src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70"*/}
      {/*      alt=""/>*/}
      {/*  </div>*/}
      {/*  <div className="followed-user__name">*/}
      {/*    Emily Minem*/}
      {/*    <br/>*/}
      {/*    <span className="followed-user__username">@eminem</span>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*<div className="followed-user">*/}
      {/*  <div className="followed-user__avatar">*/}
      {/*    <img*/}
      {/*      src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70"*/}
      {/*      alt=""/>*/}
      {/*  </div>*/}
      {/*  <div className="followed-user__name">*/}
      {/*    Emily Minem*/}
      {/*    <br/>*/}
      {/*    <span className="followed-user__username">@eminem</span>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  )
}

export default Following;
