Stats = {
	INTELLECT : 1, // for casters
	AGILITY   : 2, // for kitties
	STRENGTH  : 4, // for men 
	ARMOR     : 8, // for tanks
	SPIRIT    : 16, // for healers, this also matches INTELLECT for weapons.
	MIXED     : 1|2|4  // good for any that can wear the item 
	                //(always used for normal armor slots) 
	
};

Armor = { 
	CLOTH   : 0,
	LEATHER : 1,
	MAIL    : 2,
	PLATE   : 3,
	OTHER   : 4
};

Slots = {
	HEAD  : 0, NECK  : 1, SHOULDERS : 2, BACK  : 3,
	CHEST : 4, WRIST : 5, HANDS     : 6, WAIST : 7,
	LEGS  : 8, FEET  : 9, 
	RING  : 10,RING2 : 11,            // ring2 is always filled by your legendary quest ring
	
	TRINKET : 12, TRINKET2 : 13,
	WEAPON  : 14, OFFHAND  : 15,
	
	AXE_1H   : 101, AXE_2H   : 102,
	SWORD_1H : 103, SWORD_2H : 104,
	MACE_1H  : 105, MACE_2H  : 106,
	FIST     : 107, DAGGER   : 108,
	STAFF    : 109, POLEARM  : 110,
	WAND     : 111,
	BOW      : 112,
	SHIELD   : 113,
	OFFHAND_SPELL : 114
}; 

Roles = {
	TANK : 1,
	HEAL : 2,
	DPS  : 4,
	TDPS : 1|4,
	HDPS : 2|4,
	ALL  : 1|2|4
};

function IsWeaponSlot( slot ) {
	return slot == Slots.WEAPON 
	       || (slot >= Slots.AXE_1H && slot <= Slots.BOW);
}

function IsOffhandSlot( slot ) {
	return slot == Slots.OFFHAND 
	       || slot == Slots.SHIELD  
		   || slot == Slots.OFFHAND_SPELL;
}
