export const enTranslations = {
    translation: {
        label: {
            common: {
                terms: 'Terms of Service',
                privacy: 'Privacy Policy',
            },
            input: {
                name: 'Name',
                email: 'Email',
                password: 'Password',
                location: 'Location',
            },
            nav: {
                you: 'You',
                settings: 'Settings',
                home: 'Home',
                notifications: 'Notifications',
                createAccount: 'Create Account',
                signIn: 'Sign In',
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
        },
        feed: {
            header: 'Hikes near {{cityName}}',
        },
        error: {
            label: 'Error',
            auth: {
                exists:
                    'It looks like an account has already been created with this email address.',
                invalid:
                    'The email address you provided is not correctly formatted.',
                password: {
                    weak:
                        'The password you provided is not sufficiently strong.',
                    incorrect: 'The password you provided is incorrect.',
                },
                notFound:
                    'There is no account associated with this email address.',
            },
        },
    },
};

export const esTranslations = {
    translation: {
        label: {
            common: {
                terms: 'Términos de servicio',
                privacy: 'Política de privacidad',
            },
            input: {
                name: 'Nombre',
                email: 'Correo electrónico',
                password: 'Contraseña',
                location: 'Location',
            },
            nav: {
                you: 'Yo',
                settings: 'Configuraciones',
                home: 'Casa',
                notifications: 'Notificaciones',
                createAccount: 'Crear una cuenta',
                signIn: 'Registrarse',
            },
        },
        common: {
            appName: 'Hikearound',
            appName_plural: 'Hikearound',
        },
        hike: {
            data: {
                distance: 'Distancia',
                elevation: 'Elevación',
                route: 'Ruta',
                miles: 'Millas',
                feet: 'Pies',
                loop: 'Lazo',
            },
        },
        screen: {
            createAccount: {
                legal:
                    "Al hacer clic en '{{createAccount}}' acepta los <5>Términos de servicio</5> y la <7>Política de privacidad</7> de {{appName}}.",
            },
        },
        feed: {
            header: 'Caminatas cerca de {{cityName}}',
        },
        error: {
            label: 'Error',
            auth: {
                exists:
                    'Parece que ya se ha creado una cuenta con esta dirección de correo electrónico.',
                invalid:
                    'La dirección de correo electrónico que proporcionó no está formateada correctamente.',
                password: {
                    weak:
                        'La contraseña que proporcionó no es lo suficientemente segura.',
                    incorrect: 'La contraseña que proporcionó es incorrecta.',
                },
                notFound:
                    'No hay una cuenta asociada con esta dirección de correo electrónico.',
            },
        },
    },
};

export default { enTranslations, esTranslations };
