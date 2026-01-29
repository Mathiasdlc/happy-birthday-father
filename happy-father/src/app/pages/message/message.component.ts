import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  currentAge = 19;
  birthdayDate = '30 de diciembre'; // Tu cumpleaños
  
  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * Navega a una página específica
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}