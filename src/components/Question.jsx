export class Question{

    id = 0;

    constructor( id, text, answer1, answer2, answer3, answer4, correct) {
        
        this.id = id;
        this.text = text;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.answer4 = answer4;
        this.correct = correct;
      }
      
      checkAnswer(answer){
       if(answer == this.correct) return 1;
       else return 2;
     }

      getId(){
        return this.id
      }


}