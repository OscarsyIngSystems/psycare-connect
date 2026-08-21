// components/empty-state/empty-state.component.ts
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {
  @Input() title: string = '¡Ups! No encontramos nada';
  @Input() message: string = 'Parece que no hay institutos disponibles en este momento.';
  @Input() emoji: string = '🔍';
  @Input() buttonText: string = 'Reintentar';
  @Input() showButton: boolean = true;

  @Output() retry = new EventEmitter<void>();

  // Array de mensajes graciosos
  private funnyMessages = [
    'Los institutos están de vacaciones 🏖️',
    'Hicimos una búsqueda exhaustiva... y no encontramos nada 🕵️',
    'Parece que los institutos se escondieron 🤫',
    '¿Será que los institutos están en huelga? 🤔',
    'El universo de los institutos está en silencio 🌌',
    'Instituto(s) no encontrado(s). ¿Tal vez están en otra dimensión? 🌠',
    'El buscador está tomando su café ☕',
    'Los institutos están en modo avión ✈️'
  ];

  getRandomMessage(): string {
    const randomIndex = Math.floor(Math.random() * this.funnyMessages.length);
    return this.funnyMessages[randomIndex];
  }

  funnyMessage = this.getRandomMessage();

  onRetry(): void {
    this.funnyMessage = this.getRandomMessage();
    this.retry.emit();
  }
}
