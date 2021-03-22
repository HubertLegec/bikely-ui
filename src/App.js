import "./App.css";
import { LoginForm } from "./auth/login";
import { RegisterForm } from "./auth/register";

function App() {
  return (
    <div className="App">
      <LoginForm></LoginForm>
      <RegisterForm></RegisterForm>
    </div>
  );
}

export default App;
