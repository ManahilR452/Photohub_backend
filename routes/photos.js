
router.post('/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; // Could be IP, username, or localStorage ID
    
    const photo = await Photo.findById(id);
    
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    
    // Check if user already liked (prevent double-liking)
    if (photo.likedBy && photo.likedBy.includes(userId)) {
      return res.status(400).json({ message: 'Already liked this photo' });
    }
    
    // Increment likes
    photo.likes = (photo.likes || 0) + 1;
    
    // Track who liked
    if (!photo.likedBy) photo.likedBy = [];
    photo.likedBy.push(userId);
    
    await photo.save();
    
    res.json({ 
      success: true, 
      likes: photo.likes 
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to like photo', error });
  }
});
// GET /api/photos/recent?days=7
router.get('/recent', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7; // Default 7 days
    
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - days);
    
    const photos = await Photo.find({
      createdAt: { $gte: dateLimit }  // Only photos newer than dateLimit
    }).sort({ createdAt: -1 }); // Newest first
    
    res.json(photos);
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch photos', error });
  }
});