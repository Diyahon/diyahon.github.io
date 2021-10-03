import './App.css';
import { Switch, Route } from 'react-router-dom'
import Dashboard from "./components/Dashboard";
import Onboarding from "./components/Onboarding";

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Dashboard}/>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/onboarding' component={Onboarding}/>
    </Switch>
  );
}

export default App;
