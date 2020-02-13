const counter  = (state= 0, action  ) => {
  switch(action.type){
    case "INCREMENT": 
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default: 
      return state;
      
  }
};

const createStore = (reducer) => {
  let state;
  let listeners =[];
  const getState = () => state;
  
  const dispatch = (action) =>{
    state = reducer(state, action);
    listeners.forEach(listener => listener())
  };
  
  const subscribe = (listener) =>{
    listeners.push(listener);
    return () =>{
      listener = listeners.filter(l => l !== listener);
    }
  }
  return { dispatch, subscribe, getState};
};

const store = createStore(counter);

const Counter = ({ 
  value, 
  onDecrement, 
  onIncrement 
}) => (
  <div>
    <h1>{value}</h1>
    <div>
      <button onClick={onDecrement}>+</button> 
      <button onClick={onIncrement}>-</button>
    </div>
);

const render = () => {
  ReactDOM.render(
      <Counter value={store.getState()}
      onIncrement ={()=>
        store.dispatch({
         type: "INCREMENT"
       })
      }
      onDecrement = {
        ()=>
        store.dispatch({
         type: "DECREMENT"
     
       })
      }
    />,
    document.getElementById('root')
  )
};

store.subscribe(render);
render();