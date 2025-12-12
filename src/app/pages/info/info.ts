import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  standalone: true,
  templateUrl: './info.html',
  styleUrls: ['./info.scss']
})
export class Info implements OnInit {

  constructor(public i18n: TranslationService, private router: Router
  ) { }

  ngOnInit(): void {
    const lang = localStorage.getItem('lang') || 'ar';
    this.i18n.loadTranslations(this.i18n.currentLang());
  }

  // ===== زر الرجوع للداشبورد =====
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

}
