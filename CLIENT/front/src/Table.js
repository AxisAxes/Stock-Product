import React, { useEffect, useState } from 'react'
import ApiController from './ApiController';

export default function Table() {

  const [dataState, setDataState] = useState();


  useEffect(()=>{
    ApiController.get('http://localhost:8888/list').then((response) => setDataState(response.data))
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });

  }, [])
  console.log(setDataState)
  return (
    <div>
      {setDataState}
     
    </div>
    
  )
}




// import React, { Component } from 'react'

// export default class Table extends Component {
//     constructor(props){
//       super(props);
//       this.state = {apiResponse:""}
//       console.log(this.state);
//     }
//     callApi(){
//       fetch('/').then(res=>res.text()).then(res=>this.setState({apiResponse:res}))
//       console.log(this.state.apiResponse)
//     }
//     componentDidMount(){
//       this.callApi();
//       console.log(this.state.apiResponse)
//     }
  
//   render() {
//     return (
//       <div>{this.state.apiResponse}</div>
//     )
//   }
// }
