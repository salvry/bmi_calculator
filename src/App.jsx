import { useState } from 'react';
import HeightIcon from '@mui/icons-material/Height';
import ScaleIcon from '@mui/icons-material/Scale';
import './App.css';


function App() {
  const [ height, setHeight ] = useState(0);
  const [ weight, setWeight ] = useState(0);
  const [ bmi, setBMI ] = useState();
  const [ weightCategory, setWeightCategory ] = useState();

  const heightSquared = Math.pow(height/100, 2);
  
  const calculateBMI = () => {
    if( weight > 0 && height > 0){
      const bmi = Number((weight / heightSquared).toFixed(1));
      setBMI(bmi);
      setWeightCategory(defineWeightCategory(bmi));
    }
    else{
    alert("Please give a valid height (m) and weight (kg)");
    }
  }
  const defineWeightCategory = (bmi) => {
    if(bmi < 18.4){
      return "under-weight";
    }
    else if(bmi >= 18.4 && bmi <= 24.9 ){
      return "normal-weight";
    }
    else if(bmi >= 25.0 && bmi <= 29.9){
      return "over-weight";
    }
    else if(bmi >= 30.0 && bmi <= 34.9){
      return "obesity";
    }
    else if(bmi >= 35.0 && bmi <= 39.9){
      return "extreme-obesity";
    }
    else if(bmi >= 40.0){
      return "morbid-obesity";
    }
  }


  const minNormalWeight =  Number((heightSquared * 18.4).toFixed(1));
  const maxNormalWeight =  Number((heightSquared * 24.9).toFixed(1));

  return (
    <div className="App">
      <h1>BMI calculator</h1>
      <HeightIcon className='icon'/>
      <input type='number' id='height' placeholder='Height in cm' onChange={e => setHeight(e.target.value)}></input>
      <ScaleIcon className='icon'/>
      <input type='number' id='weight' placeholder='Weight in kg' onChange={e => setWeight(e.target.value)}></input>
      <button onClick = {calculateBMI}>Calculate BMI</button>
      <div id='weight-label' className={`${weightCategory}`}>
        {weightCategory === "normal-weight" || weightCategory === "morbid-obesity" || weightCategory === "extreme-obesity" ? 
        <p id='bmi'>{bmi === NaN || bmi === undefined ? '' : `Your BMI is ${bmi} which means ${weightCategory.replace("-", " ")}.*`}</p>
        : <p id='bmi'>{bmi === NaN || bmi === undefined ? '' : `Your BMI is ${bmi} which means ${weightCategory.replace("-", "")}.*`}</p>
        } 
      <p>{ weightCategory === undefined ? '' : `Healthy weight range for your height is ${minNormalWeight} kg - ${maxNormalWeight} kg.`}</p>
      {bmi >= 25.0 && <p>{`You have ${(weight-maxNormalWeight).toFixed(1)} kg to normal weight.`}</p>}
      </div>
      <div className="footer">
      {bmi !== undefined &&
      <p>*Please note that BMI is only a rough indicator of your weight and physical health.</p>}
      </div>
      </div>
  );
}

export default App;