import { useState, useEffect } from "react";
import "./App.css";

function Tempoatual(props) {
  return (
    <div>
      <span>{(props.time.h >= 10)? props.time.h : "0" + props.time.h}</span>&nbsp;:&nbsp;
      <span>{(props.time.m >= 10) ? props.time.m : "0" + props.time.m}</span>&nbsp;:&nbsp;
      <span>{(props.time.s >= 10) ? props.time.s : "0" + props.time.s}</span>&nbsp;:&nbsp;
      <span>{(props.time.ms >= 10) ? props.time.ms : "0" + props.time.ms}</span>
    </div>
  );
}

function Botomcomponent (props) {

  return(
    <div>
      {(props.status === 0)?
      <button className="stopwatch-btn stopwatch-btn-gre" onClick={props.start}>p-p-play</button>: ""
    }
    {(props.status === 1)?
    <div>
          <button className="stopwatch-btn stopwatch-btn-red" 
            onClick={props.stop}>parar</button>   
          <button className="stopwatch-btn stopwatch-btn-yel" 
           onClick={props.save}>salvar</button>
    </div> : ""
    }

{(props.status === 2)?
    <div>
          <button className="stopwatch-btn stopwatch-btn-gre" 
            onClick={props.reset}>reiniciar</button>   
    </div> : ""
    }

    </div>
    
  );

}

function App() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  const [lista, setLista] =  useState([]);



  const start = () => {
    run ();
    setStatus(1);
    setInterv(setInterval (run, 10));
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const reset = () => {
    setStatus (0);
    setTime ({ ms: 0, s: 0, m: 0, h: 0 });
  };

  const save = () => {
    setLista((lista) => [time, ...lista])
  };

   


  var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h; 
  const run = () => {
    if (updatedM === 60){
      updatedH++;
      updatedM = 0;
    }

    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;

    }

    if (updatedMs === 100) {
    updatedS++
    updatedMs = 0;

    }
    updatedMs++;

    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });


  };

  return (
    <div className="mainsection">
      <div className="clock-holder">
        <div className="stopwatch">
          <Tempoatual time={time}></Tempoatual>
          <Botomcomponent save= {save} status={status} stop={stop} start={start} reset={reset}/>
          {lista.map((item) => {return <div>
            isso aqui {`${item.h}:${item.m}:${item.s}:${item.ms}`}
          </div>})}
        </div>
      </div>
    </div>
  );
}

export default App;

