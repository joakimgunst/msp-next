import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { path, secret } = req.query;
  if (!secret || secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid secret param' });
  }
  if (!path) {
    return res.status(400).json({ message: 'Missing path param' });
  }
  res.setPreviewData({});
  res.writeHead(307, { Location: req.query.path });
  res.end();
};
