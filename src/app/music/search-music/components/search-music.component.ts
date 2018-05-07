import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-music',
  templateUrl: 'search-music.component.html',
  styleUrls: [`search-music.style.css`]
})
export class SearchMusicComponent {
  @Input() query = '';
  @Input() searching = false;
  @Input() error = '';
  @Output() search = new EventEmitter<string>();
}