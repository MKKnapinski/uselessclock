import {Component, Renderer2, ViewChild} from '@angular/core';
import {faRedoAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  faRedoAlt = faRedoAlt;
  inProgress = false;
  @ViewChild('clockComponent') clockComponent;

  constructor(private renderer: Renderer2) {
  }

  nextUselessTime() {
    if (this.inProgress) {
      return;
    }
    this.inProgress = true;
    const el = document.getElementById('reload-icon');
    this.renderer.addClass(el, 'spin');
    setTimeout(() => {
      this.renderer.removeClass(el, 'spin');
      this.inProgress = false;
      this.clockComponent.nextUselessTime();
    }, 300);
  }
}
