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
  data: ProgressGraphData[];

  ngOnInit() {
    
    let dataPoints = [];		
    this.api.getProgressResults().then(
      (obj) => {
        this.data = obj;
        this.data.forEach((val)=>{
          let wpm: number = val.wpm;
          let lab: string = new Date(val.date).toLocaleDateString();
          dataPoints.push({y:wpm, label:lab})
        })
        console.log(dataPoints)
        console.log(obj)
        let chart = new CanvasJS.Chart("chartContainer", {
          zoomEnabled: true,
          animationEnabled: true,
          title: {
            text: "WPM"
          },
          subtitles:[{
          }],
          data: [
          {
            type: "line",                
            dataPoints: dataPoints
          }],
          theme:"dark2"
          
        });
          
        chart.render();
      }
    )
    
      }
  }
