import {Component} from '@angular/core';
import {SessionService} from "./session.service";

// Add the RxJS Observable operators.
import './rxjs-operators';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SessionService, AuthService]
})
export class AppComponent {
  title = 'Time';
}
