export interface SignedUrlResult {
  success: boolean;
  signedUrl?: string;
  token?: string;
  path?: string;
  publicUrl?: string;
  error?: string;
}
