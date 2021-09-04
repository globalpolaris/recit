import Home from "./pages/Home";
import Journals from "./pages/Journals";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Logout from "./adapters/Logout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import AddJournal from "./pages/AddJournal";
import NotFound from "./pages/404";

const theme = createTheme({
  palette: {
    primary: {
      light: "#00b7bf",
      main: "#008b91",
      dark: "#006266",
    },
    secondary: {
      light: "#ff70b1",
      main: "#ff4599",
      dark: "#d43b80",
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/notes" component={Journals} />
          <Route path="/signup" component={RegisterPage} />
          <Route path="/create-note" component={AddJournal} />
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={Logout} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
