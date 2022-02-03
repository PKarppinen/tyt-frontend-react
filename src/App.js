import './App.css';

import Login from './components/Login'
import ListTrails from './components/ListTrails';

import useToken from './hooks/useToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return(
      <div>
        <Login setToken={setToken} />
      </div>
    )
  }

  return (
      <div className="App">
        <b>You are logged in!</b>
        <ListTrails token={token} />
      </div>
  );
}

export default App;
