import React, { Component } from 'react';

class GetBalance extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: "0x000",
      balance: 0,
    }
  }

  async componentDidMount() {
    let myBalance = await this.getBalance(this.props.account);
    this.setState({ balance: myBalance });
  }

  async getBalance(account) {
    const web3 = this.props.web3;
    return await web3.eth.getBalance(account);
  }

  render() {
    //console.log(this.props)
    //console.log(this.state)
    return (
      <div>
        <span>Balance: {this.state.balance}</span>
      </div>

    )
  }
}

export default GetBalance;
