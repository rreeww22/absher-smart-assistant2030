import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TranslationService {

  currentLang = signal(localStorage.getItem("lang") || "ar");
  translations: any = {};

  async loadTranslations(lang: string) {
    const response = await fetch(`/assets/i18n/${lang}.json`);
    this.translations = await response.json();
    this.currentLang.set(lang);
    localStorage.setItem("lang", lang);

    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
  }

  t(key: string, params: any = {}): string {
    let text = this.translations[key] || key;

    Object.keys(params).forEach(p => {
      text = text.replace(`{{${p}}}`, params[p]);
    });

    return text;
  }
}
