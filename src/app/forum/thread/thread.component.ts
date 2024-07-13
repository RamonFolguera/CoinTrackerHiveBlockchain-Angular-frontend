import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component'; // Importa el componente PostComponent

@Component({
  selector: 'app-forum-thread',
  standalone: true,
  imports: [CommonModule, PostComponent], // Agrega PostComponent a las importaciones
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  @Input() threadTitle: string = '';
  posts = [
    { content: 'Post 1' },
    { content: 'Post 2' },
    { content: 'Post 3' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
