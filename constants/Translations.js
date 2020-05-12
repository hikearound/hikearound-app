export const enTranslations = {
    translation: {
        label: {
            common: {
                termsOfService: 'Terms of Service',
                privacyPolicy: 'Privacy Policy',
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
    },
};

export const esTranslations = {
    translation: {
        label: {
            common: {
                termsOfService: 'Términos de servicio',
                privacyPolicy: 'Política de privacidad',
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
    },
};

export default { enTranslations, esTranslations };
