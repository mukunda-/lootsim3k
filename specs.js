
Specs = [
	
	{
		name : "2H Blood DK",
		armor: Armor.PLATE,
		weaps: [Slots.AXE_2H, Slots.SWORD_2H, Slots.MACE_2H, Slots.POLEARM],
		stats: Stats.STRENGTH|Stats.ARMOR,
		startweap: "Righteous Steel",
		role: Roles.TANK
	},
	
	{
		name : "2H Frost DK",
		armor: Armor.PLATE,
		weaps: [Slots.AXE_2H, Slots.SWORD_2H, Slots.MACE_2H, Slots.POLEARM],
		stats: Stats.STRENGTH,
		startweap: "Righteous Steel",
		role: Roles.DPS
	},
	
	{
		name:  "1H Unholy DK",
		armor: Armor.PLATE,
		weaps: [Slots.AXE_1H, Slots.MACE_1H, Slots.SWORD_1H],
		stats: Stats.STRENGTH,
		dw:    true,
		startweap: "Logsplitter",
		startoff:  "Logsplitter",
		role: Roles.DPS
	},
	
	{
		name:  "Boomkin",
		armor: Armor.LEATHER,
		weaps: [Slots.STAFF],
		stats: Stats.INTELLECT,
		startweap: "Spellrod",
		role: Roles.DPS
	},
	
	{
		name:  "Feral Druid",
		armor: Armor.LEATHER,
		weaps: [Slots.STAFF, Slots.MACE_2H],
		stats: Stats.AGILITY,
		startweap: "War Spear",
		role: Roles.DPS
	},
	
	{
		name:  "Bear",
		armor: Armor.LEATHER,
		weaps: [Slots.STAFF, Slots.MACE_2H],
		stats: Stats.ARMOR|Stats.AGILITY,
		startweap: "War Spear",
		role: Roles.TANK
	},
	
	{
		name:  "Resto Druid",
		armor: Armor.LEATHER,
		weaps: [Slots.STAFF, Slots.OFFHAND_SPELL, Slots.MACE_1H, Slots.DAGGER],
		stats: Stats.SPIRIT|Stats.INTELLECT,
		startweap: "Spellblade",
		startoff: "Spellbook",
		role: Roles.HEAL
	},
	
	{
		name:  "Hunter",
		armor: Armor.MAIL,
		weaps: [Slots.BOW],
		stats: Stats.AGILITY,
		startweap: "Poacher",
		role: Roles.DPS
	},
	
	{
		name:  "Mage",
		armor: Armor.CLOTH,
		weaps: [Slots.WAND, Slots.DAGGER, Slots.SWORD_1H, Slots.STAFF],
		stats: Stats.INTELLECT,
		startweap: "Spellrod",
		role: Roles.DPS
	},
	
	{
		name:  "2H BM Monk",
		armor: Armor.LEATHER,
		weaps: [Slots.STAFF],
		stats: Stats.ARMOR|Stats.AGILITY,
		startweap: "War Spear",
		role: Roles.TANK
	},
	
	{
		name:  "1H WW Monk",
		armor: Armor.LEATHER,
		weaps: [Slots.FIST, Slots.AXE_1H, Slots.MACE_1H, Slots.SWORD_1H],
		stats: Stats.AGILITY,
		dw:    true,
		startweap: "Tiger Claws",
		startoff:  "Tiger Claws",
		role: Roles.DPS
	},
	
	{
		name:  "MW Monk",
		armor: Armor.LEATHER,
		weaps: [Slots.STAFF, Slots.AXE_1H, Slots.MACE_1H, Slots.SWORD_1H, Slots.OFFHAND_SPELL],
		stats: Stats.SPIRIT|Stats.INTELLECT,
		startweap: "Spellrod",
		role: Roles.HEAL
	},
	
	{
		name:  "Holy Paladin",
		armor: Armor.PLATE,
		weaps: [Slots.MACE_1H, Slots.SWORD_1H, Slots.SHIELD],
		stats: Stats.SPIRIT|Stats.INTELLECT,
		startweap: "Justice",
		startoff:  "Holy Shield",
		role: Roles.HEAL
	},
	
	{
		name:  "Ret Paladin",
		armor: Armor.PLATE,
		weaps: [Slots.SWORD_2H, Slots.MACE_2H, Slots.AXE_2H, Slots.POLEARM],
		stats: Stats.STRENGTH,
		startweap: "Righteous Steel",
		role: Roles.DPS
	},
	
	{
		name:  "Prot Paladin",
		armor: Armor.PLATE,
		weaps: [Slots.SWORD_1H, Slots.MACE_1H, Slots.AXE_1H, Slots.SHIELD],
		stats: Stats.ARMOR|Stats.STRENGTH,
		startweap: "Nerfbat",
		startoff:  "Strongwall",
		role: Roles.TANK
	},
	
	{
		name:  "Healing Priest",
		armor: Armor.CLOTH,
		weaps: [Slots.DAGGER, Slots.MACE_1H, Slots.STAFF, Slots.WAND, Slots.OFFHAND_SPELL],
		stats: Stats.SPIRIT|Stats.INTELLECT,
		startweap: "Justice",
		startoff:  "Spellbook",
		role: Roles.HEAL
	},
	
	{
		name:  "Shadow Priest",
		armor: Armor.CLOTH,
		weaps: [Slots.DAGGER, Slots.MACE_1H, Slots.STAFF, Slots.WAND, Slots.OFFHAND_SPELL],
		stats: Stats.INTELLECT,
		startweap: "Justice",
		startoff:  "Spellbook",
		role: Roles.DPS
	},
	
	{
		name:  "Rogue",
		armor: Armor.LEATHER,
		weaps: [Slots.FIST, Slots.DAGGER, Slots.SWORD_1H],
		stats: Stats.AGILITY,
		dw:    true,
		startweap: "Backstabber",
		startoff:  "Backstabber",
		role: Roles.DPS
	},
	
	{
		name: "Ele Shaman",
		armor: Armor.MAIL,
		weaps: [Slots.DAGGER, Slots.AXE_1H, Slots.MACE_1H, Slots.OFFHAND_SPELL],
		stats: Stats.INTELLECT,
		startweap: "Justice",
		startoff: "Spellbook",
		role: Roles.DPS
	},
	
	{
		name: "Enh Shaman",
		armor: Armor.MAIL,
		weaps: [Slots.AXE_1H, Slots.MACE_1H],
		stats: Stats.AGILITY,
		dw:    true,
		startweap: "Tiger Claws",
		startoff: "Tiger Claws",
		role: Roles.DPS
	},
	
	{
		name: "Resto Shaman",
		armor: Armor.MAIL,
		weaps: [Slots.AXE_1H, Slots.MACE_1H, Slots.STAFF, Slots.OFFHAND_SPELL],
		stats: Stats.SPIRIT|Stats.INTELLECT,
		startweap: "Justice",
		startoff: "Spellbook",
		role: Roles.HEAL
	},
	
	{
		name: "Warlock",
		armor: Armor.CLOTH,
		weaps: [Slots.STAFF],
		stats: Stats.INTELLECT,
		startweap: "Spellrod",
		role: Roles.DPS
	},
	
	{
		name: "Arms Warrior",
		armor: Armor.PLATE,
		weaps: [Slots.AXE_2H, Slots.MACE_2H, Slots.SWORD_2H, Slots.POLEARM],
		stats: Stats.STRENGTH,
		startweap: "Righteous Steel",
		role: Roles.DPS
	},
	
	{
		name: "SMF Warrior",
		armor: Armor.PLATE,
		weaps: [Slots.AXE_1H, Slots.MACE_1H, Slots.SWORD_1H],
		stats: Stats.STRENGTH,
		dw:    true,
		startweap: "Nerfbat",
		startoff:  "Nerfbat",
		role: Roles.DPS
	},
	
	{
		name: "TG Warrior",
		armor: Armor.PLATE,
		weaps: [Slots.AXE_2H, Slots.MACE_2H, Slots.SWORD_2H],
		stats: Stats.STRENGTH,
		dw:    true,
		startweap: "Ruckus",
		startoff:  "Ruckus",
		role: Roles.DPS
	},
	
	{
		name: "Prot Warrior",
		armor: Armor.PLATE,
		weaps: [Slots.AXE_1H, Slots.MACE_1H, Slots.SWORD_1H, Slots.SHIELD],
		stats: Stats.ARMOR|Stats.STRENGTH,
		dw:    true,
		startweap: "Logsplitter",
		startoff: "Strongwall",
		role: Roles.TANK
	}
	
];
