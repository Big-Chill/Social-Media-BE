const path = require('path');
const postModel = require(path.join(__dirname, '..', 'model', 'post'));
// const { generateRandomCaption } = require(path.join(__dirname, '..', 'util', 'helperFunction'));


// GET /api/v1/posts

const getPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const posts = await postModel.find().skip(skip).limit(limit);
  res.status(200).json({ 'posts': posts });
};


// GET /api/v1/generateRandomPost

const generateRandomPost = async (req, res) => {
  const THIRD_PARTY_API = 'https://picsum.photos/v2/list?page=1&limit=500';
  const response = await fetch(THIRD_PARTY_API);
  const data = await response.json();

  const dbData = [];

  data.forEach((item) => {
    const post = new postModel({
      imageLink: item.download_url,
      caption: item.author
    });
    dbData.push(post);
  });

  try {
    await postModel.insertMany(dbData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.status(200).json({ message: 'Random post generated' });
};


module.exports = {
  getPosts,
  generateRandomPost
};