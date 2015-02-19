
var g_log = "";

// chance of personal loot dropping for someone
var PERSONAL_LOOT_CHANCE = 0.2;

// this is assumed to be 20% by many people, this assumption is
// backed up by the fact of master looter being 20% per person

CreateRaider( "Deeter",      "Prot Warrior"   );
CreateRaider( "Stupes",      "SMF Warrior"    );
CreateRaider( "Llanna",      "2H BM Monk"     );
CreateRaider( "Myagi",       "1H WW Monk"     );
CreateRaider( "Jim",         "Warlock"        );
CreateRaider( "Skwumpy",     "Mage"           );
CreateRaider( "Penguirrel",  "Mage"           );
CreateRaider( "Kaiser",      "Ret Paladin"    );
CreateRaider( "Cyriana",     "Ele Shaman"     );
CreateRaider( "Demile",      "1H Unholy DK"   );
CreateRaider( "Kaetan",      "Ret Paladin"    );
CreateRaider( "Detta",       "Rogue"          );
CreateRaider( "Wintegra",    "Hunter"         );
CreateRaider( "Joefalcon",   "Hunter"         );
CreateRaider( "Realbeastly", "Shadow Priest"  );
CreateRaider( "Gimory",      "Holy Paladin"   );
CreateRaider( "Atoneme",     "Healing Priest" );
CreateRaider( "Tyler",       "Resto Shaman"   );
CreateRaider( "Maxxie",      "Resto Druid"    );
CreateRaider( "Ginger",      "Resto Druid"    );

var g_total_drops;
var g_total_used;
var g_total_wasted;

var g_sim_data = [];

var g_debug;


function PlotResult( label, target, cats, used0, used1 ) {
	$(target).highcharts({
		chart: {
			type: "column"
		},
		title: {
			text: label
		},
		xAxis: {
			categories: cats,
			title: {
				text: 'Average ilvl of raid'
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Percent'
			}
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0
			}
		},
		series: [{
			name: "Personal Loot",
			data: used0
		},{
			name: "Master Loot",
			data: used1
		}]
	});
}
 
$(function () {
	for( var i = 0; i < 30; i++ ) {
	//	ClearHighmaul( "master" );
	}
 
	var a = GetRaidItemLevel();

	
	RunSim();
	
	var categories = [];
	var used0 = [];
	var used1 = [];
	for( var i = 0; i < g_sim_data.length; i++ ) {
		categories.push( g_sim_data[i].ilvl );
	}
	
	for( var i = 0; i < g_sim_data.length; i++ ) {
		used0.push( Math.round(g_sim_data[i].used[0] / 7 / GetRaidCount() * 100*10)/10 );
		used1.push( Math.round(g_sim_data[i].used[1] / 7 / GetRaidCount() * 100*10)/10 );
	}
	
	PlotResult( "Upgrade Chance Per Player", "#result-pl", categories, used0, used1 );
	
	RunSim2();
	/*
	PopRaid();
	PushRaid();
	RunSim( "master" );
	
	var categories = [];
	var used = [];
	for( var i = 0; i < g_sim_data.length; i++ ) {
		categories.push( g_sim_data[i].ilvl );
	}
	
	for( var i = 0; i < g_sim_data.length; i++ ) {
		used.push( Math.round(g_sim_data[i].used / 7 / GetRaidCount() * 100*10)/10 );
	}
	
	PlotResult( "Master Looter", "#result-ml", categories, used );
	
	for( var i = 0; i < g_raiders.length; i++ ) {
		var raider = g_raiders[i];
		
		Log2( "--- Gear for " + raider.name + " ---" );
		for( var slot = 0; slot < 16; slot++ ) {
			if( raider.slots[slot] == 0 ) continue;
			var loot = Loot[raider.slots[slot]];
			Log2( loot.ilvl + " - " + loot.name );
		}
	}
	*/
	
	$("#logoutput").val( g_log );
	
});

//-----------------------------------------------------------------------------
function Log( text ) {
	//g_log += text + "\n"; 
}

//-----------------------------------------------------------------------------
function Log2( text ) {
	g_log += text + "\n"; 
}

//-----------------------------------------------------------------------------
function RunSim() {
	PushRaid();
	
	var t_drops = [0,0], t_used = [0,0], t_wasted = [0,0];
	g_sim_data = [];
	 
	var iterations = 100;
	
	// 3 months of raiding.
	for( var runs = 0; runs < 20; runs++ ) {
		
		for( var i = 0; i < iterations; i++ ) {
			PushRaid(); 
			ClearHighmaul( "personal" ); 
			PopRaid();
			
			t_drops[0] += g_total_drops;
			t_used[0] += g_total_used;
			t_wasted[0] += g_total_wasted;
		}
		
		for( var i = 0; i < iterations; i++ ) {
			PushRaid(); 
			ClearHighmaul( "master" ); 
			PopRaid();
			
			t_drops[1] += g_total_drops;
			t_used[1] += g_total_used;
			t_wasted[1] += g_total_wasted;
		}
		
		g_sim_data.push( { 
			ilvl: Math.round(GetRaidItemLevel()), 
			drops: [t_drops[0]/iterations, t_drops[1]/iterations], 
			used: [t_used[0]/iterations, t_used[1]/iterations], 
			wasted: [t_wasted[0]/iterations, t_wasted[1]/iterations]
		});
		t_drops  = [0,0];
		t_used   = [0,0];
		t_wasted = [0,0];
		
		ClearHighmaul( "master" );
	}
	
	PopRaid();
}

function RunSim2() {
	
	var result_pl=0, result_ml=0;
	
	var iterations = 300;
	PushRaid();
	for( var iter = 0; iter < iterations; iter++ ) {
		PushRaid();
		while( GetRaidItemLevel() < 650 ) {
			ClearHighmaul( "personal" );
			result_pl++;
		}
		PopRaid();
	}
	result_pl /= iterations;
	
	for( var iter = 0; iter < iterations; iter++ ) {
		PushRaid();
		while( GetRaidItemLevel() < 650 ) {
			ClearHighmaul( "master" );
			result_ml++;
		}
		PopRaid();
	}
	
	result_ml /= iterations;
	
	Log2( "Weeks needed to get 650 gear using Personal Loot: " + result_pl );
	Log2( "Weeks needed to get 650 gear using Master Looter: " + result_ml );
}

//-----------------------------------------------------------------------------
function ClearHighmaul( loot_mode ) {
	g_total_drops = 0;
	g_total_used = 0;
	g_total_wasted = 0;
	
	for( var i = 0; i < g_raiders.length; i++ ) {
		g_raiders[i].total_drops = 0;
		g_raiders[i].total_used = 0;
		g_raiders[i].total_wasted = 0;
	}
	
	Log( "Average item level of raid is " + GetRaidItemLevel() );
	Log( "Raid has begun clearing highmaul on \"" + loot_mode + "\" looting mode." );
	Log( "---" );
	
	for( var i = 1; i <= 7; i++ ) {
		Log( GetHighmaulBossName(i) + " was killed." );
		
		// boss was downed, distribute loot
		GiveLoot( GetHighmaulLootTable(i), loot_mode );
		Log( "---" );
		
	} 
	Log( "Highmaul clear! Good run gents." );
	Log( g_total_drops + " items dropped." );
	Log( g_total_used + " upgrades found." );
	Log( g_total_wasted + " items not used." );
	Log( "============================================" );
}

//-----------------------------------------------------------------------------
function GiveLoot( loot_table, loot_mode ) {
	if( loot_mode == "master" ) {
		GiveMasterLoot( loot_table );
	} else {
		GivePersonalLoot( loot_table );
	}
}

//-----------------------------------------------------------------------------
function GiveMasterLoot( loot_table ) {
	
	// generate loot table 
	
	var drops = Math.floor(GetRaidCount() * 0.2);
	var bonusdrop = GetRaidCount() % 5;
	
	// do we get a bonus drop??
	if( Math.random() * 5 < bonusdrop ) {
		drops++;
	}
	
	var loots = [];
	 
	for( var i = 0; i < drops; i++ ) {
		var loot = GenerateLoot( loot_table );
		loots.push( loot ); 
		Log( Loot[loot].name + " dropped." );
		
	}
	
	// distribute loot
	for( var i = 0; i < loots.length; i++ ) {
		var loot = loots[i];
		
		var assigned = AssignRaidLoot( loot );
		if( assigned === null ) {
			// loot wasted!
			Log( "Nobody needed " + Loot[loot].name + "!" );
		} else {
			Log( g_raiders[assigned].name + " looted " + Loot[loot].name );
		}
	}
}

/** ---------------------------------------------------------------------------
 * Assigns a piece of loot to the raid, and returns the raider index that
 * equipped it. Returns null if nobody needed the loot.
 */
function AssignRaidLoot( itemid ) {
	
	var eligible_raiders = [];
	g_total_drops++;
	
	// get eligible list to give to randomly.
	for( var i = 0; i < g_raiders.length; i++ ) {
		if( !g_raiders[i].raiding ) continue;
		
		var needs = RaiderNeedsLoot( g_raiders[i], Loot[itemid] );
		if( needs === null ) continue;
		
		eligible_raiders.push( {raider:i, slot:needs} );
	}
	
	if( eligible_raiders.length == 0 ) {
		g_total_wasted++;
		return null;
	}
	
	var roll = Math.floor( Math.random() * eligible_raiders.length );
	var selected = eligible_raiders[roll];
	 
	
	// assign loot.
	g_raiders[ selected.raider ].slots[ selected.slot ] = itemid;
	
	g_total_used++;
	g_raiders[ selected.raider ].total_drops++;
	g_raiders[ selected.raider ].total_used++;
	
	return selected.raider;
}

/** ---------------------------------------------------------------------------
 * Returns true if a loot item is on this raider's personal loot table.
 */
function OnRaidersLootTable( raider, loot ) {
	if( loot.armor != Armor.OTHER ) {
		if( loot.armor != raider.armor ) {
			return false;
		}
	}
	
	if( (raider.stats & loot.stats) == 0 ) {
		return false;
	}
	
	if( raider.role != Roles.HEAL && loot.stats & Stats.SPIRIT ) {
		return false;
	}
	
	if( raider.role != Roles.TANK && loot.stats & Stats.ARMOR ) {
		return false;
	}
	
	// todo: add undesirable weapons
	if( IsWeaponSlot( loot.slot ) && raider.weaps.indexOf( loot.slot ) == -1 ) {
		return false;
	}
	
	if( IsOffhandSlot( loot.slot )) {
		if( raider.weaps.indexOf( loot.slot ) == -1 ) {
			return false
		}
	}
	
	return true;
}
 
/** ---------------------------------------------------------------------------
 * Checks if a raider needs an item and returns the slot that they will
 * put it in or null if they don't need it or can't use it.
 */
function RaiderNeedsLoot( raider, loot ) {
	var slot = loot.slot;
	
	if( loot.armor != Armor.OTHER ) {
		if( loot.armor != raider.armor ) {
			// raider doesn't wear that armor.
			return null;
		}
	}
	
	if( (raider.stats & loot.stats) == 0 ) {
		// raider doesn't use those stats
		return null;
	}
	
	if( raider.role != Roles.HEAL && loot.stats & Stats.SPIRIT ) {
		return null;
	}
	
	if( raider.role != Roles.TANK && loot.stats & Stats.ARMOR ) {
		return null;
	}
	
	if( raider.role == Roles.TANK 
		&& (loot.slot == Slots.RING 
		    || loot.slot == Slots.BACK 
		    || loot.slot == Slots.NECK)
		&& ((loot.stats & Stats.ARMOR)==0) ) {
		
		// tanks want bonus armor in their accessories
		return null;
	}
	
	// 2 slots for trinkets.
	if( slot == Slots.TRINKET ) {
		if( Loot[raider.slots[Slots.TRINKET]].ilvl >= loot.ilvl ) {
		
			if( Loot[raider.slots[Slots.TRINKET2]].ilvl >= loot.ilvl ) {
				// raider already has 2 655+ trinkets
				return null;
			} else {
				return Slots.TRINKET2;
			}
		} else {
			return Slots.TRINKET;
		}
		
	} else if( IsWeaponSlot( slot )) {
		if( raider.weaps.indexOf( slot ) != -1 ) {
			// they can equip this item
			if( Loot[raider.slots[Slots.WEAPON]].ilvl >= loot.ilvl ) {
				// they already have a good weapon in their main slot
				
				// are they dual wield?
				if( raider.dw ) {
					if( Loot[raider.slots[Slots.OFFHAND]].ilvl >= loot.ilvl ) {
						// they don't need it
						return null;
					}
					
					// they need it for their offhand
					return Slots.OFFHAND;
				} else {
					// they don't need it
					return null;
				}
			}
			// they need it for their main weapon
			return Slots.WEAPON;
		}
		
		return null; // can't use that weapon.
		
	} else if( IsOffhandSlot( slot )) {
		if( raider.weaps.indexOf( slot ) != -1 ) {
			
			// this raider doesn't like offhands.
			if( raider.slots[Slots.OFFHAND] == 0 ) return null;
			
			if( Loot[raider.slots[Slots.OFFHAND]].ilvl >= loot.ilvl ) {
				return null; // they don't need it
			}
			// they need this offhand item.
			return Slots.OFFHAND;
		}
		
		return null; // can't use that weapon.
	} else if( slot == Slots.RING ) {
		if( Loot[raider.slots[Slots.RING]].ilvl >= loot.ilvl ) {
			if( Loot[raider.slots[Slots.RING2]].ilvl >= loot.ilvl ) {
				return null;
			} else {
				return Slots.RING2;
			}
		} else {
			return Slots.RING;
		}
	}
	
	// generic armor, just check ilvl
	if( Loot[raider.slots[loot.slot]].ilvl >= loot.ilvl ) {
		return null;
	}
	
	return slot;
}

/** ---------------------------------------------------------------------------
 * @returns a weighted random item ID from the loot table.
 */
function GenerateLoot( loot_table ) {
	var total_weight = 0;
	for( var i = 0; i < loot_table.length; i++ ) {
		total_weight += loot_table[i].weight;
	}
	
	var loot = Math.random() * total_weight;
	
	var running_total = 0;
	for( var i = 0; i < loot_table.length; i++ ) {
		if( loot < running_total + loot_table[i].weight ) {
			return FindItem( loot_table[i].item );
		}
		running_total += loot_table[i].weight;
	}
	
	throw "Logic error.";
}

//-----------------------------------------------------------------------------
function GivePersonalLoot( loot_table ) {

	for( var i = 0; i < g_raiders.length; i++ ) {
		if( !g_raiders[i].raiding ) continue;
		
		GiveRaiderPersonalLoot( g_raiders[i], loot_table );
	} 
}

//-----------------------------------------------------------------------------
function GiveRaiderPersonalLoot( raider, loot_table ) {
	
	if( Math.random() >= PERSONAL_LOOT_CHANCE ) {
		return;
	}
	
	g_total_drops++;
	raider.total_drops++;
	
	var personal_loot_table = [];
	
	// filter the loot table for this person
	for( var i = 0; i < loot_table.length; i++ ) {
		var loot = loot_table[i];
		if( OnRaidersLootTable( raider, Loot[FindItem(loot.item)] )) {
			personal_loot_table.push( loot );
		}
	}
	
	if( personal_loot_table.length == 0 ) {
		throw "Personal loot table empty!";
	}
	
	var total_weight = 0;
	for( var i = 0; i < personal_loot_table.length; i++ ) {
		total_weight += personal_loot_table[i].weight;
	}
	
	var loot_index = Math.random() * total_weight;
	var itemid = null;
	
	var running_total = 0;
	for( var i = 0; i < personal_loot_table.length; i++ ) {
		if( loot_index < running_total + personal_loot_table[i].weight ) {
			itemid = FindItem( personal_loot_table[i].item );
			break;
		}
		running_total += personal_loot_table[i].weight;
	}
	
	if( itemid === null ) throw "Logic error.";
	
	var needs = RaiderNeedsLoot( raider, Loot[itemid] );
	if( needs === null ) {
		Log( raider.name + " looted " + Loot[itemid].name + " but didn't need it." );
		g_total_wasted++;
		raider.total_wasted++;
		return;
	} else {
		
		Log( raider.name + " looted " + Loot[itemid].name );
		raider.slots[ needs ] = itemid;
		raider.total_used++;
		g_total_used++;
		return;
	}
}
