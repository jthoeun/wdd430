import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Pokemon TCG Deck Builder</h1>
        <nav>
          <a routerLink="/decks" routerLinkActive="active">My Decks</a>
          <a routerLink="/builder" routerLinkActive="active">Deck Builder</a>
        </nav>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .app-header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 1rem 2rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .app-header h1 {
      margin: 0;
      color: #333;
      font-size: 1.8rem;
    }
    .app-header nav a {
      color: #333;
      text-decoration: none;
      margin-left: 2rem;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all 0.3s;
      font-weight: 500;
    }
    .app-header nav a:hover,
    .app-header nav a.active {
      background-color: #3498db;
      color: white;
    }
    main {
      padding: 2rem;
    }
  `]
})
export class AppComponent {
  title = 'Pokemon TCG Deck Builder';
}