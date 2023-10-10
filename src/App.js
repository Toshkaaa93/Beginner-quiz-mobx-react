import './index.scss';
import quizStore from './store/quiz-store';
import { observer } from 'mobx-react-lite';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

const Result = observer(() => {

  const {correct} = quizStore
  
  console.log(correct)
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt='img'/>
      <h2>Вы отгадали {correct} ответа из {questions.length}</h2>
      <button onClick={()=>window.location.reload()}>Попробовать снова</button>
    </div>
  );
})

const Game = observer(({onClickVariant,question})=> {
  
  const percentage = Math.round((quizStore.step / questions.length * 100))
  console.log(percentage)
  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {
          question.variants.map((text,i)=> <li onClick={()=>onClickVariant(i)} key={i}>{text}</li>)
        }
      </ul>
    </>
  );
})

const  App = observer(() => {
  const {step} = quizStore
 

  const question = questions[step]


  const onClickVariant = (index) => {
    // console.log(step,index)
    quizStore.nextStep()

    if(index === question.correct) {
      quizStore.nextCorrect()
    }
  }

  return (
    <div className="App">
      {
        step !== questions.length ? <Game question={question} onClickVariant={onClickVariant}/>
         : <Result/>
      }
    </div>
  );
})

export default App;
