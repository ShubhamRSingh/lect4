import { Component } from 'react';
import './App.css';
// import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';

// function App() {
//   const[stateList, setStateList] = useState([]);

//   const getUsersDetails = () => {
//       axios('https://api.randomuser.me/?nat=US&results=2')
//       .then(response => {
//         console.log(response);
//         setStateList(response.data.results)
//       });
//   };
// useEffect(()=>{
//   getUsersDetails();
// },[])
  

//   return (
//     <div className="App">
//     {stateList.map((mam, idx)=>{
//       return(
//         <h1 key={idx}>{mam.name.first}</h1>
//       ) 
//     })}
//     </div>
//   );
// }

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      users: [],
      loading: false,
      message: "Load ho rha hai ji"
    }
    this.submitHandler = this.submitHandler.bind(this);
  }

  getUserDetails(){
    this.setState({
      loading: true
    })
    axios('https://api.randomuser.me/?nat=US&results=2').then(response => 
    //console.log(response)
      this.setState({
        users: [...this.state.users, ...response.data.results],
        loading: false
      })
  
    )
  }

  submitHandler(evnt){
    evnt.preventDefault();
    this.getUserDetails();
    console.log('more user loaded');
  }

  componentWillMount(){
    this.getUserDetails();
  }


  render(){
    const {loading, users} = this.state;
    //return <div className="App">{this.state.users.map( (users, mam) => <div key={mam}>{users.cell}</div>)}</div>;
    return <div className="Test">
      <form onSubmit={this.submitHandler}>
        <input type="submit" value="click here" />
      </form>
      <hr />
      {!loading ? 
      users.map((user, idx) => <div key={user.id.value}>
        <h2 style={{'marginBottom': '0'}}>{user.name.title+" "+user.name.first+" "+user.name.last}</h2>
        <p style={{'marginTop': '0'}}>{user.email}</p>
        </div>)
      :<Loading message={this.state.message} />
    }
      </div>
  }
}

export default App;
