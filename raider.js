
g_raiders = [];

//-----------------------------------------------------------------------------
function CreateRaider( name, spec ) {

	for( var i = 0; i < Specs.length; i++ ) {
	 
		// search for desired spec.
		if( spec == Specs[i].name ) {
			
			var new_raider = 
				{
					"name": name,
					"spec": spec,
					"armor": Specs[i].armor,
					"weaps": Specs[i].weaps,
					"stats": Specs[i].stats,
					"dw": Specs[i].hasOwnProperty( "dw" ) && Specs[i]['dw'],
					"raiding": true,
					"slots": SetupSlots( Specs[i] )
				};
		
			g_raiders.push( new_raider );
			
			return g_raiders.length-1;
			
		}
	}
	
	throw "Unknown spec.";
}

//-----------------------------------------------------------------------------
function SetupSlots( spec ) {
	// a fresh 630 raider...
	
	var slots = {};
	
	slots[Slots.NECK]     = FindItem( "Sturdy Heirloom" );
	slots[Slots.BACK]     = FindItem( "Replacable Cloak" );
	slots[Slots.RING]     = FindItem( "Khadgar as a Ring, Ringar" );
	slots[Slots.RING2]    = FindItem( "Bad Ring" );
	slots[Slots.TRINKET ] = FindItem( "Bad Trinket" );
	slots[Slots.TRINKET2] = FindItem( "Bad Trinket" );
	
	slots[Slots.WEAPON]   = FindItem( spec.startweap );
	slots[Slots.OFFHAND]  = spec.hasOwnProperty( "startoff" ) ? 
						     FindItem( spec.startoff ) : 0;
	
	switch( spec.armor ) {
	case Armor.CLOTH:
		slots[Slots.HEAD]      = FindItem( "Wizard's Hat" );
		slots[Slots.SHOULDERS] = FindItem( "Soft Padding"  );
		slots[Slots.CHEST]     = FindItem( "Imbued Robes"  );
		slots[Slots.WRIST]     = FindItem( "Spell Bonds"   );
		slots[Slots.HANDS]     = FindItem( "Spell Casters" );
		slots[Slots.WAIST]     = FindItem( "Waistband"     );
		slots[Slots.LEGS]      = FindItem( "Underwear"   );
		slots[Slots.FEET]      = FindItem( "Sandals"   );
		break;
		
	case Armor.LEATHER:
		slots[Slots.HEAD]      = FindItem( "Bear Skull"       );
		slots[Slots.SHOULDERS] = FindItem( "Bone Mantle"         );
		slots[Slots.CHEST]     = FindItem( "Bear Hide"             );
		slots[Slots.WRIST]     = FindItem( "Goku's Weighted Bands" );
		slots[Slots.HANDS]     = FindItem( "Cat Mits"              );
		slots[Slots.WAIST]     = FindItem( "Rope"                );
		slots[Slots.LEGS]      = FindItem( "Cowskins"         );
		slots[Slots.FEET]      = FindItem( "Face Kickers" );
		break;
		
	case Armor.MAIL:
		slots[Slots.HEAD]      = FindItem( "Hunter's Cap"       );
		slots[Slots.SHOULDERS] = FindItem( "Hunter's Spaulders" );
		slots[Slots.CHEST]     = FindItem( "Hunter's Gear"      );
		slots[Slots.WRIST]     = FindItem( "More Hunter Gear"   );
		slots[Slots.HANDS]     = FindItem( "Wrangling Gloves"   );
		slots[Slots.WAIST]     = FindItem( "Swiss Army Belt"    );
		slots[Slots.LEGS]      = FindItem( "Camomail"           );
		slots[Slots.FEET]      = FindItem( "Disengaging Boots"  );
		break;
		
	case Armor.PLATE:
		slots[Slots.HEAD]      = FindItem( "Hard Hat"    );
		slots[Slots.SHOULDERS] = FindItem( "Justice Gear" );
		slots[Slots.CHEST]     = FindItem( "Heavy Armor"   );
		slots[Slots.WRIST]     = FindItem( "Handcuffs"      );
		slots[Slots.HANDS]     = FindItem( "Glory Bringers" );
		slots[Slots.WAIST]     = FindItem( "Plate Wrap"     );
		slots[Slots.LEGS]      = FindItem( "Leg Guards"     );
		slots[Slots.FEET]      = FindItem( "Bone Crushers" );
		break;
	};
	 
	return slots;
}

//-----------------------------------------------------------------------------
function EnterRaid( name ) {

	// this raider is attending the next raid.
	
	for( var i = 0; i < g_raiders.length; i++ ) {
		if( g_raiders[i].name == name ) {
			g_raiders[i].raiding = true;
		}
	}
}

//-----------------------------------------------------------------------------
function LeaveRaid( name ) {
	// this raider is skipping the next raid.
	
	for( var i = 0; i < g_raiders.length; i++ ) {
		if( g_raiders[i].name == name ) {
			g_raiders[i].raiding = false;
		}
	}
}

/******************************************************************************
 * @returns the number of active raiders.
 */
function GetRaidCount() {
	var count = 0;
	for( var i = 0; i < g_raiders.length; i++ ) {
		if( g_raiders[i].raiding ) {
			count++;
		}
	}
	return count;
}

function GetRaidItemLevel() {
	var total = 0;
	var count = 0;
	
	for( var i = 0; i < g_raiders.length; i++ ) {
		if( !g_raiders[i].raiding ) continue;
		total += GetRaiderItemLevel( i );
		count++;
	}
	return total/count;
}

function GetRaiderItemLevel( raider_id ) {
	var raider = g_raiders[raider_id];
	
	var total = 0;
	for( var slot = 0; slot < 16; slot++ ) {
		var item = raider.slots[slot];
		
		if( item == 0 ) {
			if( slot == Slots.OFFHAND ) {
				item = raider.slots[Slots.WEAPON];
			}
			if( item == 0 ) continue;
		}
		
		total += Loot[item].ilvl;
	}
	total /= 16;
	return total;
}

var g_saved_raid = [];

function PushRaid() {
	g_saved_raid.push( JSON.stringify( g_raiders ) );
}

function PopRaid() {
	g_raiders = JSON.parse( g_saved_raid.pop() );
}