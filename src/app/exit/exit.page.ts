import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-exit',
  templateUrl: './exit.page.html',
  styleUrls: ['./exit.page.scss'],
})
export class ExitPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.clear();
    this.router.navigate(['/welcome'])
  }

}
