import { useState } from 'react'
import './App.css'

import PropTypes from 'prop-types';

const CheckBox = ({ page, content, isChecked, onCheck }) => {
  return (
    <div className='check-box' onClick={onCheck}>
      {content ? <h3>{content}</h3> : <h3>Page {page}</h3>}
      <input type="checkbox" checked={isChecked} readOnly/>
    </div>
  );
};

CheckBox.propTypes = {
  page: PropTypes.string,
  content: PropTypes.string,
  isChecked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
};


function App() {
  const [allChecked, setAllChecked] = useState(false);
  const [checkedState, setCheckedState] = useState([false, false, false, false, false, false]);

  const handleAllCheck = () => {
    setAllChecked(!allChecked);
    setCheckedState(checkedState.map(() => !allChecked));
  }

  const handleCheck = (index) => {
    const newCheckedState = [...checkedState];
    newCheckedState[index] = !newCheckedState[index];
    setCheckedState(newCheckedState);

    setAllChecked(newCheckedState.every(item => item));
  }

  const handleDone = () => {
    setAllChecked(false);
    setCheckedState([false, false, false, false, false, false]);
  }

  return (
    <>
      <div className='wrapper'>
        <section>
          <CheckBox content="All Pages" isChecked={allChecked} onCheck={handleAllCheck}/>
        </section>
        <br />
        <section className='check-box-wrapper'>
          {checkedState.map((isChecked, index) => (
            <CheckBox key={index} page={String(index + 1)} isChecked={isChecked} onCheck={() => handleCheck(index)}/>
          ))}
        </section>
        <section className='button-wrapper'>
          <button onClick={handleDone}>Done</button>
        </section>
      </div>
    </>
  )
}

export default App