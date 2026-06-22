import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

interface ContactMessage {
  nombre: string;
  correo: string;
  asunto: string;
  mensaje: string;
}

interface SectionContent {
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  items: string[];
}

interface SectionVariant {
  primary: SectionContent;
  secondary?: SectionContent;
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: false,
})
export class FolderPage implements OnInit, OnDestroy {
  public folder!: string;
  public pageContent!: SectionContent;
  public showingAlternativeData = false;

  // --- Mejoras nuevas ---
  public searchTerm = '';            // Texto del buscador para filtrar los items.
  public favorites: string[] = [];   // Items marcados como favoritos (se guardan en el navegador).
  public visitCount = 0;             // Cuantas veces se ha abierto esta seccion.
  public now = new Date();           // Fecha y hora en vivo que se actualiza cada segundo.

  private clockTimer?: ReturnType<typeof setInterval>;
  private activatedRoute = inject(ActivatedRoute);
  private toastController = inject(ToastController);

  // --- Formulario de contacto con Angular Reactive Forms ---
  private formBuilder = inject(FormBuilder);
  public contactForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    asunto: ['', [Validators.required]],
    mensaje: ['', [Validators.required, Validators.minLength(10)]],
  });
  public lastMessage: ContactMessage | null = null;

  // Este objeto me sirve para mostrar un contenido distinto segun la opcion elegida en el menu.
  private readonly sections: Record<string, SectionVariant> = {
    inicio: {
      primary: {
        title: 'Inicio',
        subtitle: 'Bienvenido a mi aplicacion en Ionic',
        description: 'Navegacion principal de la aplicacion.',
        highlight: 'Secciones disponibles:',
        items: [
          'Menu lateral con acceso a las tres secciones.',
          'Diseno con fondos de color para evitar una vista plana.',
          'Cambio de tema para mejorar la experiencia de uso.'
        ]
      }
    },
    'informacion-personal': {
      primary: {
        title: 'Informacion personal',
        subtitle: 'Resumen del estudiante',
        description: 'Datos principales del estudiante.',
        highlight: 'Informacion actual:',
        items: [
          'Nombre: Carlos Subero.',
          'Carrera: area de tecnologia y programacion.',
          'Interes principal: desarrollo de aplicaciones web y moviles.'
        ]
      },
      secondary: {
        title: 'Informacion personal',
        subtitle: 'Datos alternativos del estudiante',
        description: 'Datos complementarios.',
        highlight: 'Informacion adicional:',
        items: [
          'Semestre: 6.',
          'Fortaleza: desarrollo de interfaces y logica.',
          'Meta academica: seguir mejorando en aplicaciones moviles.'
        ]
      }
    },
    contacto: {
      primary: {
        title: 'Contacto',
        subtitle: 'Canales para comunicarse',
        description: 'Medios principales de contacto.',
        highlight: 'Datos de contacto:',
        items: [
          'Correo: estudiante@ejemplo.com',
          'Telefono: +58 412-000-0000',
          'Ciudad: Venezuela.'
        ]
      },
      secondary: {
        title: 'Contacto',
        subtitle: 'Otros medios de contacto',
        description: 'Otros datos de contacto.',
        highlight: 'Contacto adicional:',
        items: [
          'Telegram: @estudiante_ionic',
          'Horario sugerido: 8:00 AM a 5:00 PM.',
          'Referencia: contacto academico y practicas de desarrollo.'
        ]
      }
    }
  };

  constructor() {}

  ngOnInit() {
    this.loadFavorites();

    this.activatedRoute.paramMap.subscribe((params) => {
      this.folder = params.get('id') as string;
      this.showingAlternativeData = false;
      this.searchTerm = '';
      this.registerVisit();
      this.updatePageContent();
    });

    // Reloj en vivo: actualizo la hora cada segundo para que se vea dinamico.
    this.clockTimer = setInterval(() => (this.now = new Date()), 1000);
  }

  ngOnDestroy(): void {
    if (this.clockTimer) {
      clearInterval(this.clockTimer);
    }
  }

  public canToggleData(): boolean {
    return Boolean(this.sections[this.folder]?.secondary);
  }

  public toggleDisplayedData(): void {
    if (!this.canToggleData()) {
      return;
    }

    this.showingAlternativeData = !this.showingAlternativeData;
    this.updatePageContent();
  }

  // --- Buscador: devuelve solo los items que coinciden con el texto escrito. ---
  public get filteredItems(): string[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.pageContent.items;
    }
    return this.pageContent.items.filter((item) => item.toLowerCase().includes(term));
  }

  // --- Favoritos: marcar o desmarcar un item y guardarlo en el navegador. ---
  public isFavorite(item: string): boolean {
    return this.favorites.includes(item);
  }

  public async toggleFavorite(item: string): Promise<void> {
    if (this.isFavorite(item)) {
      this.favorites = this.favorites.filter((fav) => fav !== item);
      await this.showToast('Quitado de favoritos');
    } else {
      this.favorites = [...this.favorites, item];
      await this.showToast('Agregado a favoritos');
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  // --- Copiar el contenido de la seccion al portapapeles. ---
  public async copyContent(): Promise<void> {
    const text = this.buildShareText();
    try {
      await navigator.clipboard.writeText(text);
      await this.showToast('Contenido copiado al portapapeles');
    } catch {
      await this.showToast('No se pudo copiar el contenido');
    }
  }

  // --- Compartir usando el menu nativo del dispositivo si esta disponible. ---
  public async shareContent(): Promise<void> {
    const text = this.buildShareText();
    if (navigator.share) {
      try {
        await navigator.share({ title: this.pageContent.title, text });
      } catch {
        // El usuario cancelo el compartir; no hago nada.
      }
    } else {
      await this.copyContent();
    }
  }

  // --- Pull to refresh: recarga la hora y avisa al usuario. ---
  public doRefresh(event: CustomEvent): void {
    this.now = new Date();
    this.updatePageContent();
    this.showToast('Contenido actualizado');
    setTimeout(() => (event.target as HTMLIonRefresherElement).complete(), 600);
  }

  // Indica si un campo concreto tiene un error de validacion y ya fue tocado por el usuario.
  public hasError(field: string, error: string): boolean {
    const control = this.contactForm.get(field);
    return Boolean(control && control.touched && control.hasError(error));
  }

  // Envia el formulario solo si es valido; si no, marca los campos para mostrar los errores.
  public async submitContactForm(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      await this.showToast('Revisa los campos del formulario');
      return;
    }

    this.lastMessage = this.contactForm.value as ContactMessage;
    await this.showToast('Mensaje enviado correctamente');
    this.contactForm.reset();
  }

  private buildShareText(): string {
    return `${this.pageContent.title} - ${this.pageContent.subtitle}\n\n` +
      this.pageContent.items.join('\n');
  }

  private registerVisit(): void {
    const key = `visits-${this.folder}`;
    this.visitCount = Number(localStorage.getItem(key) ?? '0') + 1;
    localStorage.setItem(key, String(this.visitCount));
  }

  private loadFavorites(): void {
    try {
      this.favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]');
    } catch {
      this.favorites = [];
    }
  }

  private async showToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom',
      color: 'primary'
    });
    await toast.present();
  }

  private updatePageContent(): void {
    const selectedSection = this.sections[this.folder] ?? this.sections['inicio'];
    this.pageContent = this.showingAlternativeData && selectedSection.secondary
      ? selectedSection.secondary
      : selectedSection.primary;
  }
}
