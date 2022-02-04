import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login'
import ListTrails from './components/ListTrails';

import useToken from './hooks/useToken';

function App() {
  const { getToken, setToken } = useToken();

  if(!getToken()) {
    return(
      <div>
        <Login setToken={setToken} />
      </div>
    )
  }

  return (
      <div className="App">
        <ListTrails getToken={getToken} />
      </div>
  );
}

export default App;
