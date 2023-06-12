

 
export class InitializeService {
 

constructor(
    
) {}

public initialize(): string { 
    
     return  localStorage.getItem('selectedLanguage') ?? 'en';
 
}
}