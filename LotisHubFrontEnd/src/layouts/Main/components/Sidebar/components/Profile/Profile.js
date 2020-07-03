import React, { useEffect }  from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography, Button, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../../../../_actions';
//import { userConstants } from '../../../../../../_constants';



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  },
  LoginButtons: {
    marginTop: theme.spacing(1)
  },
  LogoutButtons: {
    marginTop: theme.spacing(1)
  },
  RegisterButton: {
    margin: theme.spacing(1)
  },
  modifyButton: {
    margin: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const { history } = props;
  localStorage.removeItem('user');

  const classes = useStyles();
  //const users = useSelector(state => state.users);
  // const authuser = useSelector(state => state.authentication.user);
  // const loggingIn = useSelector(state => state.authentication.loggedIn);
  const dispatch = useDispatch();
  
  useEffect(() => {
    //dispatch(userActions.getAll());
    //dispatch(userActions.logout());
  }, []);

  // function handleDeleteUser(id) {
  //   dispatch(userActions.delete(id));
  // }

  // const handleSignIn = event => {
  //   event.preventDefault();
  //   //history.push('/');
  // };

  const handleSignOut = event => {
    event.preventDefault();
    window.location.assign('/sign-in');
    dispatch(userActions.logout());
//    history.push('/sign-in');
  };

  // const handleRegister = event => {
  //   event.preventDefault();
  //   window.location.assign('/sign-up');
  //   //history.push('/');
  // };

  function Greeting(){
    //const authuser = localStorage.getItem('user');
    //const isLoggedIn = loggingIn;
    const isLoggedIn = 0;
    if( !isLoggedIn ) {

      const user = {
        //name: authuser.username,
        name: 'LotisHub',
        avatar: '/images/avatars/avatar_10.png',
        bio: '로그인하세요'
      };

      return (
        <div
          {...rest}
          className={clsx(classes.root, className)}
        >
          <Avatar
            alt="Person"
            className={classes.avatar}
            component={RouterLink}
            src={user.avatar}
            to="/settings"
          />
          <Typography
            className={classes.name}
            variant="h4"
          >
            {user.name}
          </Typography>
          <Typography variant="body2">{user.bio}</Typography>

          <Grid
            className={classes.socialButtons}
            container
            spacing={2}
          >
            <Grid item>
                <Button
                  className={classes.LoginButtons}
                  color="primary"
                  fullWidth
                  size="small"
                  type="submit"
                  variant="contained"
                  href="/sign-in"

                  //onClick={handleSignIn}
                >
                  로그인
                </Button>
            </Grid>
            <Grid item>
                <Button
                  className={classes.RegisterButton}
                  color="primary"
                  fullWidth
                  size="small"
                  type="submit"
                  variant="contained"
                  href="/sign-up"
                  //onClick={handleRegister}
                >
                  회원가입
                </Button>
            </Grid>
          </Grid>
        </div>
      ); // 로그인, 회원가입
    } else {
      const user = {
        //name: authuser.username,
        name: '김철수',        // 토큰 작업하고 주석 풀것
        avatar: '/images/avatars/avatar_10.png',
        bio: '환영합니다'
      };

      return (
        <div
        {...rest}
        className={clsx(classes.root, className)}
        >
        <Avatar
          alt="Person"
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/settings"
        />
        <Typography
          className={classes.name}
          variant="h4"
        >
          {user.name}
        </Typography>
        <Typography variant="body2">{user.bio}</Typography>
        
        <Grid
        className={classes.socialButtons}
        container
        spacing={2}
        >
        <Grid item>
          <Button
            className={classes.LoginButtons}
            color="primary"
            fullWidth
            size="small"
            type="submit"
            variant="contained"
            onClick={handleSignOut}
          >
            로그아웃
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.modifyButton}
            color="primary"
            fullWidth
            size="small"
            type="submit"
            variant="contained"
            href="/account"
            //onClick={handleRegister}
          >
            회원정보수정
          </Button>
        </Grid>
      </Grid>
      </div>
      );   // 로그아웃, 회원정보수정
    }

  } 

  return (
    // <div
    //   {...rest}
    //   className={clsx(classes.root, className)}
    // >
    //   <Avatar
    //     alt="Person"
    //     className={classes.avatar}
    //     component={RouterLink}
    //     src={user.avatar}
    //     to="/settings"
    //   />
    //   <Typography
    //     className={classes.name}
    //     variant="h4"
    //   >
    //     {user.name}
    //   </Typography>
    //   <Typography variant="body2">{user.bio}</Typography>


    // </div>
      <Greeting />

  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
