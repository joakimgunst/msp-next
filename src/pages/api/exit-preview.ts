import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.clearPreviewData();
  res.writeHead(307, { Location: req.query.path ?? '/' });
  res.end();
};
