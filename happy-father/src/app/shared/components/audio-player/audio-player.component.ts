import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../../core/services/audio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
  isPlaying = false;
  volume = 0.3;
  isMuted = false;
  isLoaded = false;
  showVolumeSlider = false;
  hasUserInteracted = false;
  autoPlayEnabled = true;
  
  // Hacer Math disponible en el template
  Math = Math;
  
  private subscriptions: Subscription[] = [];

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    // Cargar la música de fondo - Puedes cambiar esta URL por tu archivo local
    // Para usar archivo local: 'assets/audio/background-music.mp3'
    // Para prueba temporal: URL de muestra
    this.audioService.loadAudio('assets/audio/background-music.mp3');
    
    // Obtener estado inicial del autoplay
    this.autoPlayEnabled = this.audioService.isAutoPlayEnabled();
    
    // Suscribirse a los cambios de estado
    this.subscriptions.push(
      this.audioService.isPlaying$.subscribe(playing => {
        this.isPlaying = playing;
      }),
      
      this.audioService.volume$.subscribe(vol => {
        this.volume = vol;
      }),
      
      this.audioService.isMuted$.subscribe(muted => {
        this.isMuted = muted;
      }),

      this.audioService.isLoaded$.subscribe(loaded => {
        this.isLoaded = loaded;
      })
    );

    // Verificar interacción del usuario periódicamente
    this.checkUserInteraction();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Verifica si el usuario ha interactuado con la página
   */
  private checkUserInteraction(): void {
    const checkInterval = setInterval(() => {
      this.hasUserInteracted = this.audioService.hasUserInteractedWithPage();
      if (this.hasUserInteracted) {
        clearInterval(checkInterval);
      }
    }, 1000);
  }

  /**
   * Alterna la reproducción de música
   */
  async togglePlayback(): Promise<void> {
    await this.audioService.toggle();
  }

  /**
   * Alterna el silencio
   */
  toggleMute(): void {
    this.audioService.toggleMute();
  }

  /**
   * Cambia el volumen
   */
  onVolumeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const volume = parseFloat(target.value);
    this.audioService.setVolume(volume);
  }

  /**
   * Muestra/oculta el control de volumen
   */
  toggleVolumeSlider(): void {
    this.showVolumeSlider = !this.showVolumeSlider;
  }

  /**
   * Obtiene el icono apropiado para el botón de reproducción
   */
  getPlayIcon(): string {
    if (!this.isLoaded) {
      return '⏳'; // Cargando
    }
    return this.isPlaying ? '⏸️' : '▶️';
  }

  /**
   * Obtiene el icono apropiado para el botón de volumen
   */
  getVolumeIcon(): string {
    if (this.isMuted || this.volume === 0) {
      return '🔇';
    } else if (this.volume < 0.5) {
      return '🔉';
    } else {
      return '🔊';
    }
  }

  /**
   * Obtiene el texto del tooltip
   */
  getPlayTooltip(): string {
    if (!this.isLoaded) {
      return 'Cargando música...';
    }
    if (!this.hasUserInteracted) {
      return 'Haz clic para activar la música';
    }
    return this.isPlaying ? 'Pausar música' : 'Reproducir música';
  }

  /**
   * Obtiene el estado del reproductor para mostrar información
   */
  getPlayerStatus(): string {
    if (!this.isLoaded) {
      return 'Cargando...';
    }
    if (!this.hasUserInteracted) {
      return 'Clic para activar';
    }
    return this.isPlaying ? 'Reproduciendo' : 'Pausado';
  }

  /**
   * Alterna el autoplay
   */
  toggleAutoPlay(): void {
    this.autoPlayEnabled = !this.autoPlayEnabled;
    this.audioService.setAutoPlay(this.autoPlayEnabled);
  }

  /**
   * Verifica si el reproductor está listo para usar
   */
  isPlayerReady(): boolean {
    return this.isLoaded && this.hasUserInteracted;
  }
}