import React, { useState, forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
//import clsx from 'clsx';
import PropTypes from 'prop-types';

import { List, ListItem, Button, colors, Collapse, Divider } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
    root: {},
    item: {
      display: 'flex',
      paddingTop: 0,
      paddingBottom: 0
    },
    level2item: {
        paddingLeft: theme.spacing(3),
    },
    button: {
      color: colors.blueGrey[800],
      padding: '10px 8px',
      justifyContent: 'flex-start',
      textTransform: 'none',
      letterSpacing: 0,
      width: '100%',
      fontWeight: theme.typography.fontWeightMedium
    },
    icon: {
      color: theme.palette.icon,
      width: 24,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(1)
    },
    active: {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      '& $icon': {
        color: theme.palette.primary.main
      }
    }
  }));

  const CustomRouterLink = forwardRef((props, ref) => (
    <div
      ref={ref}
      style={{ flexGrow: 1 }}
    >
      <RouterLink {...props} />
    </div>
  ));
  

const AppMenuItem = props => {
    const { title, href, icon, isChild, children, className, ...rest } = props;
    const classes = useStyles();
    const isExpandable = children && children.length > 0

    const [open, setOpen] = useState(false);

    function handleClick() {
      setOpen(!open);
    };

    const MenuItemRoot = !isChild ? (   //1레벨 메뉴
        <ListItem
          className={classes.item}
          disableGutters
          key={title}
          onClick={handleClick}
        >
        { !isExpandable             // 2레벨이 없는경우
         ?
            <Button
            activeclassname={classes.active}  // 로그인이 필요한 경우 클릭 버튼을 잡아서 로그인 여부를 확인하는 코드 추가 필요
            className={classes.button}
            component={CustomRouterLink}
            to={href}
            >
            <div className={classes.icon}>{icon}</div>
            {title}
            </Button>
        : 
            <Button
            activeclassname={classes.active}
            className={classes.button}
            //component={CustomRouterLink}
            onClick={handleClick}
            >
            <div className={classes.icon}>{icon}</div>
               {title}
            </Button>
            //null
        }
        
        {isExpandable && !open && <IconExpandMore />}
        {isExpandable && open && <IconExpandLess />}


        </ListItem>
    ) : (
        <ListItem
        className={classes.level2item}
        disableGutters
        key={title}
      >
      <Button
        activeclassname={classes.active}
        className={classes.button}
        component={CustomRouterLink}
        to={href}
      >
        <div className={classes.icon}>{icon}</div>
        {title}
      </Button>
        {isExpandable && !open && <IconExpandMore />}
        {isExpandable && open && <IconExpandLess />}
      </ListItem>
    )


    // const MenuItemRoot = (
    //     <ListItem 
    //         button
    //         // className={classes.chileitem} 
    //         className={classes.item} 
    //         disableGutters
    //         onClick={handleClick}
    //     >
    //       {/* Display an icon if any */}
    //       {!!icon && (
    //         <ListItemIcon className={classes.icon}>
    //           {icon}
    //         </ListItemIcon>
    //       )}
    //       <ListItemText primary={title} inset={!icon} />
    //       {/* Display the expand menu if the item has children */}
    //       {isExpandable && !open && <IconExpandMore />}
    //       {isExpandable && open && <IconExpandLess />}
    //     </ListItem>
    // )

    const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
        {children.map((child, index) => (
            <AppMenuItem {...child} key={index} />
        ))}
        </List>
    </Collapse>
    ) : null  

    return (
        <>
          {MenuItemRoot}
          {MenuItemChildren}
        </>
    )
};


AppMenuItem.propTypes = {
    className: PropTypes.string,
};
  
export default AppMenuItem;