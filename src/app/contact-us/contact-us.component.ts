import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  linkedin = "https://www.linkedin.com/in/hakime-sheikhalishahi";

  constructor() { }

  ngOnInit(): void {
  }

}
