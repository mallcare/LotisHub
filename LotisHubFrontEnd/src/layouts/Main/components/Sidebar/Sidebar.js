import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import BusinessIcon from '@material-ui/icons/Business';
import ListIcon from '@material-ui/icons/List';
import TocIcon from '@material-ui/icons/Toc';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: '대시보드',
      href: '/dashboard',
      icon: <DashboardIcon />,
      isChild: false,
      children : []
    },
    {
      title: '상품',
      href: '',
      icon: <ShoppingBasketIcon />,
      isChild: false,
      children : [ 
        {
          title : '상품조회',
          href: '/products',
          icon: <ListIcon />,
          isChild: true,
          children : []
        },
        {
          title : '상품등록',
          href: '/products',
          icon: <BorderColorIcon />,
          isChild: true,
          children : []
        }
      ]
    },
    {
      title: '거래처',
      href: '',
      icon: <BusinessIcon />,
      isChild: false,
      children : [
        {
          title : '거래처조회',
          href: '/clientlist',
          icon: <ListIcon />,
          isChild: true,
          children : []
        },
        {
          title : ' 택배사 레이아웃 매칭',
          href: '/excel-matching',
          icon: <BorderColorIcon />,
          isChild: true,
          children : []
        }
      ]
    },
    {
      title: '주문',
      href: '',
      icon: <TocIcon />,
      isChild: false,
      children : [
        {
          title : '주문조회',
          href: '/orders',
          icon: <ListIcon />,
          isChild: true,
          children : []
        },
        {
          title : '주문등록',
          href: '/products',
          icon: <BorderColorIcon />,
          isChild: true,
          children : []
        }
      ]
    },
    // {
    //   title: 'Authentication',
    //   href: '/sign-in',
    //   icon: <LockOpenIcon />
    // },
    {
      title: 'Typography',
      href: '/typography',
      icon: <TextFieldsIcon />,
      isChild: false,
      children : []
    },
    {
      title: 'Icons',
      href: '/icons',
      icon: <ImageIcon />,
      isChild: false,
      children : []
    },
    {
      title: '계정정보',
      href: '/account',
      icon: <AccountBoxIcon />,
      isChild: false,
      children : []
    },
    {
      title: '사용자 리스트',
      href: '/users',
      icon: <PeopleIcon />,
      isChild: false,
      children : []
    },
    {
      title: '시스템 환경설정',
      href: '/settings',
      icon: <SettingsIcon />,
      isChild: false,
      children : []
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
        {/* <UpgradePlan /> */}
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
