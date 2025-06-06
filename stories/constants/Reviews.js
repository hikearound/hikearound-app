export const defaultReviews = [
    {
        id: 'review1',
        hid: 'hike1',
        rating: 4,
        review: 'This was an amazing hike! The views were absolutely breathtaking, especially at the summit where you can see the entire bay area.',
        savedOn: new Date(),
        userLikes: ['user2', 'user3', 'user4'],
        user: {
            uid: 'user1',
            name: 'John Doe',
            location: 'San Francisco, CA',
            photoURL:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        },
        hike: {
            name: 'Mount Tamalpais',
            city: 'Mill Valley',
            state: 'CA',
        },
    },
    {
        id: 'review2',
        hid: 'hike2',
        rating: 5,
        review: 'One of the best hikes I have ever done! The sunset views were absolutely spectacular, painting the sky in brilliant oranges and purples.',
        savedOn: new Date(),
        userLikes: ['user1', 'user2', 'user3', 'user4', 'user5'],
        user: {
            uid: 'user2',
            name: 'Jane Smith',
            location: 'Oakland, CA',
            photoURL:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
        },
        hike: {
            name: 'Mount Diablo',
            city: 'Danville',
            state: 'CA',
        },
    },
    {
        id: 'review3',
        hid: 'hike3',
        rating: 4,
        review: 'A fantastic trail with incredible views of the Golden Gate Bridge! The fog rolling in from the ocean created a magical atmosphere.',
        savedOn: new Date(),
        userLikes: ['user1', 'user3'],
        user: {
            uid: 'user3',
            name: 'Mike Johnson',
            location: 'Berkeley, CA',
            photoURL:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
        },
        hike: {
            name: 'Marin Headlands',
            city: 'Sausalito',
            state: 'CA',
        },
    },
    {
        id: 'review4',
        hid: 'hike4',
        rating: 5,
        review: "An absolute gem of a trail! The ancient redwoods create a cathedral-like atmosphere that's both peaceful and awe-inspiring.",
        savedOn: new Date(),
        userLikes: ['user1', 'user2', 'user4'],
        user: {
            uid: 'user4',
            name: 'Sarah Wilson',
            location: 'Sausalito, CA',
            photoURL:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
        },
        hike: {
            name: 'Muir Woods',
            city: 'Mill Valley',
            state: 'CA',
        },
    },
    {
        id: 'review5',
        hid: 'hike5',
        rating: 4,
        review: 'A beautiful coastal trail with stunning ocean views! The sound of waves crashing against the cliffs creates a perfect soundtrack for the hike.',
        savedOn: new Date(),
        userLikes: ['user2', 'user3', 'user5'],
        user: {
            uid: 'user5',
            name: 'David Chen',
            location: 'San Francisco, CA',
            photoURL:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
        },
        hike: {
            name: 'Point Reyes',
            city: 'Point Reyes Station',
            state: 'CA',
        },
    },
];

export const mockStore = {
    user: {
        uid: 'user123',
        name: 'John Doe',
        location: 'San Francisco, CA',
        photoURL:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    },
    reviewReducer: {
        reviewData: {
            review1: {
                id: 'review1',
                hid: 'hike1',
                rating: 4,
                review: 'This was an amazing hike!',
                savedOn: new Date(),
                userLikes: [],
                user: {
                    uid: 'user1',
                    name: 'John Doe',
                    location: 'San Francisco, CA',
                    photoURL:
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
                },
                hike: {
                    name: 'Mount Tamalpais',
                    city: 'Mill Valley',
                    state: 'CA',
                },
            },
        },
    },
    modalReducer: {
        closeAction: () => {},
        openAction: () => {},
        isVisible: false,
        modalType: null,
    },
};
