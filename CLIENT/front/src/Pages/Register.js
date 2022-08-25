import React, {useState} from 'react'
import Papa from 'papaparse'
import ApiController from '../ApiController'
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';

export default function Register() {

  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  var messageResponse = {};

  function warningNotification (){
    addNotification({
      title: 'Erro',
      subtitle: 'Impossivel salvar',
      theme: 'red',
      closeButton:"X",
    })
  };
  
  function successNotification (){
    addNotification({
      title: 'Sucesso!',
      subtitle: 'Tudo foi salvo com sucesso',
      theme: 'light',
      closeButton:"X",
      backgroundTop:"green",
      backgroundBottom:"yellowgreen"
    })
  };

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        setParsedData(results.data);

        setTableRows(rowsArray[0]);

        setValues(valuesArray);
      },

    });

  };
  const submitToApi = async (event) => {
    try {
      const res = await ApiController.post('http://localhost:8888/insert', parsedData)
      messageResponse = res;
      successNotification();
      
    } catch (error) {
      console.error("ops! ocorreu um erro" + error);
      warningNotification();
    }
  }
  return (
    <div>
      <form>
        <input type="file" name="file" accept=".csv" onChange={changeHandler} style={{ display: "block", margin: "10px auto" }}></input>
        <button type="button" onClick={submitToApi}>Cadastrar itens</button>
      </form>
      
        <Notifications />

      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}
