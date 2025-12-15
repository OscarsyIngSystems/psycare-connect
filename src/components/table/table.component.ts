import { Component, signal } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { Institucion } from '../../interfaces/institucion';






@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  // institutoSelectado: Institucion | null = null;

  institutoSelectado = signal<Institucion | null>(null);

  instituciones: Institucion[] = [
    {
      "id": 13,
      "nombre": "ADIVAC",
      "descripcion": "Violencia sexual",
      "direccion": ["Salvador Díaz Mirón 140 Santa María La Ribera, Cuauhtémoc, Ciudad de México, DF, México"],
      "imagen": "8",
      "contacto": ["5682 7969, 5547 8639"],
      "correo": "adivac@adivac.org",
      "proceso": "* Llamar para solicitar cita.",
      "activo": true,
      "iframe": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5221912636593!2d-99.1519870249982!3d19.441797986886736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff4e8f6f4bfb%3A0x6e6c4f5a5f5a5f5a!2sADIVAC%20A.C.!5e0!3m2!1ses-419!2smx!4v1696351234567!5m2!1ses-419!2smx"
    },
    {
      "id": 14,
      "nombre": "Asociación Mexicana de Suicidología",
      "descripcion": "Atención psicológica contra el suicidio",
      "direccion": ["En línea"],
      "imagen": "9",
      "contacto": ["55 525 98121 , 55 5622 2288 , 55 553 355 33"],
      "correo": "info@suicidologia.org.mx",
      "proceso": "* Llamar para solicitar cita.",
      "activo": false,
      "iframe": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5221912636593!2d-99.1519870249982!3d19.441797986886736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff4e8f6f4bfb%3A0x6e6c4f5a5f5a5f5a!2sADIVAC%20A.C.!5e0!3m2!1ses-419!2smx!4v1696351234567!5m2!1ses-419!2smx"
    },
    {
      "id": 15,
      "nombre": "Línea Nacional Diversidad Segura",
      "descripcion": "El Consejo Ciudadano ofrece apoyo psicológico y jurídico a la comunidad LGBTTTI+ en toda la república. Dará atención psicológica, prevención del suicidio, terapias a distancia, orientación jurídica ante discriminación o trámites legales.",
      "direccion": [
        "Azcapotzalco: Morelos y Pavón 33, Azcapotzalco Centro, Alcaldía Azcapotzalco, CP 02000, Ciudad de México.",
        "Cuauhtémoc: 54 Amberes, Juárez, Cuauhtémoc Mayoralty, CP 06600, Ciudad de México.",
        "Iztapalapa: Av. Luis Hidalgo Monroy 100, Alcaldía Iztapalapa , CP 09000, Ciudad de México.",
        "Benito Juárez: Tintoreto 39, Santa María Nonoalco, Benito Juárez Alcaldía, CP 03700, Ciudad de México."
      ],
      "imagen": "1",

      "correo": "contacto@consejociudadanomx.org",
      "proceso": "* Llamar para solicitar cita.",
      "contacto": [
        "Línea de Seguridad y Chat de Confianza: 55 · 5533 · 5533",
        "Línea Nacional vs la Trata de Personas: 800 · 5533 · 000",
        "Línea Nacional Diversidad Segura: 800 · 000 · 5428"
      ],
      "iframe": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5221912636593!2d-99.1519870249982!3d19.441797986886736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff4e8f6f4bfb%3A0x6e6c4f5a5f5a5f5a!2sADIVAC%20A.C.!5e0!3m2!1ses-419!2smx!4v1696351234567!5m2!1ses-419!2smx"
    },
    {
      "id": 16,
      "nombre": "IAPA (Instituto para la Atención y Prevención de las Adicciones En la Ciudad de México)",
      "descripcion": "Atención psicológica",
      "direccion": [
        "https://www.iapa.cdmx.gob.mx/",
        "Álvaro Obregón: Vasco de Quiroga 1345, Sta Fé, Álvaro Obregón, Ciudad de México.",
        "Benito Juárez: Av. Río Mixcoac 342, Acacias, Benito Juárez, Ciudad de México.",
        "Tlalpan: Cehuantepec, esq. Cd Xamíltepec 113-7, Mesa los Hornos, Tlalpan, Ciudad de México.",
        "Gustavo A. Madero: Jaime Nuno 155, Cuautepec Barrio Bajo, Gustavo A. Madero, Ciudad de México.",
        "Cuauhtémoc: Perú 88, Centro Histórico Cuauhtémoc, Ciudad de México.",
        "Iztapalapa: Prof. San Isidro 151, San Lorenzo Tezonco, Iztapalapa, Ciudad de México.",
        "Tláhuac: Calle Gitana 258, Colonia del Mar, Tláhuac, Ciudad de México."
      ],
      "imagen": "4",
      "contacto": ["55 4631 3035 - Ext. 2502 y 2503, Vía WhatsApp: 55 7809 5579"],
      "correo": "",
      "iframe": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5221912636593!2d-99.1519870249982!3d19.441797986886736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff4e8f6f4bfb%3A0x6e6c4f5a5f5a5f5a!2sADIVAC%20A.C.!5e0!3m2!1ses-419!2smx!4v1696351234567!5m2!1ses-419!2smx",
      "proceso": "Ponte en contacto para recibir atención personalizada Vía Telefónica: 55 4631 3035 - Ext. 2502 y 2503 Vía WhatsApp: 55 7809 5579 (IAPABOT) Vía Videollamada: meet.google.com/tja-jmin-ohw. Asiste a uno de nuestros Centros de cuidado."
    }
  ];



  eliminarInstituto(institucion: Institucion) {
    console.log('Ver detalles:', institucion);
    // Tu lógica para ver detalles
  }

  editarInstitucion(institucion: Institucion) {
    console.log('Editar:', institucion);
    if (institucion) {
      this.institutoSelectado.set(institucion);
    }

    // Tu lógica para editar
  }

  // Método para cerrar el modal
  closeModal() {
    // reseteo del instituto seleccionado
    this.institutoSelectado.set(null);

    const modalElement = document.getElementById('editCreateModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }


  // Método que será llamado desde el formulario
  onFormCloseModal() {
    this.closeModal();
  }


}
