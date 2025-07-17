import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonTcgService } from '../../services/pokemon-tcg.service';
import { Card, CardSet, ApiResponse } from '../../models/tcg-models';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-card-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})
export class CardSearchComponent implements OnInit {
  @Output() cardSelected = new EventEmitter<Card>();

  cards: Card[] = [];
  sets: CardSet[] = [];
  loading = false;
  error = '';
  
  searchQuery = '';
  selectedSet = '';
  selectedType = '';
  standardOnly = true; // Default to Standard format only
  currentPage = 1;
  totalPages = 1;
  
  private searchSubject = new Subject<string>();

  supertypes = ['Pokémon', 'Trainer', 'Energy'];

  constructor(private tcgService: PokemonTcgService) {}

  ngOnInit(): void {
    this.loadSets();
    this.loadInitialCards(); // Load initial Standard cards
    
    // Setup debounced search
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        this.loading = true;
        return this.tcgService.searchCardsByName(query, 1, this.standardOnly);
      })
    ).subscribe({
      next: (response) => {
        this.cards = response.data;
        this.currentPage = response.page;
        this.totalPages = Math.ceil(response.totalCount / response.pageSize);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to search cards';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSearchInput(): void {
    this.searchSubject.next(this.searchQuery);
  }

  onFormatChange(): void {
    // Reload current search/filter with new format setting
    if (this.searchQuery) {
      this.onSearchInput();
    } else if (this.selectedSet) {
      this.onSetChange();
    } else if (this.selectedType) {
      this.onTypeChange();
    } else {
      this.loadInitialCards();
    }
    
    // Reload sets based on format
    this.loadSets();
  }

  onSetChange(): void {
    if (this.selectedSet) {
      this.loading = true;
      this.tcgService.searchCardsBySet(this.selectedSet, 1, this.standardOnly).subscribe({
        next: (response) => {
          this.cards = response.data;
          this.currentPage = response.page;
          this.totalPages = Math.ceil(response.totalCount / response.pageSize);
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load set cards';
          this.loading = false;
        }
      });
    }
  }

  onTypeChange(): void {
    if (this.selectedType) {
      this.loading = true;
      this.tcgService.searchCardsByType(this.selectedType, 1, this.standardOnly).subscribe({
        next: (response) => {
          this.cards = response.data;
          this.currentPage = response.page;
          this.totalPages = Math.ceil(response.totalCount / response.pageSize);
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load cards by type';
          this.loading = false;
        }
      });
    }
  }

  loadPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    
    this.loading = true;
    let searchObservable;
    
    if (this.searchQuery) {
      searchObservable = this.tcgService.searchCardsByName(this.searchQuery, page, this.standardOnly);
    } else if (this.selectedSet) {
      searchObservable = this.tcgService.searchCardsBySet(this.selectedSet, page, this.standardOnly);
    } else if (this.selectedType) {
      searchObservable = this.tcgService.searchCardsByType(this.selectedType, page, this.standardOnly);
    } else {
      const query = this.standardOnly ? 'legalities.standard:legal' : '';
      searchObservable = this.tcgService.searchCards({ 
        q: query, 
        page, 
        pageSize: 20,
        orderBy: 'name'
      });
    }
    
    searchObservable.subscribe({
      next: (response) => {
        this.cards = response.data;
        this.currentPage = response.page;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load page';
        this.loading = false;
      }
    });
  }

  onCardSelect(card: Card): void {
    // Check if card is legal in Standard if standardOnly is enabled
    if (this.standardOnly && card.legalities.standard !== 'legal') {
      this.error = `${card.name} is not legal in Standard format`;
      return;
    }
    this.cardSelected.emit(card);
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedSet = '';
    this.selectedType = '';
    this.loadInitialCards();
  }

  private loadSets(): void {
    const setsObservable = this.standardOnly ? 
      this.tcgService.getStandardSets() : 
      this.tcgService.getAllSets();
      
    setsObservable.subscribe({
      next: (response) => {
        this.sets = response.data.sort((a, b) => 
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
      },
      error: (err) => {
        console.error('Failed to load sets:', err);
      }
    });
  }

  private loadInitialCards(): void {
    this.loading = true;
    const query = this.standardOnly ? 'legalities.standard:legal' : '';
    
    this.tcgService.searchCards({ 
      q: query,
      page: 1, 
      pageSize: 20, 
      orderBy: 'name' 
    }).subscribe({
      next: (response) => {
        this.cards = response.data;
        this.currentPage = response.page;
        this.totalPages = Math.ceil(response.totalCount / response.pageSize);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load cards';
        this.loading = false;
      }
    });
  }

  isCardLegal(card: Card): boolean {
    if (this.standardOnly) {
      return card.legalities.standard === 'legal';
    }
    return true;
  }

  getSuperTypeBadgeColor(supertype: string): string {
  switch (supertype) {
    case 'Pokémon': return 'danger';
    case 'Trainer': return 'info';
    case 'Energy': return 'warning';
    default: return 'secondary';
  }
}
}