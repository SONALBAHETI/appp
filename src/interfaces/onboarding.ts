export interface IPrimaryInterestSuggestion {
  id: string;
  title: string;
}

export interface IGetPrimaryInterestSuggestionsResponse
  extends PaginationResult<IPrimaryInterestSuggestion> {}
