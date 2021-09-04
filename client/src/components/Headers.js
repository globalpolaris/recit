import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SortIcon from "@material-ui/icons/Sort";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import Logout from "../adapters/Logout";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#008b91",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  listText: {
    fontFamily: "Quicksand",
    fontWeight: 500,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const { username, isLoggedIn } = props;
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const user = isLoggedIn ? username : "Anonyme";
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <SortIcon />
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            style={{ fontFamily: "Quicksand", fontWeight: 600 }}
          >
            <Link to="/" color="inherit" className={classes.link}>
              récit
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem alignItems="center">
            <Typography
              className={classes.listText}
              style={{ display: "inline-block", marginRight: "5px" }}
            >
              Hello,
            </Typography>
            <Typography
              className={classes.listText}
              style={{ fontWeight: 700 }}
            >
              {user}
            </Typography>
          </ListItem>
        </List>
        <List>
          <ListItem
            button
            key="notes"
            component="a"
            href={isLoggedIn ? "/notes" : "login"}
          >
            <ListItemIcon>{isLoggedIn ? <MenuBookIcon /> : null}</ListItemIcon>
            <ListItemText
              primary={isLoggedIn ? "My Notes" : "Sign In"}
              classes={{ primary: classes.listText }}
            />
          </ListItem>

          <ListItem
            button
            key="journals"
            component="a"
            href={isLoggedIn ? "" : "signup"}
          >
            <ListItemIcon>{isLoggedIn ? <SettingsIcon /> : null}</ListItemIcon>
            <ListItemText
              primary={isLoggedIn ? "Account Settings" : "Register"}
              classes={{ primary: classes.listText }}
            />
          </ListItem>
        </List>
        <Divider />
        {isLoggedIn ? (
          <List>
            <ListItem button key="logout" component="a" href="logout">
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                classes={{ primary: classes.listText }}
              />
            </ListItem>
          </List>
        ) : null}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}
