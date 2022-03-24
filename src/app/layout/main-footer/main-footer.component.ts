import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss']
})
export class MainFooterComponent implements OnInit {
  linkedin = "https://www.linkedin.com/in/hakime-sheikhalishahi";
  twitter = "https://twitter.com/hakimeAlishahi";
  constructor() { }

  ngOnInit(): void {
  }

}
