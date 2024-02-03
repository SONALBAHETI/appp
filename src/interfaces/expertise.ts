export interface IPrimaryExpertiseSuggestion {
    id: string;
    title: string;
  }
  
  export interface IGetExpertiseSuggestionsResponse
    extends PaginationResult<IPrimaryExpertiseSuggestion> {}
  