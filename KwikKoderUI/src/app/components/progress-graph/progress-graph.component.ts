import { Component, OnInit } from '@angular/core';
import { ProgressGraphData } from 'src/Models/ProgressGraphData';
import { RestService } from 'src/Services/rest.service';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
import {Language} from 'src/Models/LanguageEnum';

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

    //Variable Declaration
    let category;
    let wpm: number;
    let lab: string;
    let dataPoints = [];
    //TODO: add no DATA Available message if there are no results to display
    //Graph Creation
    let chart = new CanvasJS.Chart("chartContainer", {
      zoomEnabled: true,
      animationEnabled: true,
      title: {
        text: "WPM Progress"
      },
      toolTip:{   
        content: "WPM: {y}<br/>{l}"      
      },
      legend: {
        cursor: "pointer",
        verticalAlign: "top",
        horizontalAlign: "left"
      },
      axisX: {
        interval: 1
      },
      subtitles:[{
      }],
      
      data: [
      {
        type: "line",
        Label: "T{x}",
        showInLegend: true,
        name: "",                
        dataPoints:[
        ]
      }],
      theme:"dark2"
      
    });
    chart.render();
    let coord: number;
    this.api.getProgressResults().then(
      (obj) => {
          console.log("getting points");
          this.data = obj;
          for(let i = 0; i < this.data.length; i++) {
            for(let j = 0; j < this.data[i].length; j++) {
              category = this.data[i][j].category;
              wpm = this.data[i][j].wpm;
              lab = new Date(this.data[i][j].date).toLocaleDateString();
              dataPoints.push({x:j+1, y:wpm, l: lab})
            }
            if(i == 0){
              console.log(dataPoints);
              chart.options.data[0].dataPoints = (dataPoints);
              chart.options.data[0].name = Language[category];
              console.log(chart.options.data[0]); 
              chart.render(); 
              dataPoints = []; 
            }
            else{
              chart.options.data[i] = {type: "line",
              name: Language[category],
		          showInLegend: true,                
              dataPoints:[
              ]}
              chart.options.data[i].dataPoints = (dataPoints);
              console.log(chart.options.data[i]);
              dataPoints = []; 
              chart.render();
            }    
          }
        })
    
      }
      
  }
