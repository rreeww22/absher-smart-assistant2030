import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss'],
})
export class Landing implements OnInit {

  constructor(public i18n: TranslationService) {}

  async ngOnInit() {
    // اللغة الافتراضية عربي
    const lang = localStorage.getItem('lang') || 'ar';
    await this.i18n.loadTranslations(lang);
  }

  switchLang(lang: 'ar' | 'en') {
    this.i18n.loadTranslations(lang);
  }
}
