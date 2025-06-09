export function getCreateAnonymousId(): string {
  const localKey = 'ct_anonymous_id';
  let id = localStorage.getItem(localKey);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(localKey, id);
  }
  return id;
}
