'use client';

import React from 'react';
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import { locale } from '@/config';

export function LivePreviewProvider({ children }: { children: React.ReactNode }) {
  return <ContentfulLivePreviewProvider locale={locale}>{children}</ContentfulLivePreviewProvider>;
}
