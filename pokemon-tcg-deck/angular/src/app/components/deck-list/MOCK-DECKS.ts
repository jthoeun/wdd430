import { Deck } from '../../models/tcg-models';

export const MOCK_DECKS: Deck[] = [
  {
    _id: "deck-001",
    name: "Gardevoir ex (2025 NAIC Champion)",
    description: "First place deck from 2025 North America International Championships. Features Gardevoir ex with Munkidori engine and diverse support Pokemon.",
    format: "standard",
    totalCards: 60,
    isValid: true,
    validationErrors: [],
    cards: [

      {
        card: {
          id: "svi-84",
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
            id: "svi",
            name: "Scarlet & Violet",
            series: "Scarlet & Violet",
            printedTotal: 198,
            total: 258,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "SVI",
            releaseDate: "2023/03/31",
            updatedAt: "2023/03/31T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/svi/symbol.png",
              logo: "https://images.pokemontcg.io/svi/logo.png"
            }
          },
          number: "84",
          artist: "Yoriko Namba",
          rarity: "Common",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/svi/84.png",
            large: "https://images.pokemontcg.io/svi/84_hires.png"
          }
        },
        quantity: 3
      },
      {
        card: {
          id: "svi-85",
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
            id: "svi",
            name: "Scarlet & Violet",
            series: "Scarlet & Violet",
            printedTotal: 198,
            total: 258,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "SVI",
            releaseDate: "2023/03/31",
            updatedAt: "2023/03/31T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/svi/symbol.png",
              logo: "https://images.pokemontcg.io/svi/logo.png"
            }
          },
          number: "85",
          artist: "Sanosuke Sakuma",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/svi/85.png",
            large: "https://images.pokemontcg.io/svi/85_hires.png"
          }
        },
        quantity: 2
      },
      {
        card: {
          id: "svi-86",
          name: "Gardevoir ex",
          supertype: "Pokémon",
          subtypes: ["Stage 2", "ex"],
          hp: "230",
          types: ["Psychic"],
          evolvesFrom: "Kirlia",
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
            id: "svi",
            name: "Scarlet & Violet",
            series: "Scarlet & Violet",
            printedTotal: 198,
            total: 258,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "SVI",
            releaseDate: "2023/03/31",
            updatedAt: "2023/03/31T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/svi/symbol.png",
              logo: "https://images.pokemontcg.io/svi/logo.png"
            }
          },
          number: "86",
          artist: "5ban Graphics",
          rarity: "Double Rare",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/svi/86.png",
            large: "https://images.pokemontcg.io/svi/86_hires.png"
          }
        },
        quantity: 2
      },
      {
        card: {
          id: "twm-95",
          name: "Munkidori",
          supertype: "Pokémon",
          subtypes: ["Basic"],
          hp: "120",
          types: ["Psychic"],
          attacks: [
            {
              name: "Adrenaline Brain",
              cost: ["Psychic"],
              convertedEnergyCost: 1,
              damage: "",
              text: "During your next turn, this Pokémon's Mind Bend attack does 120 more damage."
            },
            {
              name: "Mind Bend",
              cost: ["Psychic", "Colorless"],
              convertedEnergyCost: 2,
              damage: "50",
              text: ""
            }
          ],
          weaknesses: [{ type: "Metal", value: "×2" }],
          retreatCost: ["Colorless"],
          convertedRetreatCost: 1,
          set: {
            id: "twm",
            name: "Twilight Masquerade",
            series: "Scarlet & Violet",
            printedTotal: 167,
            total: 226,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "TWM",
            releaseDate: "2024/05/24",
            updatedAt: "2024/05/24T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/twm/symbol.png",
              logo: "https://images.pokemontcg.io/twm/logo.png"
            }
          },
          number: "95",
          artist: "PLANETA Yamashita",
          rarity: "Rare",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/twm/95.png",
            large: "https://images.pokemontcg.io/twm/95_hires.png"
          }
        },
        quantity: 4
      },
      {
        card: {
          id: "par-86",
          name: "Scream Tail",
          supertype: "Pokémon",
          subtypes: ["Basic"],
          hp: "90",
          types: ["Psychic"],
          attacks: [
            {
              name: "Continuous Tumble",
              cost: ["Colorless"],
              convertedEnergyCost: 1,
              damage: "30×",
              text: "Flip a coin until you get tails. This attack does 30 damage for each heads."
            }
          ],
          weaknesses: [{ type: "Metal", value: "×2" }],
          retreatCost: ["Colorless"],
          convertedRetreatCost: 1,
          set: {
            id: "par",
            name: "Paradox Rift",
            series: "Scarlet & Violet",
            printedTotal: 182,
            total: 266,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "PAR",
            releaseDate: "2023/11/03",
            updatedAt: "2023/11/03T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/par/symbol.png",
              logo: "https://images.pokemontcg.io/par/logo.png"
            }
          },
          number: "86",
          artist: "Shin Nagasawa",
          rarity: "Common",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/par/86.png",
            large: "https://images.pokemontcg.io/par/86_hires.png"
          }
        },
        quantity: 1
      },
      {
        card: {
          id: "jtg-56",
          name: "Lillie's Clefairy ex",
          supertype: "Pokémon",
          subtypes: ["Basic", "ex"],
          hp: "190",
          types: ["Colorless"],
          attacks: [
            {
              name: "Magical Charm",
              cost: ["Colorless"],
              convertedEnergyCost: 1,
              damage: "",
              text: "Search your deck for up to 3 cards and put them into your hand. Then, shuffle your deck."
            },
            {
              name: "Moon Impact",
              cost: ["Colorless", "Colorless", "Colorless"],
              convertedEnergyCost: 3,
              damage: "160",
              text: ""
            }
          ],
          weaknesses: [{ type: "Fighting", value: "×2" }],
          retreatCost: ["Colorless", "Colorless"],
          convertedRetreatCost: 2,
          set: {
            id: "jtg",
            name: "Jungle",
            series: "Classic",
            printedTotal: 64,
            total: 64,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "JTG",
            releaseDate: "2024/06/16",
            updatedAt: "2024/06/16T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/jtg/symbol.png",
              logo: "https://images.pokemontcg.io/jtg/logo.png"
            }
          },
          number: "56",
          artist: "PLANETA Mochizuki",
          rarity: "Double Rare",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/jtg/56.png",
            large: "https://images.pokemontcg.io/jtg/56_hires.png"
          }
        },
        quantity: 1
      },
      {
        card: {
          id: "mew-151",
          name: "Mew ex",
          supertype: "Pokémon",
          subtypes: ["Basic", "ex"],
          hp: "180",
          types: ["Psychic"],
          attacks: [
            {
              name: "Genome Hacking",
              cost: ["Psychic"],
              convertedEnergyCost: 1,
              damage: "",
              text: "Choose 1 of your opponent's Active Pokémon's attacks and use it as this attack."
            },
            {
              name: "Psychic Leap",
              cost: ["Psychic", "Colorless"],
              convertedEnergyCost: 2,
              damage: "70",
              text: "You may shuffle this Pokémon and all cards attached to it into your deck."
            }
          ],
          weaknesses: [{ type: "Metal", value: "×2" }],
          retreatCost: ["Colorless"],
          convertedRetreatCost: 1,
          set: {
            id: "mew",
            name: "151",
            series: "Scarlet & Violet",
            printedTotal: 207,
            total: 207,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "MEW",
            releaseDate: "2023/06/16",
            updatedAt: "2023/06/16T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/mew/symbol.png",
              logo: "https://images.pokemontcg.io/mew/logo.png"
            }
          },
          number: "151",
          artist: "PLANETA Mochizuki",
          rarity: "Double Rare",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/mew/151.png",
            large: "https://images.pokemontcg.io/mew/151_hires.png"
          }
        },
        quantity: 1
      },
      {
        card: {
          id: "sfa-38",
          name: "Fezandipiti ex",
          supertype: "Pokémon",
          subtypes: ["Basic", "ex"],
          hp: "210",
          types: ["Psychic"],
          attacks: [
            {
              name: "Alluring Perfume",
              cost: ["Psychic"],
              convertedEnergyCost: 1,
              damage: "",
              text: "Put 2 damage counters on each of your opponent's Pokémon."
            },
            {
              name: "Cruel Arrow",
              cost: ["Psychic", "Colorless", "Colorless"],
              convertedEnergyCost: 3,
              damage: "160",
              text: "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
            }
          ],
          weaknesses: [{ type: "Metal", value: "×2" }],
          retreatCost: ["Colorless", "Colorless"],
          convertedRetreatCost: 2,
          set: {
            id: "sfa",
            name: "Stellar Crown",
            series: "Scarlet & Violet",
            printedTotal: 142,
            total: 175,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "SFA",
            releaseDate: "2024/09/13",
            updatedAt: "2024/09/13T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/sfa/symbol.png",
              logo: "https://images.pokemontcg.io/sfa/logo.png"
            }
          },
          number: "38",
          artist: "5ban Graphics",
          rarity: "Double Rare",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/sfa/38.png",
            large: "https://images.pokemontcg.io/sfa/38_hires.png"
          }
        },
        quantity: 1
      },
      
      
      {
        card: {
          id: "jtg-155",
          name: "Professor's Research",
          supertype: "Trainer",
          subtypes: ["Supporter"],
          rules: ["You may play only 1 Supporter card during your turn."],
          attacks: [],
          set: {
            id: "jtg",
            name: "Jungle",
            series: "Classic",
            printedTotal: 64,
            total: 64,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "JTG",
            releaseDate: "2024/06/16",
            updatedAt: "2024/06/16T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/jtg/symbol.png",
              logo: "https://images.pokemontcg.io/jtg/logo.png"
            }
          },
          number: "155",
          artist: "Yuu Nishida",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/jtg/155.png",
            large: "https://images.pokemontcg.io/jtg/155_hires.png"
          }
        },
        quantity: 4
      },
      {
        card: {
          id: "pal-185",
          name: "Iono",
          supertype: "Trainer",
          subtypes: ["Supporter"],
          rules: ["You may play only 1 Supporter card during your turn."],
          attacks: [],
          set: {
            id: "pal",
            name: "Paldea Evolved",
            series: "Scarlet & Violet",
            printedTotal: 193,
            total: 279,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "PAL",
            releaseDate: "2023/06/09",
            updatedAt: "2023/06/09T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/pal/symbol.png",
              logo: "https://images.pokemontcg.io/pal/logo.png"
            }
          },
          number: "185",
          artist: "Megumi Mizutani",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/pal/185.png",
            large: "https://images.pokemontcg.io/pal/185_hires.png"
          }
        },
        quantity: 4
      },
      {
        card: {
          id: "obf-186",
          name: "Arven",
          supertype: "Trainer",
          subtypes: ["Supporter"],
          rules: ["You may play only 1 Supporter card during your turn."],
          attacks: [],
          set: {
            id: "obf",
            name: "Obsidian Flames",
            series: "Scarlet & Violet",
            printedTotal: 197,
            total: 230,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "OBF",
            releaseDate: "2023/08/11",
            updatedAt: "2023/08/11T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/obf/symbol.png",
              logo: "https://images.pokemontcg.io/obf/logo.png"
            }
          },
          number: "186",
          artist: "Yuu Nishida",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/obf/186.png",
            large: "https://images.pokemontcg.io/obf/186_hires.png"
          }
        },
        quantity: 2
      },
      {
        card: {
          id: "pal-172",
          name: "Boss's Orders",
          supertype: "Trainer",
          subtypes: ["Supporter"],
          rules: ["You may play only 1 Supporter card during your turn."],
          attacks: [],
          set: {
            id: "pal",
            name: "Paldea Evolved",
            series: "Scarlet & Violet",
            printedTotal: 193,
            total: 279,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "PAL",
            releaseDate: "2023/06/09",
            updatedAt: "2023/06/09T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/pal/symbol.png",
              logo: "https://images.pokemontcg.io/pal/logo.png"
            }
          },
          number: "172",
          artist: "Yuu Nishida",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/pal/172.png",
            large: "https://images.pokemontcg.io/pal/172_hires.png"
          }
        },
        quantity: 1
      },
      {
        card: {
          id: "svi-196",
          name: "Ultra Ball",
          supertype: "Trainer",
          subtypes: ["Item"],
          attacks: [],
          set: {
            id: "svi",
            name: "Scarlet & Violet",
            series: "Scarlet & Violet",
            printedTotal: 198,
            total: 258,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "SVI",
            releaseDate: "2023/03/31",
            updatedAt: "2023/03/31T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/svi/symbol.png",
              logo: "https://images.pokemontcg.io/svi/logo.png"
            }
          },
          number: "196",
          artist: "Keezy Kato",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/svi/196.png",
            large: "https://images.pokemontcg.io/svi/196_hires.png"
          }
        },
        quantity: 4
      },
      {
        card: {
          id: "par-163",
          name: "Earthen Vessel",
          supertype: "Trainer",
          subtypes: ["Item"],
          attacks: [],
          set: {
            id: "par",
            name: "Paradox Rift",
            series: "Scarlet & Violet",
            printedTotal: 182,
            total: 266,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "PAR",
            releaseDate: "2023/11/03",
            updatedAt: "2023/11/03T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/par/symbol.png",
              logo: "https://images.pokemontcg.io/par/logo.png"
            }
          },
          number: "163",
          artist: "Keezy Kato",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/par/163.png",
            large: "https://images.pokemontcg.io/par/163_hires.png"
          }
        },
        quantity: 3
      },
      {
        card: {
          id: "svi-181",
          name: "Nest Ball",
          supertype: "Trainer",
          subtypes: ["Item"],
          attacks: [],
          set: {
            id: "svi",
            name: "Scarlet & Violet",
            series: "Scarlet & Violet",
            printedTotal: 198,
            total: 258,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "SVI",
            releaseDate: "2023/03/31",
            updatedAt: "2023/03/31T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/svi/symbol.png",
              logo: "https://images.pokemontcg.io/svi/logo.png"
            }
          },
          number: "181",
          artist: "Keezy Kato",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/svi/181.png",
            large: "https://images.pokemontcg.io/svi/181_hires.png"
          }
        },
        quantity: 2
      },
      {
        card: {
          id: "svi-191",
          name: "Rare Candy",
          supertype: "Trainer",
          subtypes: ["Item"],
          attacks: [],
          set: {
            id: "svi",
            name: "Scarlet & Violet",
            series: "Scarlet & Violet",
            printedTotal: 198,
            total: 258,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "SVI",
            releaseDate: "2023/03/31",
            updatedAt: "2023/03/31T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/svi/symbol.png",
              logo: "https://images.pokemontcg.io/svi/logo.png"
            }
          },
          number: "191",
          artist: "inose yukie",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/svi/191.png",
            large: "https://images.pokemontcg.io/svi/191_hires.png"
          }
        },
        quantity: 2
      },
      {
        card: {
          id: "sfa-61",
          name: "Night Stretcher",
          supertype: "Trainer",
          subtypes: ["Item"],
          attacks: [],
          set: {
            id: "sfa",
            name: "Stellar Crown",
            series: "Scarlet & Violet",
            printedTotal: 142,
            total: 175,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "SFA",
            releaseDate: "2024/09/13",
            updatedAt: "2024/09/13T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/sfa/symbol.png",
              logo: "https://images.pokemontcg.io/sfa/logo.png"
            }
          },
          number: "61",
          artist: "Studio Bora Inc.",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/sfa/61.png",
            large: "https://images.pokemontcg.io/sfa/61_hires.png"
          }
        },
        quantity: 2
      },
      {
        card: {
          id: "pal-188",
          name: "Super Rod",
          supertype: "Trainer",
          subtypes: ["Item"],
          attacks: [],
          set: {
            id: "pal",
            name: "Paldea Evolved",
            series: "Scarlet & Violet",
            printedTotal: 193,
            total: 279,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "PAL",
            releaseDate: "2023/06/09",
            updatedAt: "2023/06/09T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/pal/symbol.png",
              logo: "https://images.pokemontcg.io/pal/logo.png"
            }
          },
          number: "188",
          artist: "Keezy Kato",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/pal/188.png",
            large: "https://images.pokemontcg.io/pal/188_hires.png"
          }
        },
        quantity: 1
      },
      {
        card: {
          id: "par-160",
          name: "Counter Catcher",
          supertype: "Trainer",
          subtypes: ["Item"],
          attacks: [],
          set: {
            id: "par",
            name: "Paradox Rift",
            series: "Scarlet & Violet",
            printedTotal: 182,
            total: 266,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "PAR",
            releaseDate: "2023/11/03",
            updatedAt: "2023/11/03T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/par/symbol.png",
              logo: "https://images.pokemontcg.io/par/logo.png"
            }
          },
          number: "160",
          artist: "Keiji Kinebuchi",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/par/160.png",
            large: "https://images.pokemontcg.io/par/160_hires.png"
          }
        },
        quantity: 1
      },
      {
        card: {
          id: "svi-173",
          name: "Energy Switch",
          supertype: "Trainer",
          subtypes: ["Item"],
          attacks: [],
          set: {
            id: "svi",
            name: "Scarlet & Violet",
            series: "Scarlet & Violet",
            printedTotal: 198,
            total: 258,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "SVI",
            releaseDate: "2023/03/31",
            updatedAt: "2023/03/31T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/svi/symbol.png",
              logo: "https://images.pokemontcg.io/svi/logo.png"
            }
          },
          number: "173",
          artist: "Studio Bora Inc.",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/svi/173.png",
            large: "https://images.pokemontcg.io/svi/173_hires.png"
          }
        },
        quantity: 1
      },
      {
        card: {
          id: "twm-163",
          name: "Secret Box",
          supertype: "Trainer",
          subtypes: ["Item"],
          attacks: [],
          set: {
            id: "twm",
            name: "Twilight Masquerade",
            series: "Scarlet & Violet",
            printedTotal: 167,
            total: 226,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "TWM",
            releaseDate: "2024/05/24",
            updatedAt: "2024/05/24T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/twm/symbol.png",
              logo: "https://images.pokemontcg.io/twm/logo.png"
            }
          },
          number: "163",
          artist: "Studio Bora Inc.",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/twm/163.png",
            large: "https://images.pokemontcg.io/twm/163_hires.png"
          }
        },
        quantity: 1
      },
      {
        card: {
          id: "par-178",
          name: "Technical Machine: Evolution",
          supertype: "Trainer",
          subtypes: ["Item", "Technical Machine"],
          attacks: [],
          set: {
            id: "par",
            name: "Paradox Rift",
            series: "Scarlet & Violet",
            printedTotal: 182,
            total: 266,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "PAR",
            releaseDate: "2023/11/03",
            updatedAt: "2023/11/03T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/par/symbol.png",
              logo: "https://images.pokemontcg.io/par/logo.png"
            }
          },
          number: "178",
          artist: "Studio Bora Inc.",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/par/178.png",
            large: "https://images.pokemontcg.io/par/178_hires.png"
          }
        },
        quantity: 2
      },
      {
        card: {
          id: "par-179",
          name: "Technical Machine: Turbo Energize",
          supertype: "Trainer",
          subtypes: ["Item", "Technical Machine"],
          attacks: [],
          set: {
            id: "par",
            name: "Paradox Rift",
            series: "Scarlet & Violet",
            printedTotal: 182,
            total: 266,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "PAR",
            releaseDate: "2023/11/03",
            updatedAt: "2023/11/03T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/par/symbol.png",
              logo: "https://images.pokemontcg.io/par/logo.png"
            }
          },
          number: "179",
          artist: "Studio Bora Inc.",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/par/179.png",
            large: "https://images.pokemontcg.io/par/179_hires.png"
          }
        },
        quantity: 1
      },
      {
        card: {
          id: "pal-173",
          name: "Bravery Charm",
          supertype: "Trainer",
          subtypes: ["Item", "Pokémon Tool"],
          attacks: [],
          set: {
            id: "pal",
            name: "Paldea Evolved",
            series: "Scarlet & Violet",
            printedTotal: 193,
            total: 279,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "PAL",
            releaseDate: "2023/06/09",
            updatedAt: "2023/06/09T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/pal/symbol.png",
              logo: "https://images.pokemontcg.io/pal/logo.png"
            }
          },
          number: "173",
          artist: "Studio Bora Inc.",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/pal/173.png",
            large: "https://images.pokemontcg.io/pal/173_hires.png"
          }
        },
        quantity: 1
      },
      {
        card: {
          id: "pal-171",
          name: "Artazon",
          supertype: "Trainer",
          subtypes: ["Stadium"],
          attacks: [],
          set: {
            id: "pal",
            name: "Paldea Evolved",
            series: "Scarlet & Violet",
            printedTotal: 193,
            total: 279,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "PAL",
            releaseDate: "2023/06/09",
            updatedAt: "2023/06/09T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/pal/symbol.png",
              logo: "https://images.pokemontcg.io/pal/logo.png"
            }
          },
          number: "171",
          artist: "Oswaldo KATO",
          rarity: "Uncommon",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/pal/171.png",
            large: "https://images.pokemontcg.io/pal/171_hires.png"
          }
        },
        quantity: 2
      },
      
      // Energy Cards (11)
      {
        card: {
          id: "sve-13",
          name: "Psychic Energy",
          supertype: "Energy",
          subtypes: ["Basic"],
          attacks: [],
          set: {
            id: "sve",
            name: "Scarlet & Violet Energies",
            series: "Scarlet & Violet",
            printedTotal: 16,
            total: 16,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "SVE",
            releaseDate: "2023/03/31",
            updatedAt: "2023/03/31T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/sve/symbol.png",
              logo: "https://images.pokemontcg.io/sve/logo.png"
            }
          },
          number: "13",
          artist: "5ban Graphics",
          rarity: "Common",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/sve/13.png",
            large: "https://images.pokemontcg.io/sve/13_hires.png"
          }
        },
        quantity: 7
      },
      {
        card: {
          id: "sve-15",
          name: "Darkness Energy",
          supertype: "Energy",
          subtypes: ["Basic"],
          attacks: [],
          set: {
            id: "sve",
            name: "Scarlet & Violet Energies",
            series: "Scarlet & Violet",
            printedTotal: 16,
            total: 16,
            legalities: { standard: "legal", expanded: "legal" },
            ptcgoCode: "SVE",
            releaseDate: "2023/03/31",
            updatedAt: "2023/03/31T00:00:00Z",
            images: {
              symbol: "https://images.pokemontcg.io/sve/symbol.png",
              logo: "https://images.pokemontcg.io/sve/logo.png"
            }
          },
          number: "15",
          artist: "5ban Graphics",
          rarity: "Common",
          legalities: { standard: "legal", expanded: "legal" },
          images: {
            small: "https://images.pokemontcg.io/sve/15.png",
            large: "https://images.pokemontcg.io/sve/15_hires.png"
          }
        },
        quantity: 4
      }
    ],
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15')
  },
  {
    _id: "deck-002",
    name: "My Custom Deck",
    description: "A deck I'm building for testing",
    format: "standard",
    totalCards: 0,
    isValid: false,
    validationErrors: ["Deck must have exactly 60 cards (currently has 0)"],
    cards: [],
    createdAt: new Date('2025-01-16'),
    updatedAt: new Date('2025-01-16')
  }
]