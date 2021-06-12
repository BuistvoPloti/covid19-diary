import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect, Provider } from "react-redux";
import logo from './logo.svg';
import store from "./redux/store/store";
import Auth from "./components/Auth/Auth";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import SidePanel from "./components/SidePanel/SidePanel";
import ProfileContainer from "./components/Profile/ProfileContainer";


function App() {
  return (
    <div className="app-wrapper">
      <Navbar/>
      <div className="app-wrapper-content">
        <Switch>
          <Route path="/auth" component={Auth} exact />
          <Route path="/profile/:id" component={ProfileContainer} />
        </Switch>
      </div>
      <SidePanel/>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   initializedIsAuth: state.app.initializedIsAuth,
// });
//
// const AppContainer = compose(
//   withRouter,
//   connect(mapStateToProps, { initializeApp, setUserData })
// )(App);

const MainApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;
