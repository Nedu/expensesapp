import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import Home from './Components/Home/Home';
import Expenses from './Components/Expenses/Expenses';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      transaction_date: '',
      amount: '0',
      reason: ''
    }
  }

  componentDidMount() {
    this.getExpenses();
  }

  getExpenses = () => {
    axios.get(`http://localhost:5000/expenses`)
    .then(res => {
      console.log(res);
      this.setState({ expenses: res.data.response })
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleNewExpenses = e => {
    this.setState({ [e.target.name]: e.target.value});
  };

  addExpense = e => {
    e.preventDefault();
    let expense;
    if(this.state.amount.includes('EUR')){
      axios.get(`https://free.currencyconverterapi.com/api/v5/convert?q=EUR_GBP&compact=ultra`)
      .then((res => {
        console.log(res.data.EUR_GBP);
        expense = {
          transaction_date: this.state.transaction_date,
          amount: ((parseFloat(this.state.amount) * res.data.EUR_GBP) + (0.2 * parseFloat(this.state.amount) * res.data.EUR_GBP)),
          VAT: (0.2 * parseFloat(this.state.amount) * res.data.EUR_GBP),
          reason: this.state.reason
        };
      }))
      .then(() => {
        axios.post('http://localhost:5000/expenses', expense)
        .then(savedExpense => {
          console.log(savedExpense);
          this.setState({
            transaction_date: '',
            amount: '0',
            reason: ''
          });
          window.location.reload();
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
    } 
    else {
      expense = {
        transaction_date: this.state.transaction_date,
        amount: ((parseFloat(this.state.amount)) + (0.2 * parseFloat(this.state.amount))),
        VAT: (0.2 * parseFloat(this.state.amount)),
        reason: this.state.reason
      };
    
    axios.post('http://localhost:5000/expenses', expense)
    .then(savedExpense => {
      console.log(savedExpense);
      this.setState({
        transaction_date: '',
        amount: '0',
        reason: ''
      });
      window.location.reload();
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/expenses" render={props => <Expenses {...props} expenses={this.state.expenses} handleNewExpenses={this.handleNewExpenses} addExpense={this.addExpense} state={this.state} />} />
      </div>
    );
  }
}

export default App;
