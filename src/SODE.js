import { useState } from "react";
import useFetch from "./useFetch";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const url = 'http://25.39.222.206:5000/api/sode';
const SODE = () => {
  const [equation1, setEquation1] = useState('');
  const [equation2, setEquation2] = useState('');
  const [data, setData] = useState(null);
  const [x_t, setBorder1] = useState('');
  const [x_border, setBorder2] = useState('');
  const [x_diff_t, setBorder3] = useState('');
  const [x_diff_border, setBorder4] = useState('');
  const [y_t, setBorder5] = useState('');
  const [y_border, setBorder6] = useState('');
  const [y_diff_t, setBorder7] = useState('');
  const [y_diff_border, setBorder8] = useState('');
  const [fetchErr, setError] = useState(0);
  
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
	var code = 0;
	setData({"loading": "Выполняется решение, подождите..."});
	
	const equations = [equation1, equation2];
	
	var border = []; //[["y", y_x, y_border]];
	
	
	if (x_t != '' && x_border != '') {
		border.push(["x", x_t, x_border]);
	}
	if (x_diff_t != '' && x_diff_border != '') {
		border.push(["x'", x_diff_t, x_diff_border]);
	}
	if (y_t != '' && y_border != '') {
		border.push(["y", y_t, y_border]);
	}
	if (y_diff_t != '' && y_diff_border != '') {
		border.push(["y'", y_diff_t, y_diff_border]);
	}
	
    const differential_equation = { equations, border };

		{/* fetch(url, {
      credentials: "include",
      method: 'POST', mode:'no-cors',
      headers: { "Content-Type": "application/json", 'Accept': 'application/json','API-Key': 'secret' },
      body: JSON.stringify(differential_equation)
    }).then((response) => {
      return response.text();
    })
      .then((data) => {
      console.log(data);
		}); */}
	
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

  

  // const { data, error, isPending } = useFetch('http://25.39.222.206:5000/api/ode');
  // console.log(xhr.responseText);

  
  return (
     <div className="create">
      <h2>Решение системы ОДУ</h2>
      <form onSubmit={handleSubmit}>
        <label>Введите дифференциальные уравнения:</label>
        <p>По x': <div style={{ display: 'inline-block' }}><input 
          type="text" 
          required 
          value={equation1}
          onChange={(e) => setEquation1(e.target.value)}
        /> </div> = 0</p>
		<p>По y': <div style={{ display: 'inline-block' }}><input 
          type="text" 
          required 
          value={equation2}
          onChange={(e) => setEquation2(e.target.value)}
        /> </div> = 0</p>
        
		
		<label>Введите граничные условия:</label>
        <p>x(<div style={{ display: 'inline-block' }}>
		<input 
          type="text" 
		  size="1"
          value={x_t}
          onChange={(e) => setBorder1(e.target.value)}
        /></div>)
		 =  <div style={{ display: 'inline-block' }}>
		<input 
          type="text" 
		  size="1"
          value={x_border}
          onChange={(e) => setBorder2(e.target.value)}
        /></div>
		</p>
		<p>x'(<div style={{ display: 'inline-block' }}>
		<input 
          type="text" 
		  size="1"
          value={x_diff_t}
          onChange={(e) => setBorder3(e.target.value)}
        /></div>)
		 =  <div style={{ display: 'inline-block' }}>
		<input 
          type="text" 
		  size="1"
          value={x_diff_border}
          onChange={(e) => setBorder4(e.target.value)}
        /></div>
		</p>
         <p>y(<div style={{ display: 'inline-block' }}>
		<input 
          type="text" 
		  size="1"
          value={y_t}
          onChange={(e) => setBorder5(e.target.value)}
        /></div>)
		 =  <div style={{ display: 'inline-block' }}>
		<input 
          type="text" 
		  size="1"
          value={y_border}
          onChange={(e) => setBorder6(e.target.value)}
        /></div>
		</p>
		<p>y'(<div style={{ display: 'inline-block' }}>
		<input 
          type="text" 
		  size="1"
          value={y_diff_t}
          onChange={(e) => setBorder7(e.target.value)}
        /></div>)
		 =  <div style={{ display: 'inline-block' }}>
		<input 
          type="text" 
		  size="1"
          value={y_diff_border}
          onChange={(e) => setBorder8(e.target.value)}
        /></div>
		</p>
        <input type="submit" value="Отправить" class="submit"  />
      </form>

      { data != undefined &&
	  data.solution != undefined &&
      data.solution[0] != "Нет решения" &&
	  <div>
	  <h3>Решения</h3>
	  <MathJaxContext config={config}>{
		
	    data.solution.map((val, index) => (
		  <div align="center"><MathJax inline dynamic>{`$ ${val} $`}</MathJax><br /><br /></div>
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
	
	<a href="/ode"><button>Запустить решатель ОДУ</button></a>
    </div>

    
  );
}
 
export default SODE;
