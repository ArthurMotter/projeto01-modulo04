import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router'; 
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [
    RouterOutlet,    
    NavbarComponent  
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Agendamento';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }

  setTitle(title: string) {
    this.title = title;
  }
}