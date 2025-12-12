import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected readonly title = signal('absher-smart-assistant');

  constructor(private i18n: TranslationService) {
    const savedLang = localStorage.getItem('lang') || 'ar';
    this.i18n.loadTranslations(savedLang);
  }
}
