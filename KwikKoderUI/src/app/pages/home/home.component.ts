import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  autoplay_config = function(element) {
    element.setAttribute('playsinline', '');
    element.setAttribute('muted', '');
    element.setAttribute('autoplay', '');
    element.setAttribute('loop', '');
    element.muted = true;
    element.play();
  }

  ngOnInit(): void {
    this.autoplay_config(document.getElementById("demo-vid"));
  }

}
