import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

// Get all non-sensitive diary entries
router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

// Get diary entry by ID
router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.status(404).json({ error: 'Diary entry not found' });
  }
});

// Add a new diary entry
router.post('/', (req, res) => {
  try {
    // Validate and convert the request body to a NewDiaryEntry type
    const newDiaryEntry = toNewDiaryEntry(req.body);

    // Add the diary entry
    const addedEntry = diaryService.addDiary(newDiaryEntry);
    
    // Send back the added entry as JSON
    res.status(201).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    
    // If the error is an instance of Error, append the actual message
    if (error instanceof Error) {
      errorMessage = error.message;  // You could use a custom message here if needed
    }

    // Send a structured JSON response for errors, along with a 400 Bad Request status
    res.status(400).json({ error: errorMessage });
  }
});

export default router;
