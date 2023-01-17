import { Question } from "./Question";

let instance;

class Bank{
   id = 1
   question = []

    constructor(){
      if(instance)
      throw new Error("Cannot create a new instance of this class")

      instance = this;
      this.addDefaultQuestions();
    }

      addQuestion(text, answer1, answer2, answer3, answer4, correct) {
        let quest = new Question(this.id, text, answer1, answer2, answer3, answer4, correct);
        this.question[this.id] = quest
        this.id++
      }

      getQuestion(){
        
        let r = Math.floor((Math.random() * this.id));
        if(r == 0) r = 1;
        if(r == null) return 0
        return this.question[r]
      }


      addDefaultQuestions(){
       this.addQuestion(
          "Quanto é 2+2?",
          "1", 
          "4", 
          "3", 
          "2",
          2)

          this.addQuestion(
            "Quem descobriu o Brasil?",
            "Pedro Alvares Cabral", 
            "Cristovão Colombo", 
            "Alexandre Magno", 
            "Jesus",
            1);

            this.addQuestion(
              "Quem ganha na porrada?",
              "Saitama", 
              "Superman", 
              "Naruto", 
              "Goku",
              1);

         return;
      }
    }

    const BankInstance = new Bank();

    export default BankInstance


 