import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

type Message = {
  from: 'user' | 'bot';
  text: string;
};

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgFor, RouterModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss']
})
export class Chat implements OnInit {

  userMessage = signal('');
  messages = signal<Message[]>([]);
  sessionId!: string;

  constructor(
    public i18n: TranslationService,
    private router: Router
  ) {}

  async ngOnInit() {
    const lang = localStorage.getItem('lang') || 'ar';
    await this.i18n.loadTranslations(lang);

    const saved = localStorage.getItem('n8n-chat/sessionId');
    this.sessionId = saved ?? crypto.randomUUID();
    localStorage.setItem('n8n-chat/sessionId', this.sessionId);
  }

sendMessage(): void {
  const msg = this.userMessage().trim();
  if (!msg) return;

  // رسالة المستخدم
  this.messages.update(m => [...m, { from: 'user', text: msg }]);
  this.userMessage.set('');

  fetch('https://arm2030.app.n8n.cloud/webhook/b6821fa0-1c60-4f5b-bdb5-d567f2414010/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId: this.sessionId,
      chatInput: msg
    })
  })
  .then(res => res.json())
  .then(data => {

  console.log('RAW RESPONSE:', data);

  let output: any;

  // ✅ FIX: handle stringified JSON from n8n
  if (typeof data?.output === 'string') {
    output = JSON.parse(data.output);
  } else {
    output = data?.output ?? data;
  }

  console.log('PARSED OUTPUT:', output);

  // ===== INTENT =====
  if (output.type === 'intent') {
    fetch('https://arm2030.app.n8n.cloud/webhook/absher-request-processor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: this.sessionId,
        intent: output.intent,
        details: output.data
      })
    })
    .then(res => res.json())
    .then(result => {
      this.messages.update(m => [
        ...m,
        { from: 'bot', text: result?.reply ?? this.i18n.t('fallback') }
      ]);
    });
    return;
  }

  // ===== CHAT =====
  this.messages.update(m => [
    ...m,
    { from: 'bot', text: output.reply ?? this.i18n.t('fallback') }
  ]);
})

  .catch(err => {
    console.error('FETCH ERROR:', err);
    this.messages.update(m => [
      ...m,
      { from: 'bot', text: this.i18n.t('fallback') }
    ]);
  });
}


  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
