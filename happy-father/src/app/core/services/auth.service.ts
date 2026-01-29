import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  username: string;
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'birthday_auth';
  private readonly VALID_CREDENTIALS = {
    username: 'papa',
    password: 'felizcumple'
  };

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Verificar si hay una sesión guardada al inicializar el servicio
    this.checkStoredSession();
  }

  /**
   * Intenta hacer login con las credenciales proporcionadas
   * @param username - Nombre de usuario
   * @param password - Contraseña
   * @returns true si las credenciales son válidas, false en caso contrario
   */
  login(username: string, password: string): boolean {
    if (username === this.VALID_CREDENTIALS.username && 
        password === this.VALID_CREDENTIALS.password) {
      
      const user: User = {
        username: username,
        isAuthenticated: true
      };

      // Guardar sesión en localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      this.currentUserSubject.next(user);
      
      return true;
    }
    
    return false;
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns true si está autenticado, false en caso contrario
   */
  isAuthenticated(): boolean {
    const user = this.currentUserSubject.value;
    return user !== null && user.isAuthenticated;
  }

  /**
   * Obtiene el usuario actual
   * @returns Usuario actual o null si no está autenticado
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Verifica si hay una sesión guardada en localStorage
   */
  private checkStoredSession(): void {
    const storedUser = localStorage.getItem(this.STORAGE_KEY);
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        if (user.isAuthenticated) {
          this.currentUserSubject.next(user);
        }
      } catch (error) {
        // Si hay error al parsear, limpiar el storage
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }
  }
}