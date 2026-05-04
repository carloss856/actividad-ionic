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

  constructor() {
    this.loadThemePreference();
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
