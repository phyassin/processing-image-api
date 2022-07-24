import express from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const processImage = async (req: express.Request, res: express.Response) => {
  const myId = req.query.id;
  const myWidth = Number(req.query.width);
  const myHeight = Number(req.query.height);
  const imgPath: string = path.normalize(
    __dirname + '../../../images/thumb/' + myId + '-' + myWidth + '-' + myHeight + '.jpg'
  );
  const currentImage: string = path.normalize(__dirname + '../../../images/main/' + myId);
  // for errors
  if (!fs.existsSync(currentImage)) {
    res.status(400).send('image not found');
    return;
  }
  if (myWidth < 0 || myHeight < 0) {
    res.status(400).send('Enter a valid width and height');
    return;
  }

  if (!myWidth || !myHeight) {
    res.status(400).send('cannot be empty, set width and height');
    return;
  }

  if (fs.existsSync(imgPath)) {
    return res.status(200).sendFile(imgPath);
  } else {
    if (myId != null) {
      imgResize(myId as string, myWidth as unknown as number, myHeight as unknown as number);
      await setTimeout(() => {
        return res.status(200).sendFile(imgPath);
      }, 500);
    }
  }
}
// process

async function imgResize(id: string,
  width: number,
  height: number) {
  try {
    await sharp("./images/main/" + id).resize({ width: width, height: height }).toFile("./images/thumb/" + id + "-" + width + "-" + height + ".jpg")
  } catch (err) {
    console.log(err)
  }
}

export { imgResize };

export default processImage