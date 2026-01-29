import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;
  showContent: boolean = false;
  currentAge = 19; // Tu edad actual en 2026

  // Frases inspiracionales que rotan
  inspirationalQuotes: string[] = [
    '"Un padre no es quien te da la vida, sino quien te enseña a vivirla"',
    '"La verdadera riqueza de un hombre se mide por el legado que deja"',
    '"Los mejores padres no son perfectos, son auténticos"',
    '"El respeto se gana, el amor se cultiva, el ejemplo se vive"'
  ];

  currentQuoteIndex: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    // Mostrar contenido con un pequeño delay para mejor efecto visual
    setTimeout(() => {
      this.showContent = true;
    }, 300);

    // Rotar frases cada 4 segundos
    setInterval(() => {
      this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.inspirationalQuotes.length;
    }, 4000);
  }

  /**
   * Maneja el logout del usuario
   */
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Obtiene la fecha actual formateada
   */
  getCurrentDate(): string {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return today.toLocaleDateString('es-ES', options);
  }

  /**
   * Navega a una página específica
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  /**
   * Obtiene la frase actual
   */
  getCurrentQuote(): string {
    return this.inspirationalQuotes[this.currentQuoteIndex];
  }
}
