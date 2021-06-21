import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from './store';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Components/Dashboard/Dashboard'
import Alert from './Components/Layout/Alert'
import Landing from './Components/Landing/Landing';
import UpdateProfile from './Components/User/UpdateProfile';
import AddGoalCard from './Components/User/AddGoalCard';
import Login from './Components/Login/Login';
import Calculators from './Components/Calculators/Calculators';
import Bmr from './Components/Calculators/Bmr'
import Bmi from './Components/Calculators/Bmi'
import Lorenz from './Components/Calculators/Lorenz'
import BrocBrugsh from './Components/Calculators/BrocBrugsh'
import Whr from './Components/Calculators/Whr'
import Ymca from './Components/Calculators/Ymca'
import HarrisBenedict from './Components/Calculators/HarrisBenedict'
import MifflinStJeor from './Components/Calculators/MifflinStJeor'
import ExerciseForm from './Components/Trainings/Training/ExerciseForm'
import Training from './Components/Trainings/Training/Training'
import Signup from './Components/Signup/Signup';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './Components/Routing/PrivateRoute';
import { loadUser } from './actions/auth';
import './App.css';
import { Provider } from 'react-redux';
import Trainings from './Components/Trainings/Trainings';


if (localStorage.token) {
  setAuthToken(localStorage.token)
};


const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store = {store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route path='/' exact component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route path='/signup' exact component={Signup} />
              <Route path='/login' exact component={Login} />
              <Route path='/calculators' exact component={Calculators} />
              <Route path='/calculators/bmi' exact component={Bmi} />
              <Route path='/calculators/bmr' exact component={Bmr} />
              <Route path='/calculators/whr' exact component={Whr} />
              <Route path='/calculators/broc-brugsh' exact component={BrocBrugsh} />
              <Route path='/calculators/lorenz' exact component={Lorenz} />
              <Route path='/calculators/ymca' exact component={Ymca} />
              <Route path='/calculators/harris-benedict' exact component={HarrisBenedict} />
              <Route path='/calculators/mifflin-st-jeor' exact component={MifflinStJeor} />
              <PrivateRoute path='/dashboard' exact component={Dashboard} />
              <PrivateRoute path='/edit-account' exact component={UpdateProfile} />
              <PrivateRoute path='/add-goalcard' exact component={AddGoalCard} />
              <PrivateRoute path='/trainings' exact component={Trainings} />
              <PrivateRoute path='/add-exercise' exact component={ExerciseForm} />
              <PrivateRoute path='/training/:id' exact component={Training} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
