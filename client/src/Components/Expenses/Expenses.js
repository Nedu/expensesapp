import React, { Component } from 'react';
import {
  Jumbotron,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Form, 
  FormGroup, 
  Label, 
  Input, 
} from 'reactstrap';

class Expenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }

    render() {
        return <div>
            <Jumbotron>
              <h1 className="display-3">Expenses Tracker!</h1>
              <p className="lead">
                <Button color="primary" onClick={this.toggle}>
                  Add Expenses
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}>
                    Add New Expense
                  </ModalHeader>
                  <ModalBody>
                    <Form onSubmit={this.props.addExpense}>
                      <FormGroup row>
                        <Label for="transaction_date" sm={2}>
                          Transaction Date
                        </Label>
                        <Col sm={10}>
                          <Input type="text" onChange={this.props.handleNewExpenses} name="transaction_date" value={this.props.state.transaction_date} id="transaction_date" placeholder="YYYY-MM-DD" required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="amount" sm={2}>
                          Amount
                        </Label>
                        <Col sm={10}>
                          <Input type="text" onChange={this.props.handleNewExpenses} name="amount" value={this.props.state.amount} id="amount" placeholder="Enter expense amount" required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="amount" sm={2}>
                          VAT
                        </Label>
                        <Col sm={10}>
                          <Input type="text" onChange={this.props.handleNewExpenses} name="VAT" value={0.2 * parseFloat(this.props.state.amount)} id="VAT" required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="reason" sm={2}>
                          Reason
                        </Label>
                        <Col sm={10}>
                          <Input type="text" name="reason" value={this.props.state.reason} onChange={this.props.handleNewExpenses} id="reason" placeholder="Enter expense reason" required />
                        </Col>
                      </FormGroup>
                      <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                          <Button>Submit</Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </ModalBody>
                </Modal>
              </p>
            </Jumbotron>
            <h2>List of Expenses</h2>
            <Table dark responsive>
              <thead>
                <tr>
                  <th>Transaction Date</th>
                  <th>Amount (Pounds)</th>
                  <th>VAT</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {this.props.expenses.map(expense => (
                  <tr key={expense.id}>
                    <td>{expense.transaction_date.split('T')[0]}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.VAT}</td>
                    <td>{expense.reason}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>;
    }
};

export default Expenses;