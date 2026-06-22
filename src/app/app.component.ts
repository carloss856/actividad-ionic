import { Component } from '@angular/core';

interface MenuPage {
  title: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  // Aqui organizo las tres paginas principales para que el menu lateral quede sencillo y directo.
  public appPages: MenuPage[] = [
    { title: 'Inicio', url: '/folder/inicio', icon: 'home' },
    { title: 'Informacion personal', url: '/folder/informacion-personal', icon: 'person' },
    { title: 'Contacto', url: '/folder/contacto', icon: 'call' },
  ];

  // Guardo el estado del tema para que la aplicacion recuerde la preferencia del usuario.
  public darkMode = false;

  // --- Mejoras nuevas: tamano de fuente y color de acento ---
  public fontScale = 1;            // Factor de escala del texto (accesibilidad).
  public accent = '#2563eb';       // Color de acento activo de la aplicacion.
  public readonly accentColors = [
    { name: 'Azul', value: '#2563eb' },
    { name: 'Violeta', value: '#7c3aed' },
    { name: 'Esmeralda', value: '#059669' },
    { name: 'Rosa', value: '#db2777' },
    { name: 'Naranja', value: '#ea580c' },
  ];

  constructor() {
    this.loadThemePreference();
    this.loadFontScale();
    this.loadAccent();
  }

  public increaseFont(): void {
    this.fontScale = Math.min(1.3, Math.round((this.fontScale + 0.1) * 10) / 10);
    this.applyFontScale();
  }

  public decreaseFont(): void {
    this.fontScale = Math.max(0.8, Math.round((this.fontScale - 0.1) * 10) / 10);
    this.applyFontScale();
  }

  public setAccent(color: string): void {
    this.accent = color;
    this.applyAccent();
  }

  private loadFontScale(): void {
    this.fontScale = Number(localStorage.getItem('fontScale') ?? '1');
    this.applyFontScale();
  }

  private applyFontScale(): void {
    // Escalo el tamano base; el texto propio usa rem, asi que se ajusta de forma proporcional.
    document.documentElement.style.fontSize = `${16 * this.fontScale}px`;
    localStorage.setItem('fontScale', String(this.fontScale));
  }

  private loadAccent(): void {
    this.accent = localStorage.getItem('accent') ?? '#2563eb';
    this.applyAccent();
  }

  private applyAccent(): void {
    const root = document.documentElement.style;
    root.setProperty('--ion-color-primary', this.accent);
    root.setProperty('--ion-color-primary-shade', this.accent);
    root.setProperty('--ion-color-primary-tint', this.accent);
    localStorage.setItem('accent', this.accent);
  }

  public toggleDarkMode(event: CustomEvent<{ checked: boolean }>): void {
    this.darkMode = event.detail.checked;
    this.applyTheme();
  }

  private loadThemePreference(): void {
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.applyTheme();
  }

  private applyTheme(): void {
    // Aplico la clase tanto en html como en body porque Ionic usa variables globales y asi el cambio se refleja mejor.
    document.documentElement.classList.toggle('dark', this.darkMode);
    document.body.classList.toggle('dark', this.darkMode);
    document.documentElement.style.colorScheme = this.darkMode ? 'dark' : 'light';
    localStorage.setItem('darkMode', String(this.darkMode));
  }
}
