import * as express from 'express';
import { Contents } from './content.model';

// Prep routing
let route = express.Router();

route.get('/:id', async (req, res, next) => {
  try {
    let content = await Contents.findById(req.params.id);

    res.json(content);
  } catch (err) {
    next(err);
  }
});

route.post('/search', async (req, res, next) => {
  try {
    const findQ: any = {
      type: req.body.type
    };

    if (req.body.type === 'all') {
      delete findQ.type;
    }

    if (req.body.query) {
      findQ.title = {
        $regex: req.body.query,
        $options: 'i'
      };
    }

    console.log('findQ: ', findQ);

    let content = await Contents.find(findQ)
      .sort(req.body.sortBy || { updatedAt: -1 })
      .skip(req.body.skip || 0)
      .limit(req.body.limit || 50)
      .exec();

    console.log('content: ', content);

    return res.json({
      content,
      count: content.length
    });
  } catch (err) {
    return next(err);
  }
});

// export routes
export default route;
