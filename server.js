const express = require('express');
const cors = require('cors');  // Import CORS
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');  // Import dotenv
const app = express();

// Load environment variables from .env file
dotenv.config();

// Use CORS middleware globally
app.use(cors());

// Cloudinary configuration using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,  // From .env
  api_key: process.env.API_KEY,        // From .env
  api_secret: process.env.API_SECRET   // From .env
});

// Endpoint to fetch images from Cloudinary
app.get('/fetch-images', async (req, res) => {
  try {
    // Fetch images from Cloudinary
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 30,  // Limit the number of images
      prefix: 'your-folder/',  // Optional: specify folder if necessary
    });

    // Send the image URLs as a response
    res.json(result.resources.map(image => image.secure_url));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching images from Cloudinary' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
