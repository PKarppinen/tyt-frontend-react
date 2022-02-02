import './App.css';
import Login from './components/Login'
import useToken from './components/useToken';

function App() {
  const { token, saveToken } = useToken();

  if(!token) {
    return(
      <div>
        <Login setToken={saveToken} />
      </div>
    )
  }

  return (
      <div className="App">
        <h2>Logged in!</h2>
      </div>
  );
}

export default App;
