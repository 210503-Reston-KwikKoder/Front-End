import { Component, OnInit } from '@angular/core';
import { ProgressGraphData } from 'src/Models/ProgressGraphData';
import { RestService } from 'src/Services/rest.service';
import * as CanvasJS from '../../../assets/js/canvasjs.min';

@Component({
  selector: 'app-progress-graph',
  templateUrl: './progress-graph.component.html',
  styleUrls: ['./progress-graph.component.css']
})
export class ProgressGraphComponent implements OnInit {

  constructor(private api: RestService) { }
  data: ProgressGraphData[][];

  ngOnInit() {
    console.log("generating graph");
    let category;
    let wpm: number;
    let lab: string;
    let dataPoints = [];
    let chart = new CanvasJS.Chart("chartContainer", {
      zoomEnabled: true,
      animationEnabled: true,
      title: {
        text: "Progress Graph"
      },
      subtitles:[{
      }],
      data: [
      {
        type: "line",                
        dataPoints:[
        ]
      }],
      theme:"dark2"
      
    });
    chart.render();
    this.api.getProgressResults().then(
      (obj) => {
          console.log("getting points");
          this.data = obj;
          for(let i = 0; i < this.data.length; i++) {
            for(let j = 0; j < this.data[i].length; j++) {
              category = this.data[i][j].category;
              wpm = this.data[i][j].wpm;
              lab = new Date(this.data[i][j].date).toLocaleDateString();
              category = this.data[i][j].category;
              dataPoints.push({y:wpm, label:lab})
            }
            if(i == 0){
              console.log(dataPoints);
              chart.options.data[0].dataPoints = (dataPoints);
              chart.options.data[0].dataPoints
              console.log(chart.options.data[0]); 
              chart.render();
              dataPoints = []; 
            }
            else{
              chart.options.data[i] = {type: "line",                
              dataPoints:[
              ]}
              chart.options.data[i].dataPoints = (dataPoints);
              console.log(chart.options.data[i]); 
              chart.render();
            }
              

          
            
            
            
        }
        
        
          
        })
        //console.log(dataPoints)
        //console.log(obj)

    
      }
  }
