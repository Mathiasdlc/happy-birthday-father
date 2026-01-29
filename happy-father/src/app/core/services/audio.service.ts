import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement | null = null;
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private volumeSubject = new BehaviorSubject<number>(0.3); // Volumen inicial bajo
  private isMutedSubject = new BehaviorSubject<boolean>(false);
  private isLoadedSubject = new BehaviorSubject<boolean>(false);
  private hasUserInteracted = false;
  private autoPlayEnabled = true; // Nueva opción para autoplay

  public isPlaying$ = this.isPlayingSubject.asObservable();
  public volume$ = this.volumeSubject.asObservable();
  public isMuted$ = this.isMutedSubject.asObservable();
  public isLoaded$ = this.isLoadedSubject.asObservable();

  constructor() {
    this.initializeAudio();
    this.setupUserInteractionListener();
  }

  /**
   * Inicializa el elemento de audio
   */
  private initializeAudio(): void {
    this.audio = new Audio();
    this.audio.loop = true; // Repetir la música
    this.audio.volume = this.volumeSubject.value;
    this.audio.preload = 'auto';
    
    // Eventos del audio
    this.audio.addEventListener('play', () => {
      this.isPlayingSubject.next(true);
    });

    this.audio.addEventListener('pause', () => {
      this.isPlayingSubject.next(false);
    });

    this.audio.addEventListener('ended', () => {
      this.isPlayingSubject.next(false);
    });

    this.audio.addEventListener('canplaythrough', () => {
      this.isLoadedSubject.next(true);
      
      // Si el usuario ya interactuó y el autoplay está habilitado, reproducir
      if (this.hasUserInteracted && this.autoPlayEnabled) {
        setTimeout(() => {
          this.play();
        }, 300);
      }
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('Error al cargar el audio:', e);
      this.isPlayingSubject.next(false);
      this.isLoadedSubject.next(false);
    });

    this.audio.addEventListener('loadstart', () => {
      this.isLoadedSubject.next(false);
    });
  }

  /**
   * Configura el listener para detectar la primera interacción del usuario
   */
  private setupUserInteractionListener(): void {
    const handleFirstInteraction = () => {
      this.hasUserInteracted = true;
      
      // Si el autoplay está habilitado y el audio está cargado, reproducir automáticamente
      if (this.autoPlayEnabled && this.isLoadedSubject.value) {
        setTimeout(() => {
          this.play();
        }, 500); // Pequeño delay para mejor experiencia
      }
      
      // Remover los listeners después de la primera interacción
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
  }

  /**
   * Carga una canción
   * @param audioPath - Ruta del archivo de audio
   */
  loadAudio(audioPath: string): void {
    if (this.audio) {
      this.audio.src = audioPath;
      this.audio.load();
    }
  }

  /**
   * Reproduce la música
   */
  async play(): Promise<void> {
    if (this.audio && this.hasUserInteracted) {
      try {
        await this.audio.play();
      } catch (error) {
        console.warn('No se pudo reproducir el audio:', error);
      }
    } else if (!this.hasUserInteracted) {
      console.info('Esperando interacción del usuario para reproducir audio');
    }
  }

  /**
   * Pausa la música
   */
  pause(): void {
    if (this.audio) {
      this.audio.pause();
    }
  }

  /**
   * Alterna entre reproducir y pausar
   */
  async toggle(): Promise<void> {
    if (this.isPlayingSubject.value) {
      this.pause();
    } else {
      await this.play();
    }
  }

  /**
   * Establece el volumen
   * @param volume - Volumen entre 0 y 1
   */
  setVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.volumeSubject.next(clampedVolume);
    
    if (this.audio) {
      this.audio.volume = clampedVolume;
    }
  }

  /**
   * Silencia o activa el audio
   */
  toggleMute(): void {
    const newMutedState = !this.isMutedSubject.value;
    this.isMutedSubject.next(newMutedState);
    
    if (this.audio) {
      this.audio.muted = newMutedState;
    }
  }

  /**
   * Obtiene el estado actual de reproducción
   */
  isPlaying(): boolean {
    return this.isPlayingSubject.value;
  }

  /**
   * Obtiene el volumen actual
   */
  getVolume(): number {
    return this.volumeSubject.value;
  }

  /**
   * Obtiene el estado de silencio
   */
  isMuted(): boolean {
    return this.isMutedSubject.value;
  }

  /**
   * Verifica si el audio está cargado
   */
  isLoaded(): boolean {
    return this.isLoadedSubject.value;
  }

  /**
   * Verifica si el usuario ha interactuado
   */
  hasUserInteractedWithPage(): boolean {
    return this.hasUserInteracted;
  }

  /**
   * Habilita o deshabilita el autoplay
   * @param enabled - true para habilitar autoplay, false para deshabilitarlo
   */
  setAutoPlay(enabled: boolean): void {
    this.autoPlayEnabled = enabled;
  }

  /**
   * Verifica si el autoplay está habilitado
   */
  isAutoPlayEnabled(): boolean {
    return this.autoPlayEnabled;
  }

  /**
   * Detiene completamente el audio
   */
  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  /**
   * Limpia los recursos del audio
   */
  destroy(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
  }
}