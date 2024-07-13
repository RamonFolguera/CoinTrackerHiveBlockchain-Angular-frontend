import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importa RouterModule

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, RouterModule], // Agrega RouterModule a las importaciones
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  threads = [
    { title: 'Thread 1' },
    { title: 'Thread 2' },
    { title: 'Thread 3' }
  ];

  constructor() { }

  ngOnInit(): void {}
}
