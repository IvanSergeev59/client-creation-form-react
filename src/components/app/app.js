import React, { useState } from "react"
import Address from "../address";
import Attributes from "../attributes";
import Passport from "../passport";
import Button from 'react-bootstrap/button';

const App = () => {
  //global checking validation
  const [attributesValid, setAttributesValid] = useState(false);
  const [passportValid, setPassportValid] =useState(false);
  return (
    <section className="app">
      <Attributes setAttributesValid={setAttributesValid}/>
      <Passport setPassportValid={setPassportValid}/>
      <Address />
      <p>*Поля обязательные для заполнения</p> 
      <Button variant="primary" type="submit" disabled={!attributesValid || !passportValid}>
                Submit
      </Button>
    </section>
  );
}

export default App;
