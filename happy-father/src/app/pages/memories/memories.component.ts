import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Memory {
  id: number;
  year: string;
  title: string;
  description: string;
  detailedStory: string;
  icon: string;
  category: 'infancia' | 'adolescencia' | 'presente' | 'futuro';
  emotion: string;
}

@Component({
  selector: 'app-memories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memories.component.html',
  styleUrls: ['./memories.component.css']
})
export class MemoriesComponent implements OnInit {
  selectedMemory: Memory | null = null;
  currentAge = 19; // Tu edad actual en 2026 // Tu edad actual

  memories: Memory[] = [
    {
      id: 1,
      year: '2005-2010',
      title: 'Mis Primeros Pasos',
      description: 'Cuando me enseñaste a caminar, hablar y soñar',
      detailedStory: 'Recuerdo vagamente, pero mamá me cuenta, cómo tenías una paciencia infinita enseñándome cada cosa nueva. Desde mis primeros pasos hasta mis primeras palabras, siempre estuviste ahí para celebrar cada pequeño logro como si fuera el más grande del mundo.',
      icon: '👶',
      category: 'infancia',
      emotion: 'Ternura'
    },
    {
      id: 2,
      year: '2010-2015',
      title: 'Aventuras de la Infancia',
      description: 'Juegos, travesuras y lecciones importantes',
      detailedStory: 'Esos domingos en el parque, enseñándome a andar en bicicleta, jugando fútbol en el jardín. Cada caída era una oportunidad para enseñarme a levantarme. Cada pregunta mía tenía una respuesta paciente de tu parte.',
      icon: '🚲',
      category: 'infancia',
      emotion: 'Alegría'
    },
    {
      id: 3,
      year: '2015-2018',
      title: 'Creciendo Juntos',
      description: 'La adolescencia y nuestras primeras conversaciones profundas',
      detailedStory: 'Cuando empecé a hacer preguntas más complicadas sobre la vida, siempre encontraste tiempo para sentarte conmigo y hablar. No me juzgabas, solo me escuchabas y me guiabas con tu sabiduría.',
      icon: '🎓',
      category: 'adolescencia',
      emotion: 'Comprensión'
    },
    {
      id: 4,
      year: '2018-2020',
      title: 'Decisiones Importantes',
      description: 'Cuando me ayudaste a elegir mi camino',
      detailedStory: 'En esos momentos cruciales donde tenía que decidir sobre mi futuro, nunca me presionaste. Me diste opciones, me mostraste perspectivas y me dejaste elegir, pero siempre con tu apoyo incondicional.',
      icon: '🎯',
      category: 'adolescencia',
      emotion: 'Confianza'
    },
    {
      id: 5,
      year: '2020-2023',
      title: 'Madurando Contigo',
      description: 'Aprendiendo a ser un joven adulto',
      detailedStory: 'Estos últimos años han sido especiales. Ya no soy el niño que necesita que le aten los zapatos, pero sigo necesitando tus consejos. Ahora nuestras conversaciones son de igual a igual, y eso me llena de orgullo.',
      icon: '🤝',
      category: 'presente',
      emotion: 'Respeto mutuo'
    },
    {
      id: 6,
      year: '2024',
      title: 'El Presente',
      description: 'A mis 19 años, valorando cada momento',
      detailedStory: 'Hoy, a punto de cumplir 20 años (el 30 de diciembre), puedo decir que entiendo mejor el hombre extraordinario que eres. Cada día aprendo algo nuevo de ti, y cada día te admiro más.',
      icon: '🌟',
      category: 'presente',
      emotion: 'Admiración'
    },
    {
      id: 7,
      year: 'Futuro',
      title: 'Lo Que Viene',
      description: 'Los sueños que construiremos juntos',
      detailedStory: 'Espero algún día poder darte los mismos momentos de orgullo que tú me has dado a mí. Quiero que veas crecer a tus nietos, que disfrutes de tus logros y que sepas que todo lo que soy y seré, tiene tu huella.',
      icon: '🚀',
      category: 'futuro',
      emotion: 'Esperanza'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * Selecciona un recuerdo para mostrar detalles
   */
  selectMemory(memory: Memory): void {
    this.selectedMemory = this.selectedMemory?.id === memory.id ? null : memory;
  }

  /**
   * Navega a una página específica
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  /**
   * Obtiene el color según la categoría
   */
  getCategoryColor(category: string): string {
    const colors = {
      'infancia': '#e74c3c',
      'adolescencia': '#3498db',
      'presente': '#27ae60',
      'futuro': '#f39c12'
    };
    return colors[category as keyof typeof colors] || '#95a5a6';
  }

  /**
   * TrackBy function para optimizar el renderizado
   */
  trackByMemoryId(index: number, memory: Memory): number {
    return memory.id;
  }
}