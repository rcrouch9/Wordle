import { useState, useRef } from 'react'
import { generate } from 'random-words';
import './App.css'

function App() {
  const initialGuessState = new Array(6).fill("").map(()=>new Array(5).fill(""));
  const initialSwitchState = [true, true, true, true, true, true];
  const initialInputSwitchState = [false, true, true, true, true, true];

  const [word, setWord] = useState((generate({ minLength: 5, maxLength: 5 })).toUpperCase().split(""));
  const [guesses, setGuesses] = useState(new Array(6).fill("").map(()=>new Array(5).fill("")));
  const [switches, setSwitches] = useState(initialSwitchState)
  const [inputSwitches, setInputSwitches] = useState(initialInputSwitchState)

  const inputs = useRef(null);
  const row = useRef(0);

  const updateGuess = (event) => {
    let newGuess = guesses;
    let index = event.target.id;
    newGuess[row.current][event.target.id] = event.target.value.toUpperCase();
    setGuesses(newGuess);
    if (!guesses[row.current].includes("")) {
      let newSwitches = [...switches];
      newSwitches[row.current] = false;
      setSwitches(newSwitches);
    }
  }

  const checkGuess = () => {
    let correct = 0;
    for (let i = 0; i < 5; i++) {
      if (guesses[row.current][i] == word[i]) {
        inputs.current.children[row.current].children[i].style.color = "green";
        inputs.current.children[row.current].children[i].setAttribute("disabled", "")
        correct += 1;

      }
      else if (word.includes(guesses[row.current][i])) {
        inputs.current.children[row.current].children[i].style.color = "yellow";
        inputs.current.children[row.current].children[i].setAttribute("disabled", "")

      }
      else {
        inputs.current.children[row.current].children[i].style.color = "red";
        inputs.current.children[row.current].children[i].setAttribute("disabled", "")
        
      }
    }

    inputs.current.children[row.current].children[5].setAttribute("disabled", "")

    if (correct == 5) {
      alert("YOU WIN!!!!!!!!!")
      return;
    }

    row.current = row.current + 1;

    if (row.current == 6) {
      alert(`out of tries :( the word was ${word[0] + word[1] + word[2] + word[3]+ word[4]}`)
    } 

    else {
      let newInputSwitches = [...inputSwitches];
      newInputSwitches[row.current - 1] = true;
      newInputSwitches[row.current] = false;
      setInputSwitches(newInputSwitches);
    }
  }

  return (
    <div className='App' ref={inputs}>
      {guesses.map((guess, guessIndex) => (
        <div key={guessIndex} className="guess-row"> 
          {guess.map((letter, letterIndex) => (
            <input key={letterIndex} id={letterIndex} disabled={inputSwitches[guessIndex]} className="input-box" type="text" required maxLength="1" autoComplete="off" onChange={updateGuess}></input>
          ))}
          <button className="submit-button" disabled={switches[guessIndex]} onClick={checkGuess}>GUESS</button>
        </div>
      ))}
      <button className='new-game-button' onClick={() => window.location.reload()}>NEW GAME</button> 
    </div>
  )
}

export default App
