import * as React from "react";
import "./App.css";
import Main from "./containers/Main";
import { Container, Section } from "bloomer";

const logo = require("./logo.png");

class App extends React.Component {
  render() {
    return (
      <Section>
        <Container>
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Whatsapp Stats</h2>
            </div>
            <Main />
          </div>
        </Container>
      </Section>
    );
  }
}

export default App;
