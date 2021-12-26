import { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

import useFetch from "./useFetch";

const url = 'http://25.39.222.206:5000/api/ode';
const ODE = () => {
  const [equation, setEquation] = useState('');
  const [y_x, setBorder1] = useState('');
  const [y_border, setBorder2] = useState('');
  const [y_diff_x, setBorder3] = useState('');
  const [y_diff_border, setBorder4] = useState('');
  const [data, setData] = useState(null);
  const [fetchErr, setError] = useState(0);
  //var data = {};
  var code = 0;
  const config = {
    loader: { load: ["input/asciimath"] },
	asciimath: {
		delimiters: [
		  ["$", "$"],
		  ["`", "`"]
		]
	}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
	
	setData({"loading": "Выполняется решение, подождите..."});
	
	var border = []; //[["y", y_x, y_border]];
	
	if (y_x != '' && y_border != '') {
		border.push(["y", y_x, y_border]);
	}
	if (y_diff_x != '' && y_diff_border != '') {
		border.push(["y", y_diff_x, y_diff_border]);
	}
	
    const differential_equation = { equation, border };

    

	fetch(url, {
		  //credentials: "include",
		  method: 'POST', 
		  headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
		  body: JSON.stringify(differential_equation)
	}).then((response) => {
			console.log(response);
			if (response.status != 500) {
                    // error processing
					setError(0);
					return response.json();
                    
            }
			
			throw {'err': 'Произошла ошибка при обработке данных'};
	}).then((data) => {
		  setData(data);
		  code = 200;
		  console.log(data);
	}).catch((e) => {
	  console.log(e);
	  setError(500);
	});
  }


  
  return (
    <div className="create">
      <h2>Решение ОДУ</h2>
	  { fetchErr === 500 &&
	  <div>
	  <h3>Проверьте правильность ввода данных</h3>
	  <br/>
	  </div>
	}
      <form onSubmit={handleSubmit}>
        <label>Введите дифференциальное уравенение:</label>
        <p><div style={{ display: 'inline-block' }}><input 
          type="text" 
		  required
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
        /> </div> = 0</p>
        <label>Введите граничные условия:</label>
        <p>y(<div style={{ display: 'inline-block' }}>
		<input 
          type="text" 
		  size="1"
          value={y_x}
          onChange={(e) => setBorder1(e.target.value)}
        /></div>)
		 =  <div style={{ display: 'inline-block' }}>
		<input 
          type="text" 
		  size="1"
          value={y_border}
          onChange={(e) => setBorder2(e.target.value)}
        /></div>
		</p>
		<p>y'(<div style={{ display: 'inline-block' }}>
		<input 
          type="text" 
		  size="1"
          value={y_diff_x}
          onChange={(e) => setBorder3(e.target.value)}
        /></div>)
		 =  <div style={{ display: 'inline-block' }}>
		<input 
          type="text" 
		  size="1"
          value={y_diff_border}
          onChange={(e) => setBorder4(e.target.value)}
        /></div>
		</p>
        
        <input type="submit" value="Отправить" class="submit" />
      </form>

    { data != undefined &&
	  data.solution != undefined &&
      data.solution[0] != "Нет решения" &&
	  <div>
	  <h3>Решения</h3>
	  <MathJaxContext config={config}>{
		
	    data.solution.map((val, index) => (
		  <div><MathJax inline dynamic>{`$ ${val} $`}</MathJax><br /><br /></div>
	    ))

	  }</MathJaxContext></div>
	}
	
	{ data != undefined &&
	  data.solution != undefined &&
      data.solution[0] === "Нет решения" &&
	  <div>
	  <h3>Решения</h3>
	  <p>Нет решений</p>
	  </div>
	}
	
	{ data != undefined &&
	  data.err != undefined &&
	  <div>
	  <h3>{data.err}</h3>
	  </div>
	}
	
	{ data != undefined &&
	  data.loading != undefined &&
	  <div>
	  <h3>{data.loading}</h3>
	  </div>
	}
	
	<a href="/sode"><button>Запустить решатель систем ДУ</button></a>
    </div>

    
  );
}
 
export default ODE;
