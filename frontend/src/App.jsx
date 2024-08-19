import SignUpComponent from './components/SignUp.component.jsx';
import SignInComponent from './components/SignIn.component.jsx';
import CreateNoteComponent from './components/CreateNote.component.jsx';
import './App.scss';

function App() {

  return (
    <>
      <h1>MindPad</h1>
      <SignUpComponent />
      <SignInComponent />
      <CreateNoteComponent />
    </>
  )
}

export default App;
