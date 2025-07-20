import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card, CardSet, ApiResponse, CardSearchParams } from '../models/tcg-models';

@Injectable({
  providedIn: 'root'
})
export class PokemonTcgService {
  private baseUrl = 'https://api.pokemontcg.io/v2';
  private apiKey = '367047db-c1d9-4e58-bc05-1d7b0f607eb1'; 

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const headers: any = {
      'Content-Type': 'application/json'
    };
    if (this.apiKey) {
      headers['X-Api-Key'] = this.apiKey;
    }
    return headers;
  }

  searchCards(params: CardSearchParams): Observable<ApiResponse<Card>> {
    let httpParams = new HttpParams();
    
    if (params.q) httpParams = httpParams.set('q', params.q);
    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.orderBy) httpParams = httpParams.set('orderBy', params.orderBy);
    if (params.select) httpParams = httpParams.set('select', params.select);

    return this.http.get<ApiResponse<Card>>(`${this.baseUrl}/cards`, {
      params: httpParams,
      headers: this.getHeaders()
    });
  }

  // search only Standard-legal cards
  searchStandardCards(params: CardSearchParams): Observable<ApiResponse<Card>> {
    const standardQuery = params.q ? `${params.q} legalities.standard:Legal` : 'legalities.standard:Legal';
    
    return this.searchCards({
      ...params,
      q: standardQuery
    });
  }

  getCard(id: string): Observable<{ data: Card }> {
    return this.http.get<{ data: Card }>(`${this.baseUrl}/cards/${id}`, {
      headers: this.getHeaders()
    });
  }

  getSets(): Observable<ApiResponse<CardSet>> {
    return this.http.get<ApiResponse<CardSet>>(`${this.baseUrl}/sets`, {
      headers: this.getHeaders()
    });
  }

  getSet(id: string): Observable<{ data: CardSet }> {
    return this.http.get<{ data: CardSet }>(`${this.baseUrl}/sets/${id}`, {
      headers: this.getHeaders()
    });
  }

  searchCardsByName(name: string, page: number = 1, standardOnly: boolean = true): Observable<ApiResponse<Card>> {
    const baseQuery = `name:"*${name}*"`;
    const query = standardOnly ? `${baseQuery} legalities.standard:Legal` : baseQuery;
    
    return this.searchCards({
      q: query,
      page,
      pageSize: 20,
      orderBy: 'name'
    });
  }

  searchCardsBySet(setId: string, page: number = 1, standardOnly: boolean = true): Observable<ApiResponse<Card>> {
    const baseQuery = `set.id:${setId}`;
    
    const query = standardOnly ? `${baseQuery} legalities.standard:Legal` : baseQuery;
    
    return this.searchCards({
      q: query,
      page,
      pageSize: 20,
      orderBy: 'number'
    });
  }

  searchCardsByType(supertype: string, page: number = 1, standardOnly: boolean = true): Observable<ApiResponse<Card>> {
    const baseQuery = `supertype:${supertype}`;
    const query = standardOnly ? `${baseQuery} legalities.standard:Legal` : baseQuery;
    
    return this.searchCards({
      q: query,
      page,
      pageSize: 20,
      orderBy: 'name'
    });
  }

  // Get only Standard-legal sets
  getStandardSets(): Observable<ApiResponse<CardSet>> {
    return this.http.get<ApiResponse<CardSet>>(`${this.baseUrl}/sets?q=legalities.standard:Legal`, {
      headers: this.getHeaders()
    });
  }

  // Get all sets
  getAllSets(): Observable<ApiResponse<CardSet>> {
    return this.getSets();
  }
}