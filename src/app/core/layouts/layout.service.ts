import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  toggleDarkMode() {
    const element: HTMLHtmlElement | null = document.querySelector('html');
    element!.classList.toggle('my-app-dark');
  }

  isDarkMode(): boolean {
    const element: HTMLHtmlElement | null = document.querySelector('html');
    return element?.classList.contains('my-app-dark') ?? false;
  }
}
