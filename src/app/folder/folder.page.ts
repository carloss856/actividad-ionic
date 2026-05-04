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
        description: 'Esta pagina funciona como una presentacion general. Desde aqui se entiende que la aplicacion tiene una navegacion sencilla, agradable a la vista y adaptada a tema claro u oscuro.',
        highlight: 'La idea principal es reunir informacion basica del estudiante en una interfaz ordenada.',
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
        description: 'En esta vista se coloca la informacion personal mas importante del estudiante. El contenido se puede adaptar facilmente si luego se quiere agregar mas datos academicos o personales.',
        highlight: 'El objetivo de esta seccion es presentar la identidad del estudiante de manera clara.',
        items: [
          'Nombre: Carlos Subero.',
          'Carrera: area de tecnologia y programacion.',
          'Interes principal: desarrollo de aplicaciones web y moviles.'
        ]
      },
      secondary: {
        title: 'Informacion personal',
        subtitle: 'Datos alternativos del estudiante',
        description: 'Con este boton puedo demostrar que la informacion de la pantalla se actualiza sin cambiar de pagina, algo util cuando se quiere mostrar otra version o mas detalles.',
        highlight: 'Esta segunda vista interna presenta datos complementarios del mismo perfil.',
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
        description: 'Esta pagina concentra medios de contacto simulados para completar la practica. La informacion se muestra en formato de lista para que sea rapida de leer.',
        highlight: 'Aqui se demuestra una vista orientada a datos practicos y de acceso rapido.',
        items: [
          'Correo: estudiante@ejemplo.com',
          'Telefono: +58 412-000-0000',
          'Ciudad: Venezuela.'
        ]
      },
      secondary: {
        title: 'Contacto',
        subtitle: 'Otros medios de contacto',
        description: 'En esta segunda opcion se muestran otros datos para comprobar que el boton de cambio de informacion si modifica el contenido visible en pantalla.',
        highlight: 'La interfaz puede presentar un bloque adicional sin salir de la pagina actual.',
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

    // Aqui alterno entre dos bloques de informacion para que el usuario vea el cambio sin recargar la ruta.
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
