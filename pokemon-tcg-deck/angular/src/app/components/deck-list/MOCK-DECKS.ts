import { Deck } from '../../models/tcg-models';

export const MOCK_DECKS: Deck[] = [
  {
    _id: "deck-001",
    name: "Gardevoir ex (2025 NAIC Champion)",
    description: "First place deck from 2025 North America International Championships. Features Gardevoir ex as the main attacker with support from Kirlia and Ralts.",
    format: "standard",
    totalCards: 60,
    isValid: true,
    validationErrors: [],
    cards: [
      // Pokemon (15)
      {
        card: {
          id: "sv3pt5-86",
          name: "Gardevoir ex",
          supertype: "Pokémon",
          subtypes: ["Basic", "ex"],
          hp: "230",
          types: ["Psychic"],
          attacks: [
            {
              name: "Psychic Embrace",
              cost: ["Psychic"],
              convertedEnergyCost: 1,
              damage: "",
              text: "Search your deck for up to 2 basic Psychic Energy cards and attach them to your Pokémon in any way you like. Then, shuffle your deck."
            },
            {
              name: "Miracle Force",
              cost: ["Psychic", "Colorless", "Colorless"],
              convertedEnergyCost: 3,
              damage: "190",
              text: "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
            }
          ],
          weaknesses: [{ type: "Metal", value: "×2" }],
          retreatCost: ["Colorless", "Colorless"],
          convertedRetreatCost: 2,
          set: {
            id: "sv3pt5",
            name: "151",
            series: "Scarlet & Violet",
            printedTotal: 207,
            total: 207,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "MEW",
            releaseDate: "2023/06/16",
            updatedAt: "2023/06/16T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/sv3pt5/symbol.png",
              logo: "https://images.pokemontcg.io/sv3pt5/logo.png"
            }
          },
          number: "86",
          artist: "5ban Graphics",
          rarity: "Double Rare",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/sv3pt5/86.png",
            large: "https://images.pokemontcg.io/sv3pt5/86_hires.png"
          }
        },
        quantity: 3
      },
      {
        card: {
          id: "sv3pt5-83",
          name: "Kirlia",
          supertype: "Pokémon",
          subtypes: ["Stage 1"],
          hp: "80",
          types: ["Psychic"],
          evolvesFrom: "Ralts",
          attacks: [
            {
              name: "Refinement",
              cost: ["Colorless"],
              convertedEnergyCost: 1,
              damage: "",
              text: "Discard up to 2 cards from your hand. If you do, draw cards until you have 5 cards in your hand."
            }
          ],
          weaknesses: [{ type: "Metal", value: "×2" }],
          retreatCost: ["Colorless"],
          convertedRetreatCost: 1,
          set: {
            id: "sv3pt5",
            name: "151",
            series: "Scarlet & Violet",
            printedTotal: 207,
            total: 207,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "MEW",
            releaseDate: "2023/06/16",
            updatedAt: "2023/06/16T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/sv3pt5/symbol.png",
              logo: "https://images.pokemontcg.io/sv3pt5/logo.png"
            }
          },
          number: "83",
          artist: "Sanosuke Sakuma",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/sv3pt5/83.png",
            large: "https://images.pokemontcg.io/sv3pt5/83_hires.png"
          }
        },
        quantity: 2
      },
      {
        card: {
          id: "sv3pt5-82",
          name: "Ralts",
          supertype: "Pokémon",
          subtypes: ["Basic"],
          hp: "60",
          types: ["Psychic"],
          attacks: [
            {
              name: "Mumble",
              cost: ["Colorless"],
              convertedEnergyCost: 1,
              damage: "10",
              text: ""
            }
          ],
          weaknesses: [{ type: "Metal", value: "×2" }],
          retreatCost: ["Colorless"],
          convertedRetreatCost: 1,
          set: {
            id: "sv3pt5",
            name: "151",
            series: "Scarlet & Violet",
            printedTotal: 207,
            total: 207,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "MEW",
            releaseDate: "2023/06/16",
            updatedAt: "2023/06/16T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/sv3pt5/symbol.png",
              logo: "https://images.pokemontcg.io/sv3pt5/logo.png"
            }
          },
          number: "82",
          artist: "Yoriko Namba",
          rarity: "Common",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/sv3pt5/82.png",
            large: "https://images.pokemontcg.io/sv3pt5/82_hires.png"
          }
        },
        quantity: 4
      },
      // Add a few key trainer cards to keep it shorter for now
      {
        card: {
          id: "sv3-167",
          name: "Professor's Research",
          supertype: "Trainer",
          subtypes: ["Supporter"],
          rules: ["You may play only 1 Supporter card during your turn."],
          attacks: [],
          set: {
            id: "sv3",
            name: "Obsidian Flames",
            series: "Scarlet & Violet",
            printedTotal: 197,
            total: 230,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "OBF",
            releaseDate: "2023/08/11",
            updatedAt: "2023/08/11T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/sv3/symbol.png",
              logo: "https://images.pokemontcg.io/sv3/logo.png"
            }
          },
          number: "167",
          artist: "Yuu Nishida",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/sv3/167.png",
            large: "https://images.pokemontcg.io/sv3/167_hires.png"
          }
        },
        quantity: 4
      },
      // Basic Energy
      {
        card: {
          id: "sv2-193",
          name: "Basic Psychic Energy",
          supertype: "Energy",
          subtypes: ["Basic"],
          attacks: [],
          set: {
            id: "sv2",
            name: "Paldea Evolved",
            series: "Scarlet & Violet",
            printedTotal: 193,
            total: 279,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "PAL",
            releaseDate: "2023/06/09",
            updatedAt: "2023/06/09T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/sv2/symbol.png",
              logo: "https://images.pokemontcg.io/sv2/logo.png"
            }
          },
          number: "193",
          artist: "5ban Graphics",
          rarity: "Common",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/sv2/193.png",
            large: "https://images.pokemontcg.io/sv2/193_hires.png"
          }
        },
        quantity: 8
      }
    ],
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15')
  }
];