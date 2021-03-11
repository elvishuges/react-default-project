import React, { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import AppBarUser from "./components/HomeUser/AppBarUser/AppBarUser";
import Index from "./components/HomeUser/Index/Index";
import Room from "./Room";

import { connect } from "react-redux";
import { compose } from "redux";
import socket from "./../services/socket";

const useStyles = makeStyles((theme) => ({
  content: {
    margin: theme.spacing(3, 2, 2, 3),
  },
}));

function HomeUser(props) {
  const classes = useStyles();
  const user = {
    username: props.user.username,
    email: props.user.email,
    id: props.user.id,
  };

  const [logedSocketList, setUserListLoged] = useState([]);

  const handleNewLogedSocket = (socket) => {
    setUserListLoged((oldArray) => [...oldArray, socket.data]);
  };

  const handleRemoveLogedSocket = (socket) => {
    console.log("handleRemoveLogedSocket", socket);
  };

  useEffect(() => {
    socket.emit("onInitialPage", { user: user });

    socket.on("logedSocketList", (data) => {
      setUserListLoged(data);
    });

    socket.on("newLogedSocket", (data) => {
      handleNewLogedSocket(data);
    });

    socket.on("removeLogedSocket", (data) => {
      handleRemoveLogedSocket(data);
    });
  }, []);

  return (
    <div>
      <AppBarUser title="Início"></AppBarUser>
      <div className={classes.content}>
        <Switch>
          <Route
            path="/user/index"
            render={() => <Index logedSocketList={logedSocketList}></Index>}
          />
          <Route exact path="/sala" render={() => <Room />} />
        </Switch>
      </div>
    </div>
  );
}

const mapStateToProps = (store) => ({
  user: store.user,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(HomeUser);
