import { Component, OnInit } from '@angular/core';
import { Language } from 'src/Models/LanguageEnumModel';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lang-select',
  templateUrl: './lang-select.component.html',
  styleUrls: ['./lang-select.component.css']
})
export class LangSelectComponent implements OnInit {
  langList  = Language;
  enumKeys:string[] =[];
  @Output() newLangSelectedEvent = new EventEmitter<number>();
  selection: number;
    
    constructor() {
      this.enumKeys= Object.keys(this.langList);
      this.enumKeys = Object.values(this.enumKeys).filter(value => ((value != null) && (value !== '') && !isNaN(Number(value.toString()))));
      //console.log(this.enumKeys)
    }


  ngOnInit(): void {
    this.selection = -1;
  }

  itemSelected() {
    console.log("child selection:",this.selection)
    this.newLangSelectedEvent.emit(this.selection);
  }

}
