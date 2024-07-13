import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forum-thread-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: { content: string } = { content: '' };  // Inicializar con un valor predeterminado

  constructor() { }

  ngOnInit(): void {
  }
}
