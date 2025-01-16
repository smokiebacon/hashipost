import { HttpStatusCode } from 'axios';

export const dynamic = 'force-dynamic';

import { internalFetch } from '@gitroom/helpers/utils/internal.fetch';
import { redirect } from 'next/navigation';
import { Redirect } from '@gitroom/frontend/components/layout/redirect';
import { useDictionary } from '@gitroom/frontend/components/layout/lang.context';
import { getDictionary } from '@gitroom/frontend/app/[lang]/dictionaries';

export default async function Page({
  params: { provider,lang   },
  searchParams,
}: {
  params: { provider: string, lang:'en' | 'ja' | 'zh' };
  searchParams: any;
}) {
  console.log('searchParams',lang);
  if (provider === 'x') {
    searchParams = {
      ...searchParams,
      state: searchParams.oauth_token || '',
      code: searchParams.oauth_verifier || '',
      refresh: searchParams.refresh || '',
    };
  }
  const dictionary =await  getDictionary(lang);
  const data = await internalFetch(`/integrations/social/${provider}/connect`, {
    method: 'POST',
    body: JSON.stringify(searchParams),
    headers : {
      "lang" : lang || "en"
    }
  });

  if (data.status === HttpStatusCode.NotAcceptable) {
    const { msg } = await data.json();
    return redirect(`/${lang}/launches?msg=${msg}`);
  }

  if (
    data.status !== HttpStatusCode.Ok &&
    data.status !== HttpStatusCode.Created
  ) {
    return (
      <>
        <div className="mt-[50px] text-[50px]">
          {dictionary.launches["Could not add provider"]}
          <br />
          {dictionary.launches["You are being redirected back"]}
        </div>
        <Redirect url={`/${lang}/launches`} delay={3000} />
      </>
    );
  }

  const { inBetweenSteps, id } = await data.json();

  if (inBetweenSteps && !searchParams.refresh) {
    return redirect(`/${lang}/launches?added=${provider}&continue=${id}`);
  }

  return redirect(`/${lang}/launches?added=${provider}&msg=Channel Updated`);
}
