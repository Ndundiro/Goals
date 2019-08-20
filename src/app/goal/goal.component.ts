import { Component, OnInit } from '@angular/core';
import { Goal } from "../goal";
import { GoalService } from "../goal-service/goal.service";

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  goals:Goal[];

  // constructor(goalService:GoalService) {
  //   this.goals = goalService.getGoals()
  // }
  
  // [
  //   new Goal(1,'Watch finding Nemo',"Find an online version and warch merlin find his son",new Date(2019,11,12)),
  //   new Goal(2,"Buy Cookies","I have to buy cookies for the parrot",new Date(2019,7,18)),
  //   new Goal(3,"Get new Phone Case","Diana has her birthday coming up soon",new Date(2019,8,10)),
  //   new Goal(4,"Get Dog Food","Pupper likes expensive sancks",new Date(2019,10,12)),
  //   new Goal(5,"Solve math homework","Damn Math",new Date(2019,2,12)),
  //   new Goal(6,"Plot my world domination plan","Cause I am an evil overlord",new Date(2019,11,31)),
  // ];






  toggleDetails(index){
      this.goals[index].showDescription = !this.goals[index].showDescription;
  }
  completeGoal(isComplete, index){
    if (isComplete) {
      this.goals.splice(index,1);
    }
  }

  // function that deletes
  deleteGoal(isComplete, index) {
    if (isComplete) {
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}? `);
      if (toDelete) {
        this.goals.splice(index, 1);
      }
    }
  }
  // function that adds new goals
  addNewGoal(goal){
    let goalLength = this.goals.length;
    goal.id = goalLength+1;
    goal.completeDate = new Date(goal.completeDate)
    this.goals.push(goal)
  }
  

  // constructor() { }

  ngOnInit() {
  }

}
