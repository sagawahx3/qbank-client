export class Question{

    constructor( text, answer1, answer2, answer3, answer4, correct) {
        this.body = text;
        this.ans1 = answer1;
        this.ans2 = answer2;
        this.ans3 = answer3;
        this.ans4 = answer4;
        this.ans5 = answer4;
        this.correct = correct;
      }
      
      checkAnswer(answer){
       if(answer == this.correct) return 1;
       else return 2;
     }

}