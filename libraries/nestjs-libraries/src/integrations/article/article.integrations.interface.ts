export interface ArticleIntegrationsInterface {
  authenticate(
    token: string,
    lang? : string,
  ): Promise<{
    id: string;
    name: string;
    token: string;
    picture: string;
    username: string;
  }>;
  post(
    token: string,
    content: string,
    settings: object
  ): Promise<{ postId: string; releaseURL: string }>;
}

export interface ArticleProvider extends ArticleIntegrationsInterface {
  identifier: string;
  name: string;
}
