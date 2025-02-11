import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterLink,RouterOutlet,CustomerListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';
}
