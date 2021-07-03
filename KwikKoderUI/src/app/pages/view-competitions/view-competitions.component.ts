import { Component, OnInit } from '@angular/core';
import { CompModel } from 'src/Models/CompModel';
import { RestService } from 'src/Services/rest.service';
import { DisplayDatePipe } from 'src/app/pipes/display-date.pipe';
import { DisplayCategoryPipe } from 'src/app/pipes/display-category.pipe';
import { faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-competitions',
  templateUrl: './view-competitions.component.html',
  styleUrls: ['./view-competitions.component.css']
})
export class ViewCompetitionsComponent implements OnInit {
  CompModels: CompModel[]
  CurrentCompModels: CompModel []
  faSync = faSync;
  constructor(private api:RestService) { }

  ngOnInit(): void {
    this.GetCompetitions();
  }
  GetCompetitions(): void {
    this.api.getCompetitions().then(res => {
      this.CompModels = res
      //console.log(res)
      this.CurrentCompModels = this.CompModels.filter((CompModel)=>
        {
          var now  = new Date()
          var endDate = new Date(CompModel.end)
          endDate.setMinutes(endDate.getMinutes()+10 - endDate.getTimezoneOffset())
          if(endDate < now) { return  false; }

          //Dont display competitions that havent started
          var startDate = new Date(CompModel.start)
          startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset())

          if(startDate > now){ return  false; }

          return true
        });
    });
  }

}
