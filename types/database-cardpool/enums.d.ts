import { ValuesOf } from "../types";
export declare enum CardLocation {
    EGG_DECK = "egg deck",
    DECK = "deck",
    RAISING = "raising",
    PLAY_AREA = "play area",
    TRASH = "trash"
}
export declare enum CardColor {
    BLACK = "Black",
    GREEN = "Green",
    PURPLE = "Purple",
    RED = "Red",
    WHITE = "White",
    YELLOW = "Yellow"
}
export declare enum CardType {
    DIGIMON = "Digimon",
    DIGI_EGG = "Digi-Egg",
    OPTION = "Option",
    TAMER = "Tamer"
}
export declare enum DigimonLevel {
    EGG = 2,
    ROOKIE = 3,
    CHAMPION = 4,
    ULTIMATE = 5,
    MEGA = 6,
    OVER_MEGA = 7
}
export declare enum DigimonForm {
    ARMOR_FORM = "Armor Form",
    BABY = "Baby",
    CHAMPION = "Champion",
    D_REAPER = "D-Reaper",
    HYBRID = "Hybrid",
    IN_TRAINING = "In-Training",
    MEGA = "Mega",
    ROOKIE = "Rookie",
    ULTIMATE = "Ultimate"
}
export declare enum DigimonType {
    _9000 = "9000",
    AA_DEFENSE_AGENT = "AA Defense Agent",
    ABADIN_ELECTRONICS = "Abadin Electronics",
    ABILITY_SYNTHESIS_AGENT = "Ability Synthesis Agent",
    ABNORMAL = "Abnormal",
    ALIEN = "Alien",
    ALIEN_HUMANOID = "Alien Humanoid",
    AMPHIBIAN = "Amphibian",
    ANCIENT = "Ancient",
    ANCIENT_ANIMAL = "Ancient Animal",
    ANCIENT_AQUABEAST = "Ancient Aquabeast",
    ANCIENT_BIRD = "Ancient Bird",
    ANCIENT_BIRDKIN = "Ancient Birdkin",
    ANCIENT_CRUSTACEAN = "Ancient Crustacean",
    ANCIENT_DRAGON = "Ancient Dragon",
    ANCIENT_DRAGONKIN = "Ancient Dragonkin",
    ANCIENT_FAIRY = "Ancient Fairy",
    ANCIENT_FISH = "Ancient Fish",
    ANCIENT_HOLY_WARRIOR = "Ancient Holy Warrior",
    ANCIENT_INSECTOID = "Ancient Insectoid",
    ANCIENT_MINERAL = "Ancient Mineral",
    ANCIENT_MUTANT = "Ancient Mutant",
    ANCIENT_MYTHICAL_BEAST = "Ancient Mythical Beast",
    ANCIENT_PLANT = "Ancient Plant",
    ANDROID = "Android",
    ANGEL = "Angel",
    ANIMAL = "Animal",
    ANKYLOSAUR = "Ankylosaur",
    AQUABEAST = "Aquabeast",
    AQUATIC = "Aquatic",
    ARCHANGEL = "Archangel",
    ARMOR = "Armor",
    AUTHORITY = "Authority",
    AVATAR = "Avatar",
    AVIAN = "Avian",
    BABY_DRAGON = "Baby Dragon",
    BASE_DEFENSE_AGENT = "Base Defense Agent",
    BEAST = "Beast",
    BEAST_DRAGON = "Beast Dragon",
    BEAST_KNIGHT = "Beast Knight",
    BEASTKIN = "Beastkin",
    BIRD = "Bird",
    BIRD_DRAGON = "Bird Dragon",
    BIRDKIN = "Birdkin",
    BLUE_FLARE = "Blue Flare",
    BOSS = "Boss",
    BULB = "Bulb",
    CARNIVOROUS_PLANT = "Carnivorous Plant",
    CERATOPSIAN = "Ceratopsian",
    CHERUB = "Cherub",
    COMMANDER_AGENT = "Commander Agent",
    COMPOSITE = "Composite",
    COMPOSITION = "Composition",
    CRT = "CRT",
    CRUSTACEAN = "Crustacean",
    CYBORG = "Cyborg",
    D_BRIGADE = "D-Brigade",
    DARK_ANIMAL = "Dark Animal",
    DARK_DRAGON = "Dark Dragon",
    DARK_KNIGHT = "Dark Knight",
    DEMON = "Demon",
    DEMON_LORD = "Demon Lord",
    DEVA = "Deva",
    DIGIPOLICE = "DigiPolice",
    DINOSAUR = "Dinosaur",
    DOMINION = "Dominion",
    DRAGON = "Dragon",
    DRAGON_WARRIOR = "Dragon Warrior",
    DRAGONKIN = "Dragonkin",
    EARTH_DRAGON = "Earth Dragon",
    ENHANCEMENT = "Enhancement",
    ESPIONAGE_AGENT = "Espionage Agent",
    EVIL = "Evil",
    EVIL_DRAGON = "Evil Dragon",
    FAIRY = "Fairy",
    FALLEN_ANGEL = "Fallen Angel",
    FIRE = "Fire",
    FIRE_DRAGON = "Fire Dragon",
    FLAME = "Flame",
    FOOD = "Food",
    FOUR_GREAT_DRAGONS = "Four Great Dragons",
    FOUR_SOVEREIGNS = "Four Sovereigns",
    GALAXY = "Galaxy",
    GENERAL = "General",
    GHOST = "Ghost",
    GIANT_BIRD = "Giant Bird",
    GOD_BEAST = "God Beast",
    GRAPPLING_AGENT = "Grappling Agent",
    GROUND_COMBAT_AGENT = "Ground Combat Agent",
    HOLY_BEAST = "Holy Beast",
    HOLY_BIRD = "Holy Bird",
    HOLY_DRAGON = "Holy Dragon",
    HOLY_SWORD = "Holy Sword",
    HOLY_WARRIOR = "Holy Warrior",
    HUNTER = "Hunter",
    ICE_SNOW = "Ice-Snow",
    ICY = "Icy",
    INSECTOID = "Insectoid",
    INTEL_ACQUISITION_AGENT = "Intel Acquisition Agent",
    INVADER = "Invader",
    LARVA = "Larva",
    LCD = "LCD",
    LEGEND_ARMS = "Legend-Arms",
    LESSER = "Lesser",
    LIBERATOR = "LIBERATOR",
    LIGHT_DRAGON = "Light Dragon",
    LIGHT_FANG = "Light Fang",
    MACHINE = "Machine",
    MACHINE_DRAGON = "Machine Dragon",
    MAGIC_KNIGHT = "Magic Knight",
    MAGIC_WARRIOR = "Magic Warrior",
    MAJOR = "Major",
    MAMMAL = "Mammal",
    MARINE_MAN = "Marine Man",
    MINE = "Mine",
    MINERAL = "Mineral",
    MINI_ANGEL = "Mini Angel",
    MINI_BIRD = "Mini Bird",
    MINI_DRAGON = "Mini Dragon",
    MINOR = "Minor",
    MOLLUSK = "Mollusk",
    MONK = "Monk",
    MOTHERSHIP_AGENT = "Mothership Agent",
    MUSICAL_INSTRUMENT = "Musical Instrument",
    MUTANT = "Mutant",
    MYSTERIOUS_BEAST = "Mysterious Beast",
    MYSTERIOUS_BIRD = "Mysterious Bird",
    MYTHICAL = "Mythical",
    MYTHICAL_ANIMAL = "Mythical Animal",
    MYTHICAL_BEAST = "Mythical Beast",
    MYTHICAL_DRAGON = "Mythical Dragon",
    NIGHT_CLAW = "Night Claw",
    NO_DATA = "NO DATA",
    PARASITE = "Parasite",
    PERFECT = "Perfect",
    PIXIE = "Pixie",
    PLESIOSAUR = "Plesiosaur",
    PRINCIPALITY = "Principality",
    PUPPET = "Puppet",
    RARE_ANIMAL = "Rare Animal",
    RECONNAISSANCE_AGENT = "Reconnaissance Agent",
    REPTILE = "Reptile",
    REPTILE_MAN = "Reptile Man",
    ROCK = "Rock",
    ROCK_DRAGON = "Rock Dragon",
    ROYAL_KNIGHT = "Royal Knight",
    SEA_ANIMAL = "Sea Animal",
    SEA_BEAST = "Sea Beast",
    SERAPH = "Seraph",
    SEVEN_GREAT_DEMON_LORDS = "Seven Great Demon Lords",
    SHAMAN = "Shaman",
    SKELETON = "Skeleton",
    SKY_DRAGON = "Sky Dragon",
    S_O_C = "SoC",
    SUPER_MAJOR = "Super Major",
    TATHAGATA = "Tath\u0101gata",
    TEN_WARRIORS = "Ten Warriors",
    THREE_GREAT_ANGELS = "Three Great Angels",
    THRONE = "Throne",
    TROPICAL_FISH = "Tropical Fish",
    TWILIGHT = "Twilight",
    UNANALYZABLE = "Unanalyzable",
    UNDEAD = "Undead",
    UNIDENTIFIED = "Unidentified",
    UNIQUE = "Unique",
    UNKNOWN = "Unknown",
    VEGETATION = "Vegetation",
    VIRTUE = "Virtue",
    WARRIOR = "Warrior",
    WEAPON = "Weapon",
    WIZARD = "Wizard",
    X_ANTIBODY = "X Antibody",
    XROS_HEART = "Xros Heart"
}
export declare enum DigimonAttribute {
    VACCINE = "Vaccine",
    DATA = "Data",
    VIRUS = "Virus",
    UNKNOWN = "Unknown",
    FREE = "Free"
}
export declare enum OptionTrait {
}
export declare enum TamerTrait {
}
export declare const CardTrait: Readonly<{
    readonly _9000: DigimonType._9000;
    readonly AA_DEFENSE_AGENT: DigimonType.AA_DEFENSE_AGENT;
    readonly ABADIN_ELECTRONICS: DigimonType.ABADIN_ELECTRONICS;
    readonly ABILITY_SYNTHESIS_AGENT: DigimonType.ABILITY_SYNTHESIS_AGENT;
    readonly ABNORMAL: DigimonType.ABNORMAL;
    readonly ALIEN: DigimonType.ALIEN;
    readonly ALIEN_HUMANOID: DigimonType.ALIEN_HUMANOID;
    readonly AMPHIBIAN: DigimonType.AMPHIBIAN;
    readonly ANCIENT: DigimonType.ANCIENT;
    readonly ANCIENT_ANIMAL: DigimonType.ANCIENT_ANIMAL;
    readonly ANCIENT_AQUABEAST: DigimonType.ANCIENT_AQUABEAST;
    readonly ANCIENT_BIRD: DigimonType.ANCIENT_BIRD;
    readonly ANCIENT_BIRDKIN: DigimonType.ANCIENT_BIRDKIN;
    readonly ANCIENT_CRUSTACEAN: DigimonType.ANCIENT_CRUSTACEAN;
    readonly ANCIENT_DRAGON: DigimonType.ANCIENT_DRAGON;
    readonly ANCIENT_DRAGONKIN: DigimonType.ANCIENT_DRAGONKIN;
    readonly ANCIENT_FAIRY: DigimonType.ANCIENT_FAIRY;
    readonly ANCIENT_FISH: DigimonType.ANCIENT_FISH;
    readonly ANCIENT_HOLY_WARRIOR: DigimonType.ANCIENT_HOLY_WARRIOR;
    readonly ANCIENT_INSECTOID: DigimonType.ANCIENT_INSECTOID;
    readonly ANCIENT_MINERAL: DigimonType.ANCIENT_MINERAL;
    readonly ANCIENT_MUTANT: DigimonType.ANCIENT_MUTANT;
    readonly ANCIENT_MYTHICAL_BEAST: DigimonType.ANCIENT_MYTHICAL_BEAST;
    readonly ANCIENT_PLANT: DigimonType.ANCIENT_PLANT;
    readonly ANDROID: DigimonType.ANDROID;
    readonly ANGEL: DigimonType.ANGEL;
    readonly ANIMAL: DigimonType.ANIMAL;
    readonly ANKYLOSAUR: DigimonType.ANKYLOSAUR;
    readonly AQUABEAST: DigimonType.AQUABEAST;
    readonly AQUATIC: DigimonType.AQUATIC;
    readonly ARCHANGEL: DigimonType.ARCHANGEL;
    readonly ARMOR: DigimonType.ARMOR;
    readonly AUTHORITY: DigimonType.AUTHORITY;
    readonly AVATAR: DigimonType.AVATAR;
    readonly AVIAN: DigimonType.AVIAN;
    readonly BABY_DRAGON: DigimonType.BABY_DRAGON;
    readonly BASE_DEFENSE_AGENT: DigimonType.BASE_DEFENSE_AGENT;
    readonly BEAST: DigimonType.BEAST;
    readonly BEAST_DRAGON: DigimonType.BEAST_DRAGON;
    readonly BEAST_KNIGHT: DigimonType.BEAST_KNIGHT;
    readonly BEASTKIN: DigimonType.BEASTKIN;
    readonly BIRD: DigimonType.BIRD;
    readonly BIRD_DRAGON: DigimonType.BIRD_DRAGON;
    readonly BIRDKIN: DigimonType.BIRDKIN;
    readonly BLUE_FLARE: DigimonType.BLUE_FLARE;
    readonly BOSS: DigimonType.BOSS;
    readonly BULB: DigimonType.BULB;
    readonly CARNIVOROUS_PLANT: DigimonType.CARNIVOROUS_PLANT;
    readonly CERATOPSIAN: DigimonType.CERATOPSIAN;
    readonly CHERUB: DigimonType.CHERUB;
    readonly COMMANDER_AGENT: DigimonType.COMMANDER_AGENT;
    readonly COMPOSITE: DigimonType.COMPOSITE;
    readonly COMPOSITION: DigimonType.COMPOSITION;
    readonly CRT: DigimonType.CRT;
    readonly CRUSTACEAN: DigimonType.CRUSTACEAN;
    readonly CYBORG: DigimonType.CYBORG;
    readonly D_BRIGADE: DigimonType.D_BRIGADE;
    readonly DARK_ANIMAL: DigimonType.DARK_ANIMAL;
    readonly DARK_DRAGON: DigimonType.DARK_DRAGON;
    readonly DARK_KNIGHT: DigimonType.DARK_KNIGHT;
    readonly DEMON: DigimonType.DEMON;
    readonly DEMON_LORD: DigimonType.DEMON_LORD;
    readonly DEVA: DigimonType.DEVA;
    readonly DIGIPOLICE: DigimonType.DIGIPOLICE;
    readonly DINOSAUR: DigimonType.DINOSAUR;
    readonly DOMINION: DigimonType.DOMINION;
    readonly DRAGON: DigimonType.DRAGON;
    readonly DRAGON_WARRIOR: DigimonType.DRAGON_WARRIOR;
    readonly DRAGONKIN: DigimonType.DRAGONKIN;
    readonly EARTH_DRAGON: DigimonType.EARTH_DRAGON;
    readonly ENHANCEMENT: DigimonType.ENHANCEMENT;
    readonly ESPIONAGE_AGENT: DigimonType.ESPIONAGE_AGENT;
    readonly EVIL: DigimonType.EVIL;
    readonly EVIL_DRAGON: DigimonType.EVIL_DRAGON;
    readonly FAIRY: DigimonType.FAIRY;
    readonly FALLEN_ANGEL: DigimonType.FALLEN_ANGEL;
    readonly FIRE: DigimonType.FIRE;
    readonly FIRE_DRAGON: DigimonType.FIRE_DRAGON;
    readonly FLAME: DigimonType.FLAME;
    readonly FOOD: DigimonType.FOOD;
    readonly FOUR_GREAT_DRAGONS: DigimonType.FOUR_GREAT_DRAGONS;
    readonly FOUR_SOVEREIGNS: DigimonType.FOUR_SOVEREIGNS;
    readonly GALAXY: DigimonType.GALAXY;
    readonly GENERAL: DigimonType.GENERAL;
    readonly GHOST: DigimonType.GHOST;
    readonly GIANT_BIRD: DigimonType.GIANT_BIRD;
    readonly GOD_BEAST: DigimonType.GOD_BEAST;
    readonly GRAPPLING_AGENT: DigimonType.GRAPPLING_AGENT;
    readonly GROUND_COMBAT_AGENT: DigimonType.GROUND_COMBAT_AGENT;
    readonly HOLY_BEAST: DigimonType.HOLY_BEAST;
    readonly HOLY_BIRD: DigimonType.HOLY_BIRD;
    readonly HOLY_DRAGON: DigimonType.HOLY_DRAGON;
    readonly HOLY_SWORD: DigimonType.HOLY_SWORD;
    readonly HOLY_WARRIOR: DigimonType.HOLY_WARRIOR;
    readonly HUNTER: DigimonType.HUNTER;
    readonly ICE_SNOW: DigimonType.ICE_SNOW;
    readonly ICY: DigimonType.ICY;
    readonly INSECTOID: DigimonType.INSECTOID;
    readonly INTEL_ACQUISITION_AGENT: DigimonType.INTEL_ACQUISITION_AGENT;
    readonly INVADER: DigimonType.INVADER;
    readonly LARVA: DigimonType.LARVA;
    readonly LCD: DigimonType.LCD;
    readonly LEGEND_ARMS: DigimonType.LEGEND_ARMS;
    readonly LESSER: DigimonType.LESSER;
    readonly LIBERATOR: DigimonType.LIBERATOR;
    readonly LIGHT_DRAGON: DigimonType.LIGHT_DRAGON;
    readonly LIGHT_FANG: DigimonType.LIGHT_FANG;
    readonly MACHINE: DigimonType.MACHINE;
    readonly MACHINE_DRAGON: DigimonType.MACHINE_DRAGON;
    readonly MAGIC_KNIGHT: DigimonType.MAGIC_KNIGHT;
    readonly MAGIC_WARRIOR: DigimonType.MAGIC_WARRIOR;
    readonly MAJOR: DigimonType.MAJOR;
    readonly MAMMAL: DigimonType.MAMMAL;
    readonly MARINE_MAN: DigimonType.MARINE_MAN;
    readonly MINE: DigimonType.MINE;
    readonly MINERAL: DigimonType.MINERAL;
    readonly MINI_ANGEL: DigimonType.MINI_ANGEL;
    readonly MINI_BIRD: DigimonType.MINI_BIRD;
    readonly MINI_DRAGON: DigimonType.MINI_DRAGON;
    readonly MINOR: DigimonType.MINOR;
    readonly MOLLUSK: DigimonType.MOLLUSK;
    readonly MONK: DigimonType.MONK;
    readonly MOTHERSHIP_AGENT: DigimonType.MOTHERSHIP_AGENT;
    readonly MUSICAL_INSTRUMENT: DigimonType.MUSICAL_INSTRUMENT;
    readonly MUTANT: DigimonType.MUTANT;
    readonly MYSTERIOUS_BEAST: DigimonType.MYSTERIOUS_BEAST;
    readonly MYSTERIOUS_BIRD: DigimonType.MYSTERIOUS_BIRD;
    readonly MYTHICAL: DigimonType.MYTHICAL;
    readonly MYTHICAL_ANIMAL: DigimonType.MYTHICAL_ANIMAL;
    readonly MYTHICAL_BEAST: DigimonType.MYTHICAL_BEAST;
    readonly MYTHICAL_DRAGON: DigimonType.MYTHICAL_DRAGON;
    readonly NIGHT_CLAW: DigimonType.NIGHT_CLAW;
    readonly NO_DATA: DigimonType.NO_DATA;
    readonly PARASITE: DigimonType.PARASITE;
    readonly PERFECT: DigimonType.PERFECT;
    readonly PIXIE: DigimonType.PIXIE;
    readonly PLESIOSAUR: DigimonType.PLESIOSAUR;
    readonly PRINCIPALITY: DigimonType.PRINCIPALITY;
    readonly PUPPET: DigimonType.PUPPET;
    readonly RARE_ANIMAL: DigimonType.RARE_ANIMAL;
    readonly RECONNAISSANCE_AGENT: DigimonType.RECONNAISSANCE_AGENT;
    readonly REPTILE: DigimonType.REPTILE;
    readonly REPTILE_MAN: DigimonType.REPTILE_MAN;
    readonly ROCK: DigimonType.ROCK;
    readonly ROCK_DRAGON: DigimonType.ROCK_DRAGON;
    readonly ROYAL_KNIGHT: DigimonType.ROYAL_KNIGHT;
    readonly SEA_ANIMAL: DigimonType.SEA_ANIMAL;
    readonly SEA_BEAST: DigimonType.SEA_BEAST;
    readonly SERAPH: DigimonType.SERAPH;
    readonly SEVEN_GREAT_DEMON_LORDS: DigimonType.SEVEN_GREAT_DEMON_LORDS;
    readonly SHAMAN: DigimonType.SHAMAN;
    readonly SKELETON: DigimonType.SKELETON;
    readonly SKY_DRAGON: DigimonType.SKY_DRAGON;
    readonly S_O_C: DigimonType.S_O_C;
    readonly SUPER_MAJOR: DigimonType.SUPER_MAJOR;
    readonly TATHAGATA: DigimonType.TATHAGATA;
    readonly TEN_WARRIORS: DigimonType.TEN_WARRIORS;
    readonly THREE_GREAT_ANGELS: DigimonType.THREE_GREAT_ANGELS;
    readonly THRONE: DigimonType.THRONE;
    readonly TROPICAL_FISH: DigimonType.TROPICAL_FISH;
    readonly TWILIGHT: DigimonType.TWILIGHT;
    readonly UNANALYZABLE: DigimonType.UNANALYZABLE;
    readonly UNDEAD: DigimonType.UNDEAD;
    readonly UNIDENTIFIED: DigimonType.UNIDENTIFIED;
    readonly UNIQUE: DigimonType.UNIQUE;
    readonly UNKNOWN: DigimonType.UNKNOWN;
    readonly VEGETATION: DigimonType.VEGETATION;
    readonly VIRTUE: DigimonType.VIRTUE;
    readonly WARRIOR: DigimonType.WARRIOR;
    readonly WEAPON: DigimonType.WEAPON;
    readonly WIZARD: DigimonType.WIZARD;
    readonly X_ANTIBODY: DigimonType.X_ANTIBODY;
    readonly XROS_HEART: DigimonType.XROS_HEART;
}>;
export type CardTrait = ValuesOf<typeof CardTrait>;
