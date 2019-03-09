const { ObjectId } = require('mongodb');

module.exports = [
  {
    title: 'An Article 1',
    text: 'Some example text 1',
    tags: ['tag1', 'tag2'],
    userId: new ObjectId('5c83a9414e8ea71a67bc1cb3')
  },
  {
    title: 'An Article 2',
    text: 'Some example text 2',
    tags: ['tag1'],
    userId: new ObjectId('5c83a9414e8ea71a67bc1cb4')
  },
  {
    title: 'An Article 3',
    text: 'Some example text 3',
    tags: ['tag1'],
    userId: new ObjectId('5c83a9414e8ea71a67bc1cb5')
  },
  {
    title: 'An Article 4',
    text: 'Some example text 4',
    tags: ['tag2'],
    userId: new ObjectId('5c83a9414e8ea71a67bc1cb3')
  },
  {
    title: 'An Article 5',
    text: 'Some example text 5',
    tags: ['tag2'],
    userId: new ObjectId('5c83a9414e8ea71a67bc1cb4')
  },
  {
    title: 'An Article 6',
    text: 'Some example text 6',
    tags: ['tag3'],
    userId: new ObjectId('5c83a9414e8ea71a67bc1cb5')
  }
]