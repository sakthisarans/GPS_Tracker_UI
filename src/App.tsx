import AuthProvider from './Auth/AuthProvider';
import Routes from './Routes'
function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
    
  );
}

export default App;
