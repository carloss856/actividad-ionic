import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
export class FolderPage implements OnInit {
  public folder!: string;
  public pageContent!: SectionContent;
  public showingAlternativeData = false;
  private activatedRoute = inject(ActivatedRoute);

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
    this.activatedRoute.paramMap.subscribe((params) => {
      this.folder = params.get('id') as string;
      this.showingAlternativeData = false;
      this.updatePageContent();
    });
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

  private updatePageContent(): void {
    const selectedSection = this.sections[this.folder] ?? this.sections['inicio'];
    this.pageContent = this.showingAlternativeData && selectedSection.secondary
      ? selectedSection.secondary
      : selectedSection.primary;
  }
}
