import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Dashboard } from './pages/dashboard/dashboard';
import { Chat } from './pages/chat/chat';
import { Info } from './pages/info/info';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'dashboard', component: Dashboard },
  { path: 'chat', component: Chat },
  { path: 'info', component: Info },

  { path: '**', redirectTo: '' } // أي رابط غلط يرجع للصفحة الرئيسية
];
