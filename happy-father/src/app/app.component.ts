import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AudioPlayerComponent } from './shared/components/audio-player/audio-player.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AudioPlayerComponent],
  template: `
    <router-outlet></router-outlet>
    <app-audio-player></app-audio-player>
  `,
  styles: []
})
export class AppComponent {
  title = 'happy-father';
}
