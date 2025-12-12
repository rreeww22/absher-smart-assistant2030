import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ RouterModule],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {

  constructor(public i18n: TranslationService) { }

  ngOnInit() {
    this.i18n.loadTranslations(this.i18n.currentLang());
  }

  switchLang(lang: string) {
    this.i18n.loadTranslations(lang);
  }
}
