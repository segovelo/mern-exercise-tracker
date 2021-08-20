import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const User = props => (
  <tr>
    <td>{props.user.username}</td>
    <td>
      <Link to={"/edit-user/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a>
    </td>

  </tr>
)
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
export default class CreateUser extends Component {
  constructor(props) {  
    super(props); 

    this.onChangeUsername = this.onChangeUsername.bind(this);  
    this.onChangeFirstname = this.onChangeFirstname.bind(this); 
    this.onChangeSurname = this.onChangeSurname.bind(this); 
    this.onChangeDOB = this.onChangeDOB.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this); 
    this.onChangeTelephone = this.onChangeTelephone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this); 
    this.onSubmit = this.onSubmit.bind(this); 
    this.deleteUser = this.deleteUser.bind(this); 
    this.state = {  
      users: [], 
      username: '',
      firstname: '',
      surname: '',
      dob: new Date(),
      address: '',
      telephone: '',
      email: '' 
    };  
  } // End of constructor(props)


  componentDidMount() {
    axios.get('http://localhost:5000/users/')
     .then(response => {
       this.setState({ users: response.data });
     })
     .catch((error) => {
        console.log(error);
     })
  }


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
    const newUser = {
      username: this.state.username,
      firstname: this.state.firstname,
      surname: this.state.surname,
      dob: this.state.dob,
      address: this.state.address,
      telephone: this.state.telephone,
      email: this.state.email
    };
    
    console.log(newUser);
    axios.post('http://localhost:5000/users/add', newUser)                
      .then(res => console.log(res.data));

      this.setState({
        username: '',
        firstname: '',
        surname: '',
        dob: new Date(),
        address: '',
        telephone: '',
        email: ''   
       })
       window.location = '/';
  }

  userList() {
    return this.state.users.map(currentUser => {
      return <User user={currentUser} deleteUser={this.deleteUser} key={currentUser._id}/>;
    })
  }

  deleteUser(id) {  
    axios.delete('http://localhost:5000/users/delete/'+id)  
    .then(res => console.log(res.data)); 

    this.setState({  
    users: this.state.users.filter(el => el._id !== id)  
    })  
  }


  render() {
    return (
        <div>
          <h3>Create New User</h3>
          <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Existing Users</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.userList() }
          </tbody>
        </table>
        <h3>New User Details</h3>
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
              <input type="submit" value="Create User" className="btn btn-primary" />
            </div>
          </form>
        </div>    
    )
  }
}