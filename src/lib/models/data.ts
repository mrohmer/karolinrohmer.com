export interface Data {
  meta: Record<'title' | 'description', string>;
  content: {
    emopic: Record<'name'|`${'sub'|''}slogan`|'email', string> & Record<'links', Record<'xing' | 'linkedin' | 'instagram' | 'ddim' | 'diag', string>>;
    bio: string;
  }
}
