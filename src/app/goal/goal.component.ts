import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Goal } from "../goal";
import { GoalService } from "../goal-service/goal.service";
import { AlertService } from '../alert-service/alert.service';
import { QuoteRequestService } from "../quote-http/quote-request.service";
import { Quote } from "../quote-class/quote";
import { Router } from '@angular/router';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  goToUrl(id){
    this.router.navigate(['/goals',id])
  }
    goals:Goal[];
    alertService:AlertService;
    quote:Quote;
    

    constructor(goalService:GoalService, alertService:AlertService,private quoteService:QuoteRequestService, private http:HttpClient, private router:Router) {
      this.goals = goalService.getGoals()
      this.alertService = alertService;
    }
  


  // [
  //   new Goal(1,'Watch finding Nemo',"Find an online version and warch merlin find his son",new Date(2019,11,12)),
  //   new Goal(2,"Buy Cookies","I have to buy cookies for the parrot",new Date(2019,7,18)),
  //   new Goal(3,"Get new Phone Case","Diana has her birthday coming up soon",new Date(2019,8,10)),
  //   new Goal(4,"Get Dog Food","Pupper likes expensive sancks",new Date(2019,10,12)),
  //   new Goal(5,"Solve math homework","Damn Math",new Date(2019,2,12)),
  //   new Goal(6,"Plot my world domination plan","Cause I am an evil overlord",new Date(2019,11,31)),
  // ];

  // alertService:AlertService;


  toggleDetails(index){
      this.goals[index].showDescription = !this.goals[index].showDescription;
  }
  completeGoal(isComplete, index){
    if (isComplete) {
      this.goals.splice(index,1);
    }
  }

  // function that deletes.....before adding the details of a goal to to be displayed separately
  // deleteGoal(isComplete, index) {
  //   if (isComplete) {
  //     let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}? `);
      
  //     if (toDelete) {
  //       this.goals.splice(index, 1)
  //       this.alertService.alertMe("The goal has been deleted")
  //     }
  //   }
  // }
   // .........................................End od delete goal function...Initial

   // ............................Details of a goal dispaly differently.Delete Function

   deleteGoal(index){
    let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}`)

    if (toDelete){
      this.goals.splice(index,1)
      this.alertService.alertMe("Goal has been deleted")
    }
  }


// .................................................................................
   
  // function that adds new goals
  addNewGoal(goal){
    let goalLength = this.goals.length;
    goal.id = goalLength+1;
    goal.completeDate = new Date(goal.completeDate)
    this.goals.push(goal)
  }
  

 

  ngOnInit() {
    interface ApiResponse{
      author:string;
      quote:string;
    }
    this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.uk/random.json").subscribe(data=>{
      //successful API request
    this.quote = new Quote(data.author, data.quote)
    },err=>{
      this.quote = new Quote("Winston Churchill","Never never give up!")
      console.log("An error")
    })

    this.quoteService.quoteRequest()
    this.quote = this.quoteService.quote
  }

}
