export const CreateCommentValidationMessage = {
  text: {
    invalidFormat: 'Comment text must be a string.',
    tooShort: 'Comment text must be at least 5 characters long.',
    tooLong: 'Comment text must be at most 1024 characters long.',
  },
  rating: {
    invalidFormat: 'Rating must be a digit.',
    tooSmall: 'Rating must be at least 1.',
    tooLarge: 'Rating must be at most 5.',
  },
  offerId: {
    invalidFormat: 'Offer ID must be a valid Mongo ID.',
  },
  authorId: {
    invalidFormat: 'Author ID must be a valid Mongo ID.',
  },
} as const;
