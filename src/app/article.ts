export interface Article {
    _id?: string;
    articleIdentifier: string;
    views: number;
    isVerified: boolean;
    filename: string;
    defaultLanguage: string;
    created: Date;
    updated: Date;
    name: string;
    description: string;
    tags: string[];
    sources: Source[];
    authorIdentifier?: string;
    availableLanguages?: string[];
    daysSinceCreation?: Number;
    errors?: string[];
}

export interface Source {
    name: string;
    url: string;
}
