import React, {useState} from 'react'
import DropZone from '../DropZone'
import Papa from 'papaparse'
import ApiController from '../ApiController'

export default function Register() {

  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const messageResponse = {};

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
    console.log(parsedData);
    try {
      const res = await ApiController.post('https://localhost:8888/list', parsedData)
      console.log(res)
      messageResponse = res;
    } catch (error) {
      console.error("ops! ocorreu um erro" + error);
    }
  }
  return (
    <div>
      <form>
        <input type="file" name="file" accept=".csv" onChange={changeHandler} style={{ display: "block", margin: "10px auto" }}></input>
        <button type="button" onClick={submitToApi}>Cadastrar itens</button>
      </form>
      

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
