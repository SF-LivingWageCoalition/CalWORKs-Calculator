import './App.css';
import Form from './components/Form';
import FormExplanation from './components/FormExplanation';
import FormHeading from './components/FormHeading';
import $ from 'jquery';


function App() {
  return (
    <div className="App">
      <FormHeading></FormHeading>
      <FormExplanation></FormExplanation>
      <Form></Form>

      

    </div>
  );
}

export default App;
