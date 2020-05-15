export const enTranslations = {
    translation: {
        label: {
            common: {
                cancel: 'Cancel',
                logout: 'Logout',
                terms: 'Terms of Service',
                privacy: 'Privacy Policy',
                email: 'Email',
            },
            input: {
                name: 'Name',
                email: 'Email',
                password: 'Password',
                location: 'Location',
            },
            heading: {
                description: 'Description',
                images: 'Images',
            },
            nav: {
                you: 'You',
                settings: 'Settings',
                home: 'Home',
                notifications: 'Notifications',
                createAccount: 'Create Account',
                signIn: 'Sign In',
            },
            modal: {
                save: 'Save',
                close: 'Close',
            },
        },
        sheet: {
            feed: {
                title: 'Sort by',
                item: {
                    new: 'Newest first',
                    old: 'Oldest first',
                },
            },
            hike: {
                title: 'Hike',
                item: {
                    share: 'Share',
                    directions: 'Get Directions',
                },
            },
            lightbox: {
                title: 'Photo',
                item: {
                    attribution: 'Photo attribution',
                },
            },
        },
        common: {
            appName: 'Hikearound',
            appName_plural: "Hikearound's",
        },
        hike: {
            data: {
                distance: 'Distance',
                elevation: 'Elevation',
                route: 'Route',
                miles: 'Miles',
                feet: 'Feet',
                loop: 'Loop',
            },
        },
        screen: {
            createAccount: {
                legal:
                    "By clicking '{{createAccount}}' you agree to {{appName}} <5>Terms of Service</5> and <7>Privacy Policy</7>.",
            },
            notifications: {
                empty: 'No new notifications',
            },
            profile: {
                edit: 'Edit Profile',
                add: 'Add Location',
                header: 'Your Hikes',
                empty: 'Hikes that you favorite will appear here.',
            },
            settings: {
                header: {
                    map: 'Default Map',
                    display: 'Display',
                    notifications: 'Notifications',
                    terms: 'Terms & Privacy',
                    account: 'Account',
                    version: 'Version',
                    push: 'Push Notifications',
                },
                item: {
                    map: {
                        apple: 'Apple Maps',
                        google: 'Google Maps',
                    },
                    dark: 'Dark Mode',
                    notification: {
                        combined: 'Email & Push Notifications',
                        email: 'Enable emails',
                        push: 'Enable push notifications',
                    },
                },
            },
        },
        feed: {
            header: 'Hikes near {{cityName}}',
            footer: 'New hikes every week',
        },
        toast: {
            favorite: 'You favorited {{hikeName}}.',
            share: 'Link copied to clipboard.',
        },
        error: {
            label: 'Error',
            auth: {
                account: {
                    exists:
                        'It looks like an account has already been created with this email address.',
                    invalid:
                        'The email address you provided is not correctly formatted.',
                    notFound:
                        'There is no account associated with this email address.',
                },
                password: {
                    weak:
                        'The password you provided is not sufficiently strong.',
                    incorrect: 'The password you provided is incorrect.',
                },
            },
        },
    },
};

export default { enTranslations };
