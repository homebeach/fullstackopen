import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer'; // Import setFilter with curly braces

const Filter = () => {

  const filter = useSelector(state => {
    console.log('Current State: ', state);
    return state.filter;
  });    
  
  const dispatch = useDispatch();

    const handleChange = (event) => {
        const newFilter = event.target.value;
        dispatch(setFilter(newFilter));
    }
    
    const style = {
        marginBottom: 10
    };
    
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter