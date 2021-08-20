import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


const years = Array.from({length: 101}, (_, i) => ((new Date()).getFullYear()-i) );
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this); 
    this.onChangeSurname = this.onChangeSurname.bind(this); 
    this.onChangeDOB = this.onChangeDOB.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this); 
    this.onChangeTelephone = this.onChangeTelephone.bind(this);    this.onChangeEmail = this.onChangeEmail.bind(this); 
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        username :'',
        firstname: '',
        surname: '',
        dob: new Date(),
        address: '',
        telephone: '',
        email: '' 
    };
    
  } // End of constructor(props)

  componentDidMount() {
    axios.get('http://localhost:5000/users/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          firstname: response.data.firstname,
          surname: response.data.surname,
          dob: new Date(response.data.dob),
          address: response.data.address,
          telephone: response.data.telephone,
          email: response.data.email,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

  }  // End of componentDidMount()

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeFirstname(e){
    this.setState({
      firstname: e.target.value
    });
  }
  onChangeSurname(e){
    this.setState({
      surname: e.target.value
    });
  }
  onChangeDOB(date){
    this.setState({
      dob: date
    });
  }
  onChangeAddress(e){
    this.setState({
      address: e.target.value
    });
  }
  onChangeTelephone(e){
    this.setState({
      telephone: e.target.value
    });
  }
  onChangeEmail(e){
    this.setState({
       email: e.target.value
    });
  }


  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      firstname: this.state.firstname,
      surname: this.state.surname,
      dob: this.state.dob,
      address: this.state.address,
      telephone: this.state.telephone,
      email: this.state.email
    };
    console.log(user);
    axios.post('http://localhost:5000/users/update/'+this.props.match.params.id, user)
      .then(res => console.log(res.data));    
    window.location = '/user';
  } // End of onSubmit(e)


  render() {
    return (
      <div>
        <h3>Edit User</h3>
        <form onSubmit={this.onSubmit}>

          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group"> 
              <label>Firstname: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.firstname}
                  onChange={this.onChangeFirstname}
                  />
            </div>
            <div className="form-group"> 
              <label>Surname: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.surname}
                  onChange={this.onChangeSurname}
                  />
            </div>
            <div className="form-group"> 
              <label>D.O.B. : </label>
              <div>
              <DatePicker
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled
                }) => (
                  <div
                    style={{
                      margin: 10,
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                      {"<"}
                    </button>
                    <select
                      value={date.getFullYear()}
                      onChange={({ target: { value } }) => changeYear(value)}
                    >
                      {years.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
          
                    <select
                      value={months[date.getMonth()]}
                      onChange={({ target: { value } }) =>
                        changeMonth(months.indexOf(value))
                      }
                    >
                      {months.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
          
                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                      {">"}
                    </button>
                  </div>
                )}
                selected={this.state.dob}
                onChange={date => this.onChangeDOB(date)}
              />
              </div>
            </div>
            <div className="form-group"> 
              <label>Address: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.address}
                  onChange={this.onChangeAddress}
                  />
            </div>
            <div className="form-group"> 
              <label>Telephone: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.telephone}
                  onChange={this.onChangeTelephone}
                  />
            </div>
            <div className="form-group"> 
              <label>Email: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  />
            </div>

          <div className="form-group">
            <input type="submit" value="Edit User" className="btn btn-primary" />
          </div>
        </form>
 
      </div>
    )
  }
}