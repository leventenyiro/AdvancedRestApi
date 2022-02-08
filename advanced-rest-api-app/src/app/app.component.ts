import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /*@Output() featureSelected = new EventEmitter<string>()

  onNavigate(feature: string) {
    this.featureSelected.emit(feature)
  }*/
  loadedFeature = 'app'

  onNavigate(feature: string) {
    this.loadedFeature = feature
  }
}
