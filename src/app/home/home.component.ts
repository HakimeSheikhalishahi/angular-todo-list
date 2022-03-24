import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  img = "assets/img/todo.svg";
  imgClass = "col-12 col-md-8 col-lg-6  m-auto text-center";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  go(): void {
    this.router.navigateByUrl('/to-do');
  }
}
