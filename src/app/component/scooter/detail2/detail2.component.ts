import {Component, OnInit, Input} from '@angular/core';
import {Scooter} from '../../../models/scooter';

@Component({
  selector: 'app-detail2',
  templateUrl: './detail2.component.html',
  styleUrls: ['./detail2.component.css']
})
export class detail2Component implements OnInit {


  @Input()
  public edit: Scooter;


  constructor() {
  }


  ngOnInit(): void {


  }
}
