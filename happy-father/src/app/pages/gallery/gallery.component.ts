import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface GalleryImage {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  category: 'familia' | 'momentos' | 'logros' | 'viajes';
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  selectedCategory: string = 'todas';
  
  // Imágenes de ejemplo - puedes reemplazar con rutas reales
  galleryImages: GalleryImage[] = [
    {
      id: 1,
      title: 'Día en familia',
      description: 'Un domingo perfecto juntos',
      imagePath: 'assets/images/familia1.jpg',
      category: 'familia'
    },
    {
      id: 2,
      title: 'Mi graduación',
      description: 'Tu orgullo en mis logros',
      imagePath: 'assets/images/graduacion.jpg',
      category: 'logros'
    },
    {
      id: 3,
      title: 'Viaje memorable',
      description: 'Aventuras que recordaremos siempre',
      imagePath: 'assets/images/viaje1.jpg',
      category: 'viajes'
    },
    {
      id: 4,
      title: 'Momento especial',
      description: 'Esos instantes únicos',
      imagePath: 'assets/images/momento1.jpg',
      category: 'momentos'
    },
    {
      id: 5,
      title: 'Celebración familiar',
      description: 'Juntos en las buenas',
      imagePath: 'assets/images/familia2.jpg',
      category: 'familia'
    },
    {
      id: 6,
      title: 'Logro compartido',
      description: 'Celebrando juntos el éxito',
      imagePath: 'assets/images/logro1.jpg',
      category: 'logros'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * Filtra las imágenes por categoría
   */
  get filteredImages(): GalleryImage[] {
    if (this.selectedCategory === 'todas') {
      return this.galleryImages;
    }
    return this.galleryImages.filter(img => img.category === this.selectedCategory);
  }

  /**
   * Cambia la categoría seleccionada
   */
  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  /**
   * Navega a una página específica
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  /**
   * Maneja el error de carga de imagen
   */
  onImageError(event: any): void {
    // Imagen placeholder cuando no se encuentra la imagen
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
  }

  /**
   * TrackBy function para optimizar el renderizado
   */
  trackByImageId(index: number, image: GalleryImage): number {
    return image.id;
  }
}