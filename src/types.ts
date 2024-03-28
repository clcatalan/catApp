export interface Photo {
    url: string,
    id: string,
}

export interface CardType {
    imgUrl: string,
    id: string,
    selectedBreed: string,
    
}

export interface Breed {
    adaptability: number,
    affection_level: number,
    alt_names: string,
    child_friendly: number,
    country_code: string,
    country_codes: string,
    description: string,
    dog_friendly: number,
    energy_level: number,
    experimental: number,
    grooming: number,
    hairless: number,
    health_issues: number,
    hypoallergenic: number,
    id: string,
    indoor: number,
    intelligence: number,
    life_span: string,
    name: string,
    natural: number,
    origin: string,
    rare: number,
    reference_image_id: string,
    rex: number,
    shedding_level: number,
    short_legs: number,
    social_needs: number,
    stranger_friendly: number,
    suppressed_tail: number,
    temperament: string,
    vetstreet_url: string,
    vocalisation: number,
    weight: object,
    wikipedia_url: string,
}

export interface CatData {
    id: string,
    url: string,
    height: number,
    width: number,
    breeds: Breed[],
}

export interface CatDetails {
    selectedBreed: string,
    catData: CatData
}