import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface SectionContent {
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  items: string[];
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
  private activatedRoute = inject(ActivatedRoute);

  // Este objeto me sirve para mostrar un contenido distinto segun la opcion elegida en el menu.
  private readonly sections: Record<string, SectionContent> = {
    inicio: {
      title: 'Inicio',
      subtitle: 'Bienvenido a mi aplicacion en Ionic',
      description: 'Esta pagina funciona como una presentacion general. Desde aqui se entiende que la aplicacion tiene una navegacion sencilla, agradable a la vista y adaptada a tema claro u oscuro.',
      highlight: 'La idea principal es reunir informacion basica del estudiante en una interfaz ordenada.',
      items: [
        'Menu lateral con acceso a las tres secciones.',
        'Diseno con fondos de color para evitar una vista plana.',
        'Cambio de tema para mejorar la experiencia de uso.'
      ]
    },
    'informacion-personal': {
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
    contacto: {
      title: 'Contacto',
      subtitle: 'Canales para comunicarse',
      description: 'Esta pagina concentra medios de contacto simulados para completar la practica. La informacion se muestra en formato de lista para que sea rapida de leer.',
      highlight: 'Aqui se demuestra una vista orientada a datos practicos y de acceso rapido.',
      items: [
        'Correo: estudiante@ejemplo.com',
        'Telefono: +58 412-000-0000',
        'Ciudad: Venezuela.'
      ]
    }
  };

  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.pageContent = this.sections[this.folder] ?? this.sections['inicio'];
  }
}
