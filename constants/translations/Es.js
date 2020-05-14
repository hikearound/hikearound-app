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
                account: {
                    exists:
                        'Parece que ya se ha creado una cuenta con esta dirección de correo electrónico.',
                    invalid:
                        'La dirección de correo electrónico que proporcionó no está formateada correctamente.',
                    notFound:
                        'No hay una cuenta asociada con esta dirección de correo electrónico.',
                },
                password: {
                    weak:
                        'La contraseña que proporcionó no es lo suficientemente segura.',
                    incorrect: 'La contraseña que proporcionó es incorrecta.',
                },
            },
        },
    },
};

export default { esTranslations };