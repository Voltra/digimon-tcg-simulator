import { z } from "zod";
import { asSequence } from "sequency";

const hasDuplicatesBy = <T, R>(arr: T[], selector: (item: T) => R) => {
	return asSequence(arr)
		.distinctBy(selector)
		.count() !== arr.length;
};

const hasDuplicateItems = <T>(arr: T[]) => hasDuplicatesBy(arr, x => x);

export enum CardColor {
	BLACK = "Black",
	GREEN = "Green",
	PURPLE = "Purple",
	RED = "Red",
	WHITE = "White",
	YELLOW = "Yellow",
}

export const cardColorSchema = () => z.nativeEnum(CardColor);

export enum CardType {
	DIGIMON = "Digimon",
	DIGI_EGG = "Digi-Egg",
	OPTION = "Option",
	TAMER = "Tamer",
}

export const cardTypeSchema = () => z.nativeEnum(CardType);

export const newCardMetaSchema = () => z.object({
	id: z.string().regex(/^(P|BT\d{1,3}|EX\d{1,3})-\d{3}$/),
	type: cardTypeSchema(),
	name: z.string().max(255),
	colors: z.array(cardColorSchema()).nonempty()
		.refine(arr => !hasDuplicatesBy(arr, x => x), {
			message: "The colors array must not contain duplicates",
		}),
});

export type NewCardMeta = z.infer<ReturnType<typeof newCardMetaSchema>>;

export type CardScript = (context: any, meta: NewCardMeta) => void;

export enum DigimonLevel {
	ROOKIE = 3,
	CHAMPION = 4,
	ULTIMATE = 5,
	MEGA = 6,
	OVER_MEGA = 7,
}

export const digimonLevelSchema = () => z.nativeEnum(DigimonLevel);

export enum DigimonStage {
	ARMOR_FORM = "Armor Form",
	// BABY = "Baby",
	CHAMPION = "Champion",
	D_REAPER = "D-Reaper",
	HYBRID = "Hybrid",
	IN_TRAINING = "In-Training",
	MEGA = "Mega",
	ROOKIE = "Rookie",
	ULTIMATE = "Ultimate",
}

export const digimonStageSchema = () => z.nativeEnum(DigimonStage);

export enum DigimonType {
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
	TATHAGATA = "Tathāgata",
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
	XROS_HEART = "Xros Heart",
}

export const digimonTypeSchema = () => z.nativeEnum(DigimonType);

export enum DigimonAttribute {
	VACCINE = "Vaccine",
	DATA = "Data",
	VIRUS = "Virus",
	UNKNOWN = "Unknown",
	FREE = "Free",
}

export const digimonAttributeSchema = () => z.nativeEnum(DigimonAttribute);

export const newDigimonMetaSchema = () => newCardMetaSchema().merge(
	z.object({
		level: digimonLevelSchema(),
		playCost: z.number().int().min(1).max(20),
		digivolveCosts: z.array(z.object({
			color: cardColorSchema(),
			level: digimonLevelSchema(),
			cost: z.number().int().min(0).max(20),
		})).refine(arr => !hasDuplicatesBy(arr, item => `${item.color}--${item.level}`), {
			message: "The digivolveCosts array must not contain duplicates of (color, level) pairs",
		}),
		dp: z.number().int().min(1000).multipleOf(1000),
		digimonStage: digimonStageSchema(),
		digimonTypes: z.array(digimonTypeSchema())
			.nonempty()
			.refine(arr => !hasDuplicateItems(arr), {
				message: "The digimonTypes array must not contain duplicates",
			}),
		digimonAttributes: z.array(digimonAttributeSchema())
			.nonempty()
			.refine(arr => !hasDuplicateItems(arr), {
				message: "The attributes array must not contain duplicates",
			}),
	}),
);

export type NewDigimonMeta = z.infer<ReturnType<typeof newDigimonMetaSchema>>;
