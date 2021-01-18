import { useState } from 'react';
import {
  BrowserRouter, Link, Route, Switch, Redirect
} from 'react-router-dom';
import { getUserByUserName$, updateProfileVisibility$ } from '../shared/api-services/api-services';
import { Homepage } from './Homepage';
import { Login } from './Login';
import { Profile } from './Profile';
import { Users } from './Users';

export function AppRouter() {

  const [id, setId] = useState(null as number | null);
  const [userName, setUserName] = useState(null as string | null);
  const [isPrivate, setIsPrivate] = useState(null as 1 | 0 | null);
  // const [id, setId] = useState(2);

  const resetState = () => {
    setId(null);
    setUserName(null);
    setIsPrivate(null);
  }

  const doLogin = (userName: string) => {
    if (userName === null || userName === undefined || userName.trim().length === 0) {
      return;
    }

    getUserByUserName$(userName).pipe(
    ).subscribe(user => {
      setUserName(userName);
      setId(user.id);
      setIsPrivate(user.isPrivate);
    });
  };

  const updateProfileVisibility = (isPrivate: boolean) => {
    updateProfileVisibility$({ isPrivate, userId: id as number}).subscribe(_ => {
      setIsPrivate(isPrivate === true ? 1 : 0);
    });
  };

  return (
    <BrowserRouter>
      <div>
        <div>
          {
            id !== null 
            ? <span>Hello {userName}!</span>
            : ''
          }
        </div>
        <span>
          <Link to="/home">Home</Link> ||
        </span>

        <span>
          <Link to={`/profile/${userName}`}>Profile</Link> ||
        </span>

        <span>
          <Link to="/users">User List</Link> ||
        </span>

        {
          id === null
            ? 
            <span>
              <Link to="/login">Login</Link>
            </span>
            : <button onClick={() => resetState()}>Logout</button>
        }

      </div>

      <Switch>
        <Route path="/home">
          {
            id !== null
            ? <Homepage id={id}/>
            : <span>
              <Redirect to="/login" />
            </span>
          }
        </Route>

        <Route path="/users">
          {
            id !== null
            ? <Users id={id}></Users>
            : <span>
              <Redirect to="/login" />
            </span>
          }
        </Route>

        <Route path="/profile/:username">
          <Profile id={id} isPrivate={isPrivate === 1 ? true : false} toggle={(isPrivate) => updateProfileVisibility(isPrivate)}></Profile>
        </Route>

        <Route path="/login">
          <Login login={(userName) => doLogin(userName)}></Login>
          {
            id !== null
            ? 
            <span>
              <Redirect to="/home" />
            </span>
            : ''
          }
        </Route>

        {/* It must be at the bottom */}
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}