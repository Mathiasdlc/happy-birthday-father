import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-celebration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './celebration.component.html',
  styleUrls: ['./celebration.component.css']
})
export class CelebrationComponent implements OnInit {
  currentAge = 19; // Tu edad actual en 2026
  dadAge = 46; // Edad actual de tu papá (nació feb 1980)
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  /**
   * Navega a una página específica
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  /**
   * Maneja el logout
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
}