const { makeAutoObservable } = require("mobx")

class QuizStore {
step = 0
correct = 0
    constructor(){
        makeAutoObservable(this)
    }

    nextStep = () => {
        this.step +=1
    }
    nextCorrect = () =>{
        this.correct +=1
    }
}

export default new QuizStore()