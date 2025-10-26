"use client";

import { useSearchParams } from "next/navigation";
import { IconMail } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Suspense } from "react";
import { setRequestLocale } from 'next-intl/server';

function WaitingPageContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const t = useTranslations('Login');
  const tCommon = useTranslations('Common');

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconMail />
          </EmptyMedia>
          <EmptyTitle>{t('checkInbox')}</EmptyTitle>
          <EmptyDescription>
            {email ? (
              <>
                {t('magicLinkSentTo')} <strong>{email}</strong>. {t('clickToConfirm')}
              </>
            ) : (
              <>{t('magicLinkSent')}</>
            )}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}

export default function WaitingPage() {
  const tCommon = useTranslations('Common');
  
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <p>{tCommon('loading')}</p>
      </div>
    }>
      <WaitingPageContent />
    </Suspense>
  );
}
