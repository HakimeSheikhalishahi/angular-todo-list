import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  navbarCollapsed: boolean = true;
  isLogin = true;
  constructor(private router: Router) {
    router.events.subscribe((val) => {
    });
  }

  ngOnInit() {

  }
  onClickHome() {
    this.router.navigateByUrl('');

  };

}
