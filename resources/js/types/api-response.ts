export interface ApiResponse<T> {
  output: T;
  message?: string;
  success: boolean;
}
