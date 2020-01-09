import React, { Component } from "react";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import TokenContract from "./contracts/SmartPiggiesBacon.json";
import getWeb3 from "./getWeb3";

/* import components */
import GetBalance from './components/getBalance';


import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      totalSupply: 0,
      interest: 0,
    };
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      //console.log(networkId)
      const deployedNetwork = TokenContract.networks[networkId];
      //console.log(deployedNetwork)
      const instance = new web3.eth.Contract(
        TokenContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.get().call();

    // Update state with the result.
    //this.setState({ storageValue: response });
  };

  getSupply = async () => {
    let { accounts, contract } = this.state;
    let totalSupply = await contract.methods.totalSupply().call({from: accounts[0]});
    console.log(totalSupply);
    this.setState({ totalSupply });
  }

  handleInput = (event) => {
    console.log(event.target.name)
    console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  }

  handleInterest = () => {
    const { accounts, contract } = this.state;
    const { interest } = this.state
    console.log(this.state.interest);
  }

  render() {
    //console.log(this.state);
    let { totalSupply: supply } = this.state;
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <span>Account: {this.state.accounts[0]}</span>
        <br></br>
        <br></br>
        <GetBalance web3={this.state.web3} account={this.state.accounts[0]} />
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
        <div><button onClick={this.getSupply}>Supply</button></div>
        <div>{(supply > 0) ? supply : 0}</div>

        <br></br>
      <form>
        <div className="form-group">
          <label htmlFor="interest">Interest Amount</label>
          <input
            name="interest"
            className="form-control"
            id="interest"
            onChange={this.handleInput}
          />
          <small id="emailHelp" className="form-text text-muted">Interest amount</small>
        </div>
      </form>

      <button onClick={this.handleInterest} >Interest</button>

      <button onClick={this.handleCreate}>Create</button>
      </div>
    );
  }
}

export default App;
