import { useState } from "react";
import useFetch from "./useFetch";

const url = 'http://25.39.222.206:5000/api/ode';
const Create = () => {
  const [equation, setEquation] = useState('');
  //const [border, setBorder] = useState('');
  const [eq_type, setEq_type] = useState('simple');
  const [n, setN] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const differential_equation = { equation, eq_type, n };

    fetch(url, {
      credentials: "include",
      method: 'POST', mode:'no-cors',
      headers: { "Content-Type": "application/json", 'Accept': 'application/json','API-Key': 'secret' },
      body: JSON.stringify(differential_equation)
    }).then((response) => {
      return response.text();
    })
      .then((data) => {
      console.log(data);
    });
  }

  

  // const { data, error, isPending } = useFetch('http://25.39.222.206:5000/api/ode');
  // console.log(xhr.responseText);

  
  return (
    <div className="create">
      <h2>Set the parameters</h2>
      <form onSubmit={handleSubmit}>
        <label>Set the left part of equation:</label>
        <input 
          type="text" 
          required 
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
        />
        {/* <label>Set the border:</label>
        <input 
          type="text" 
          required 
          value={border}
          onChange={(e) => setBorder(e.target.value)}
        /> */}
        <label>Set the eq_type:</label>
        <select
          value={eq_type}
          onChange={(e) => setEq_type(e.target.value)}
        >
          <option value="simple">simple</option>
          <option value="hard">hard</option>
        </select>
        <label>Set n:</label>
        <input 
          type="text" 
          required 
          value={n}
          onChange={(e) => setN(e.target.value)}
        />
        <button>Submit</button>
      </form>

      {/* <p>{data}</p> */}
    </div>

    
  );
}
 
export default Create;

// "border": [
//   [
//     "y",
//     "0",
//     "1"
//   ],
//   [
//     "y'",
//     "0",
//     "0"
//   ]
// ],