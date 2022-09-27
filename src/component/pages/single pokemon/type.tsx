export interface Pokemon{
    id:number;
    name:string;
    height:number;
    weight:number;
    types:types
    moves:moves
    stats:stats
    species:species

}
 interface species{
    name:string;
    url:string;

}
interface types{
    map(arg0: (type: any) => JSX.Element): import("react").ReactNode;
    slot:number;
    type:{
        name:string;
        url:string;
    }
}
interface moves{
    map(arg0: (move: Move, i: number) => JSX.Element): import("react").ReactNode;
    move:{
        name:string;
        url:string;
    }
}
interface stats{
    map(arg0: (stat: any) => JSX.Element): import("react").ReactNode;
    base_stat:number;
    effort:number;
    stat:{
        name:string;
        url:string;
    }
}


export interface evolution{
    id:number;
    name:string;
    evolves_details:evolves_details   
}
interface evolves_details{
    min_level:number|null;
    trigger:{
        name:string;
        url:string;
    };
    min_happiness:number|null;
    min_beauty:number|null;
    min_affection:number|null;
    needs_overworld_rain:boolean;
}

export interface Move{
        move: any;
        id: number;
        type:{
            name:string;
            url:string;
        };
        name:string;
        accuracy:number;
        power:number;
        pp:number;
        damage_class:{
            name:string;
            url:string;
        };
        effect_entries:{
            effect:string;
        }[]
    
}
export interface PokemonSpecies{
    egg_groups:egg_groups[]
    flavor_text_entries:flavor_text_entries[]
    gender_rate:number;
    capture_rate:number;
    evolution_chain:{
        url:string;
}
}
interface egg_groups{
    name:string;
    url:string;
}
interface flavor_text_entries{
    flavor_text:string;
    language:{
        name:string;
        url:string;
    }
}

export interface PokemonEvolutionChain{
    moves:moves
    stats:stats
    name: string;
    types: types;
    evolves_to: any;
    chain:chain
    baby_trigger_item:{
        name:string;
        url:string;
    }
}
export interface chain{
    evolves_to:evolves_to[]
    is_baby:boolean;
    species:{
        name:string;
        url:string;
    }
    name:string;
    evolution_details:evolution_details[]|null
}
    interface evolution_details{
        min_level:number|null;
        trigger:{
            name:string;
            url:string;
        };
        min_happiness:number|null;
        min_beauty:number|null;
        min_affection:number|null;
        needs_overworld_rain:boolean;
        
    }
interface evolves_to{
    name:string;
    evolves_to:evolves_to[]
    evolution_details:evolution_details[]|null
    is_baby:boolean;
    species:{
        name:string;
        url:string;
    }
}

export interface PokemonData extends Pokemon,PokemonSpecies,PokemonEvolutionChain{}

export interface Evolution {

}