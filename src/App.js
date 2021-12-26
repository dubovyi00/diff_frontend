//запускать через терминал командой npm run start
//json сервер подключать во втором терминале командой npx json-server --watch data/db.json --port 8000
import ODE from './ODE';
import SODE from './SODE';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <div className="content">
          <Switch>
            <Route exact path="/">
              <ODE />
            </Route>
			<Route exact path="/ode">
              <ODE />
            </Route>
			<Route exact path="/sode">
              <SODE />
            </Route>

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
