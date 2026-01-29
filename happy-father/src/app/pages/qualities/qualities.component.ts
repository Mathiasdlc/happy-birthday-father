import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Quality {
  id: number;
  title: string;
  description: string;
  detailedMessage: string;
  icon: string;
  color: string;
  delay: number;
}

@Component({
  selector: 'app-qualities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qualities.component.html',
  styleUrls: ['./qualities.component.css']
})
export class QualitiesComponent implements OnInit {
  selectedQuality: Quality | null = null;
  currentAge = 19; // Tu edad actual

  qualities: Quality[] = [
    {
      id: 1,
      title: 'Liderazgo Natural',
      description: 'Tu capacidad de guiar con el ejemplo',
      detailedMessage: 'Desde pequeño he visto cómo lideras no con palabras, sino con acciones. Tu integridad y determinación han sido mi brújula en momentos difíciles. Me has enseñado que un verdadero líder no impone, sino que inspira.',
      icon: '👔',
      color: '#2a5298',
      delay: 0.2
    },
    {
      id: 2,
      title: 'Sabiduría Profunda',
      description: 'Cada consejo se convierte en lección de vida',
      detailedMessage: 'Tus palabras siempre llegan en el momento exacto. No solo me das respuestas, me enseñas a hacer las preguntas correctas. Tu sabiduría no viene de libros, sino de la experiencia vivida con propósito.',
      icon: '🎯',
      color: '#d4af37',
      delay: 0.4
    },
    {
      id: 3,
      title: 'Fortaleza Inquebrantable',
      description: 'Tu perseverancia ante cualquier desafío',
      detailedMessage: 'He visto cómo enfrentas las adversidades con una calma que me tranquiliza. Tu fortaleza no es solo física, es mental y emocional. Me has demostrado que los obstáculos son oportunidades disfrazadas.',
      icon: '⚡',
      color: '#e74c3c',
      delay: 0.6
    },
    {
      id: 4,
      title: 'Dedicación Absoluta',
      description: 'El esfuerzo que pones en todo lo que haces',
      detailedMessage: 'Tu ética de trabajo es admirable. Nunca haces las cosas a medias, siempre das lo mejor de ti. Me has enseñado que la excelencia no es un acto, sino un hábito que se cultiva día a día.',
      icon: '🏆',
      color: '#27ae60',
      delay: 0.8
    },
    {
      id: 5,
      title: 'Carácter Íntegro',
      description: 'Tu honestidad y valores inquebrantables',
      detailedMessage: 'Tu palabra vale más que cualquier contrato. Tu honestidad, incluso cuando es difícil, me ha enseñado el valor de la verdad. Eres el hombre que quiero llegar a ser.',
      icon: '🛡️',
      color: '#8e44ad',
      delay: 1.0
    },
    {
      id: 6,
      title: 'Legado Eterno',
      description: 'Construyes algo que trasciende generaciones',
      detailedMessage: 'No solo eres mi padre, eres el arquitecto de mi carácter. Cada valor que me has transmitido, cada ejemplo que me has dado, forma parte de un legado que llevaré conmigo y transmitiré a las futuras generaciones.',
      icon: '🌟',
      color: '#f39c12',
      delay: 1.2
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * Selecciona una cualidad para mostrar detalles
   */
  selectQuality(quality: Quality): void {
    this.selectedQuality = this.selectedQuality?.id === quality.id ? null : quality;
  }

  /**
   * Navega a una página específica
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  /**
   * TrackBy function para optimizar el renderizado
   */
  trackByQualityId(index: number, quality: Quality): number {
    return quality.id;
  }
}