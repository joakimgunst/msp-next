// Only allow same-site paths to prevent open redirects
export function getSafeRedirectPath(path: string | null) {
  return path && path.startsWith('/') && !path.startsWith('//') ? path : '/';
}
