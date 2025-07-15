export interface Card {
  id: string;
  name: string;
  supertype: 'Pokémon' | 'Trainer' | 'Energy';
  subtypes: string[];
  level?: string;
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  attacks?: Attack[];
  weaknesses?: TypeValue[];
  resistances?: TypeValue[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: CardSet;
  number: string;
  artist?: string;
  rarity: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities: Legalities;
  images: CardImages;
  tcgplayer?: TcgPlayer;
  cardmarket?: CardMarket;
}

export interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

export interface TypeValue {
  type: string;
  value: string;
}

export interface CardSet {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode?: string;
  releaseDate: string;
  updatedAt: string;
  images: SetImages;
}

export interface Legalities {
  unlimited?: string;
  standard?: string;
  expanded?: string;
}

export interface CardImages {
  small: string;
  large: string;
}

export interface SetImages {
  symbol: string;
  logo: string;
}

export interface TcgPlayer {
  url: string;
  updatedAt: string;
  prices?: any;
}

export interface CardMarket {
  url: string;
  updatedAt: string;
  prices?: any;
}

export interface Deck {
  _id?: string;
  name: string;
  description?: string;
  format: 'standard' | 'expanded' | 'unlimited';
  cards: DeckCard[];
  totalCards?: number;
  isValid?: boolean;
  validationErrors?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DeckCard {
  card: Card;
  quantity: number;
}

export interface CardSearchParams {
  q?: string;
  page?: number;
  pageSize?: number;
  orderBy?: string;
  select?: string;
}

export interface ApiResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}