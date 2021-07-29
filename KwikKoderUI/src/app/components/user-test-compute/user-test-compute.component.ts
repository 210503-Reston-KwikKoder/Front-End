import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-test-compute',
  templateUrl: './user-test-compute.component.html',
  styleUrls: ['./user-test-compute.component.css']
})
export class UserTestComputeComponent implements OnInit {
  @Input() testmat;
  @Input() state;
  @Input() wpm;
  @Input() minutes;
  @Input() seconds;
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.testmat);
  }
  pad(num: number) {
    if(num < 10) return `0${num}`;
    else return num;
  }

}
