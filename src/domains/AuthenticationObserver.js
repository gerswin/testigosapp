import mitt from 'mitt'

export const FORCE_SIGN_OUT_EVENT = 'force_signout'
export const SIGN_OUT_EVENT = 'signout'
export const SIGN_UP_EVENT = 'signup'
export const SIGN_IN_EVENT = 'signin'
export const SIGN_UP_CONFIRM = 'signup_confirmation'
export const CONFIRMATION_REQUIRED = 'confirmation_required'
export const NEW_PASSWORD_REQUIRED = 'new_password_required'
export const REFRESH_USER_INFO_EVENT = 'refresh_user_info'

const AuthenticationEmitter = mitt()

export function useAuthenticationEmitter() {
    const dispatchRefreshUserInfo = () => AuthenticationEmitter.emit(REFRESH_USER_INFO_EVENT)

    const dispatchSignUp = () => AuthenticationEmitter.emit(SIGN_UP_EVENT)

    const dispatchSignIn = () => AuthenticationEmitter.emit(SIGN_IN_EVENT)

    const dispatchForceSignOut = () =>
        AuthenticationEmitter.emit(FORCE_SIGN_OUT_EVENT)

    const dispatchSignOut = () => AuthenticationEmitter.emit(SIGN_OUT_EVENT)

    const dispatchSignUpConfirmation = () =>
        AuthenticationEmitter.emit(SIGN_UP_CONFIRM)

    const dispatchNewPasswordRequired = () =>
        AuthenticationEmitter.emit(NEW_PASSWORD_REQUIRED)

    /**
     *
     * @param {import('./ConfirmationRequiredEvent').ConfirmationRequiredEvent} event
     * @returns
     */
    const dispatchConfirmationRequired = (event) =>
        AuthenticationEmitter.emit(CONFIRMATION_REQUIRED, event)

    return {
        dispatchNewPasswordRequired,
        dispatchForceSignOut,
        dispatchRefreshUserInfo,
        dispatchSignIn,
        dispatchSignUp,
        dispatchSignOut,
        dispatchSignUpConfirmation,
        dispatchConfirmationRequired,
    }
}

export function useAuthenticationObserver() {
    const onRefreshUserInfo = (callback) =>
        AuthenticationEmitter.on(REFRESH_USER_INFO_EVENT, callback)

    const onSignUp = (callback) =>
        AuthenticationEmitter.on(SIGN_UP_EVENT, callback)

    const onSignIn = (callback) =>
        AuthenticationEmitter.on(SIGN_IN_EVENT, callback)

    const onSignOut = (callback) =>
        AuthenticationEmitter.on(SIGN_OUT_EVENT, callback)

    const onSignUpConfirmation = (callback) =>
        AuthenticationEmitter.on(SIGN_UP_CONFIRM, callback)

    const onConfirmationRequired = (callback) =>
        AuthenticationEmitter.on(CONFIRMATION_REQUIRED, callback)

    const onForceSignOut = (callback) =>
        AuthenticationEmitter.on(FORCE_SIGN_OUT_EVENT, callback)

    const onNewPasswordRequired = (callback) =>
        AuthenticationEmitter.on(NEW_PASSWORD_REQUIRED, callback)

    const unsubscribe = (event, handler) => AuthenticationEmitter.off(event, handler)

    return {
        unsubscribe,
        onRefreshUserInfo,
        onForceSignOut,
        onNewPasswordRequired,
        onSignIn,
        onSignUp,
        onSignOut,
        onSignUpConfirmation,
        onConfirmationRequired,
    }
}
