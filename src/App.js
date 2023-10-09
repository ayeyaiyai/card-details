import { useState } from 'react';
import './App.css';
import cardLogo from './images/card-logo.svg';
import iconComplete from './images/icon-complete.svg';

function App() {
  // Card information states
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cvc, setCvc] = useState('');

  // Error management states
  const [cardholderNameError, setCardholderNameError] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [expirationMonthError, setExpirationMonthError] = useState(false);
  const [expirationYearError, setExpirationYearError] = useState(false);
  const [cvcError, setCvcError] = useState(false);
  const [cardNumberTypeError, setCardNumberTypeError] = useState(false);

  // Form complete visibility management state
  const [completeVisible, setCompleteVisible] = useState(false);

  function handleSubmit(e){
    e.preventDefault();

    // This section checks whether or not there's a potential error trigger - if a section is empty or if there's not a number/space in the cardNumber input.
    if ((!cardholderName || !cardNumber || !expirationMonth || !expirationYear || !cvc) || ( 
      /[^0-9\s]/.test(cardNumber) || !/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber)

    )) {
      // If one of the input fields is empty set the corresponding state to true.
      if (!cardholderName) {setCardholderNameError(true)} else {setCardholderNameError(false)};
      if (!cardNumber) {setCardNumberError(true)} else {setCardNumberError(false)};
      if (!expirationMonth) {setExpirationMonthError(true)} else {setExpirationMonthError(false)};
      if (!expirationYear) {setExpirationYearError(true)} else {setExpirationYearError(false)};
      if (!cvc) {setCvcError(true)} else {setCvcError(false)};
      if ((
        /[^0-9\s]/.test(cardNumber) || !/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber)
      ) && (cardNumber))
        {setCardNumberTypeError(true)}  
        else{setCardNumberTypeError(false);}
      console.log('cardNumberTypeError: ' + cardNumberTypeError);
    } 

    // If the error check is clear we reset the card information states and set the error triggers to false.
    else {
      setCardholderName('');
      setCardNumber('');
      setExpirationMonth('');
      setExpirationYear('');
      setCvc('');

      setCardholderNameError(false);
      setCardNumberError(false);
      setExpirationMonthError(false);
      setExpirationYearError(false);
      setCvcError(false);
      setCardNumberTypeError(false);
      setCompleteVisible(true);
    }
  }

  // This function sets the appropriate state based on the input field.
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'cardholderName':
        setCardholderName(value);
        break;
      case 'cardNumber':
        setCardNumber(value);
        break;
      case 'expirationMonth':
        setExpirationMonth(value);
        break;
      case 'expirationYear':
        setExpirationYear(value);
        break;
      case 'cvc':
        setCvc(value);
        break;
      default:
        break;
    }
  };

  function toggleComplete() {
    setCompleteVisible(false);
  }

  return (
    <div className="App">
      <div className='card-info'>
        <div className='card-section'>
          <div className='card-front'>
            <img src={cardLogo} alt='card logo' className='card-logo'></img>
            <div className='card-number'>{cardNumber || '0000 0000 0000 0000'}</div>
            <div className='card-name'>{cardholderName || 'Jane Appleseed'}</div>
            <div className='card-date'>{expirationMonth || '00'}/{expirationYear || '00'}</div>
          </div>
          <div className='card-back'>
            <div className='card-cvc'>{cvc || '000'}</div>
          </div>
        </div>
      </div>

      <div className='form-container'>
        {completeVisible ? (
          <div className={`success-message ${completeVisible ? '' : 'hidden'}`}>
            <img src={iconComplete} className='complete-icon' alt='checkmark'/>
            <span className='complete-title'>THANK YOU!</span>
            <span className='complete-message'>We've added your card details</span>
            <button className='complete-button' onClick={toggleComplete}>Continue</button>
          </div>
        ) : (
          <form className='card-form' onSubmit={handleSubmit}>
            <div className='top-card-inputs'>
              <div className='cardholder-section'>
                CARDHOLDER NAME
                <input
                maxLength={34}
                className={`cardholder-input ${cardholderNameError ? 'input-error' : ''}`}
                name='cardholderName'
                placeholder='e.g. Jane Appleseed'
                onChange={handleInputChange}
                value={cardholderName}
                ></input>
                {cardholderNameError ? <div className='error-message card-name-error'>Can't be blank</div> : ''}
              </div>


              <div className='card-number-section'>
                CARD NUMBER
                <input
                maxLength={19}
                className={`card-number-input ${cardNumberError ? 'input-error' : ''}`}
                name='cardNumber'
                placeholder='e.g. 1234 5678 9123 0000'
                onChange={handleInputChange}
                value={cardNumber}
                ></input>
                {cardNumberError ? <div className='error-message card-number-error'>Can't be blank</div> : ''}
                {cardNumberTypeError ? <div className='error-message card-number-error'>Wrong format, numbers only</div> : ''}
              </div>
            </div>

          <div className='bottom-card-inputs'>
            <div className='date-container'>
              EXP. DATE (MM/YY)
              <div className='date-inputs'>
                <input 
                pattern="[0-9]*"
                minLength={2}
                maxLength={2}
                className={`date-input month-input ${expirationMonthError ? 'input-error' : ''}`}
                name='expirationMonth'
                placeholder='MM'
                onChange={handleInputChange}
                value={expirationMonth}
                ></input>

                <input 
                pattern="[0-9]*"
                minLength={2}
                maxLength={2}
                className={`date-input year-input ${expirationYearError ? 'input-error' : ''}`}
                name='expirationYear'
                placeholder='YY'
                onChange={handleInputChange}
                value={expirationYear}
                ></input>
              </div>
              {expirationMonthError || expirationYearError ? <div className='error-message date-error'>Can't be blank</div> : ''}
            </div>

            <div className='cvc-container'>
              CVC
              <div className='cvc-input-section'>
                <input 
                pattern="[0-9]*"
                minLength={3}
                maxLength={3}
                className={`cvc-input ${cvcError ? 'input-error' : ''}`}
                name='cvc'
                placeholder='e.g. 123'
                onChange={handleInputChange}
                value={cvc}
                ></input>
              </div>
              {cvcError ? <div className='error-message cvc-error'>Can't be blank</div> : ''}
            </div>
          </div>
          <button className='confirm-button'>Confirm</button>
        </form>
        )} 
      </div>
    </div>
  );
}

export default App;