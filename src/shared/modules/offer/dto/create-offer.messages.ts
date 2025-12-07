export const CreateUpdateOfferValidationMessage = {
  title: {
    required: 'Title is required',
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    required: 'Description is required',
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },

  publicationDate: {
    required: 'Publication date is required',
    invalidFormat: 'publicationDate must be a valid ISO date',
  },

  city: {
    required: 'City is required',
    invalid: 'City must be one of: Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf',
  },

  previewImage: {
    required: 'Preview image is required',
    invalidUrl: 'Preview image must be a valid URL',
  },

  images: {
    required: 'Images are required',
    invalidFormat: 'Images must be an array of strings (URLs)',
    length: 'Images must contain exactly 6 items',
    invalidUrl: 'Each image must be a valid URL',
  },

  isPremium: {
    required: 'isPremium flag is required',
    invalidType: 'isPremium must be a boolean',
  },

  isFavorite: {
    required: 'isFavorite flag is required',
    invalidType: 'isFavorite must be a boolean',
  },

  rating: {
    required: 'Rating is required',
    invalidFormat: 'Rating must be a number (one decimal place allowed)',
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
  },

  type: {
    required: 'Type is required',
    invalid: 'Type must be one of: apartment, house, room, hotel',
  },

  rooms: {
    required: 'Rooms count is required',
    minValue: 'Minimum number of rooms is 1',
    maxValue: 'Maximum number of rooms is 8',
    invalidFormat: 'Rooms must be an integer',
  },

  guests: {
    required: 'Guests count is required',
    minValue: 'Minimum number of guests is 1',
    maxValue: 'Maximum number of guests is 10',
    invalidFormat: 'Guests must be an integer',
  },

  price: {
    required: 'Price is required',
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },

  amenities: {
    required: 'Amenities are required',
    invalidFormat: 'Amenities must be an array of allowed values',
    invalidValue: 'Amenities must be one or more of: Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge',
  },

  authorId: {
    required: 'AuthorId is required',
    invalidId: 'authorId field must be a valid id',
  },

  coordinates: {
    required: 'Coordinates are required',
    invalidFormat: 'Coordinates must be an object with latitude and longitude',
    latitude: {
      required: 'Latitude is required',
      invalid: 'Latitude must be a number',
    },
    longitude: {
      required: 'Longitude is required',
      invalid: 'Longitude must be a number',
    },
  },
} as const;
